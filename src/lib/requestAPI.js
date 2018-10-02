import { TLSerialization, TLDeserialization} from './tl_serialization';
import CryptoJS from './crypto';
import { bufferConcat, nextRandomInt } from './utils';
import $ from 'jquery';

wrapApiCall();

function wrapApiCall(){

  var method='messages.getHistory' ,
      params={add_offset:0, limit:20, offset_id:12, 
              peer: {access_hash: "13428155690676809515", user_id:"777000", _:"inputPeerUser"} },
      options={timeout: 300, noErrorBox: true};

  var serializer = new TLSerialization(options);

  serializer.storeInt(0xda9b0d0d, 'invokeWithLayer')
  serializer.storeInt(74, 'layer')
  serializer.storeInt(0xc7481da6, 'initConnection')
  serializer.storeInt(2496, 'api_id')
  serializer.storeString('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.170 Safari/537.36', 'device_model')
  serializer.storeString('Win32', 'system_version')
  serializer.storeString('0.7.0', 'app_version')
  serializer.storeString( 'en-US', 'system_lang_code')
  serializer.storeString('', 'lang_pack')
  serializer.storeString('en-US', 'lang_code')

  serializer.storeMethod(method, params)

  var message = {
    msg_id: "6607844405590270680",
    seq_no: 36,
    body: serializer.getBytes(true),
    isAPI: true
  }

  sendEncryptedRequest(message);

}


function getEncryptedMessage (dataWithPadding) {

      return getMsgKey(dataWithPadding, true).then(function (msgKey) {
        return getAesKeyIv(msgKey, true).then(function (keyIv) {

          return CryptoJS.aesEncrypt(dataWithPadding, keyIv[0], keyIv[1]).then(function (encryptedBytes) {

            return {
              bytes: encryptedBytes,
              msgKey: msgKey
            }
          })
        })
      })
    }

var authKeyUint8;

function getMsgKey (dataWithPadding, isOut) {
  var authKey = authKeyUint8
  var x = isOut ? 0 : 8
  var msgKeyLargePlain = bufferConcat(authKey.subarray(88 + x, 88 + x + 32), dataWithPadding)
  return CryptoJS.sha256Hash(msgKeyLargePlain).then(function (msgKeyLarge) {
    var msgKey = new Uint8Array(msgKeyLarge).subarray(8, 24)
    return msgKey
  })
}

function getAesKeyIv(msgKey, isOut) {
      var authKey = authKeyUint8
      var x = isOut ? 0 : 8
      var sha2aText = new Uint8Array(52)
      var sha2bText = new Uint8Array(52)
      var promises = {}

      sha2aText.set(msgKey, 0)
      sha2aText.set(authKey.subarray(x, x + 36), 16)
      promises.sha2a = CryptoJS.sha256Hash(sha2aText)

      sha2bText.set(authKey.subarray(40 + x, 40 + x + 36), 0)
      sha2bText.set(msgKey, 36)
      promises.sha2b = CryptoJS.sha256Hash(sha2bText)

      return promises.then(function (result) {
        var aesKey = new Uint8Array(32)
        var aesIv = new Uint8Array(32)
        var sha2a = new Uint8Array(result.sha2a)
        var sha2b = new Uint8Array(result.sha2b)

        aesKey.set(sha2a.subarray(0, 8))
        aesKey.set(sha2b.subarray(8, 24), 8)
        aesKey.set(sha2a.subarray(24, 32), 24)

        aesIv.set(sha2b.subarray(0, 8))
        aesIv.set(sha2a.subarray(8, 24), 8)
        aesIv.set(sha2b.subarray(24, 32), 24)

        return [aesKey, aesIv]
      })
    }






function sendEncryptedRequest(message, options) {

      options = options || {}

      var serverSalt=[167, 143, 57, 220, 74, 162, 172, 132], 
          sessionID=[54, 125, 114, 244, 159, 63, 54, 224], 
          authKeyID=[225, 24, 164, 70, 90, 223, 95, 229], 
          url="https://pluto.web.telegram.org/apiw1";

      var data = new TLSerialization({startMaxLength: message.body.length + 2048})

      data.storeIntBytes(serverSalt, 64, 'salt')
      data.storeIntBytes(sessionID, 64, 'session_id')

      data.storeLong(message.msg_id, 'message_id')
      data.storeInt(message.seq_no, 'seq_no')

      data.storeInt(message.body.length, 'message_data_length')
      data.storeRawBytes(message.body, 'message_data')

      var dataBuffer = data.getBuffer()

      var paddingLength = (16 - (data.offset % 16)) + 16 * (1 + nextRandomInt(5))
      var padding = new Array(paddingLength)

      var dataWithPadding = bufferConcat(dataBuffer, padding)

      return getEncryptedMessage(dataWithPadding).then(function (encryptedResult) {

        var request = new TLSerialization({startMaxLength: encryptedResult.bytes.byteLength + 256})
        request.storeIntBytes(authKeyID, 64, 'auth_key_id')
        request.storeIntBytes(encryptedResult.msgKey, 128, 'msg_key')
        request.storeRawBytes(encryptedResult.bytes, 'encrypted_data')

        var requestData = request.getBuffer();

        var requestPromise;
        var baseError = {code: 406, type: 'NETWORK_BAD_RESPONSE', url: url}


        options = options || {};

        options.responseType= 'arraybuffer';
        options.transformRequest=null;

        requestPromise = $.ajax.post(url, requestData, options)

        return requestPromise.then(
          function (result) {
            console.log(result);
          },
          function (error) {
            console.log(error);
          }
        )
      })
    }



