import { TLSerialization, TLDeserialization} from './tl_serialization';
import CryptoJS from 'browserify-cryptojs';
import { bufferConcat, nextRandomInt } from './utils';
import $ from 'jquery';

console.log(CryptoJS);

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


function getMsgKey (dataWithPadding, isOut) {
  var authKey = new Uint8Array([18, 18, 237, 142, 218, 187, 233, 42, 122, 70, 78, 158, 219, 244, 216, 248, 89, 10, 119, 188, 170, 195, 122, 24, 48, 251, 59, 37, 59, 182, 43, 129, 62, 165, 255, 252, 143, 137, 193, 208, 101, 44, 124, 132, 146, 140, 185, 237, 130, 189, 185, 206, 98, 175, 187, 37, 109, 52, 21, 228, 163, 33, 202, 4, 198, 61, 134, 175, 151, 66, 128, 95, 47, 43, 48, 162, 149, 37, 199, 56, 164, 93, 232, 203, 179, 130, 167, 46, 7, 183, 189, 116, 59, 77, 247, 148, 35, 225, 121, 168,
                  236, 52, 84, 5, 182, 55, 136, 113, 0, 233, 112, 196, 33, 86, 250, 76, 171, 23, 35, 7, 138, 40, 51, 216, 84, 3, 42, 117, 217, 84, 47, 23, 186, 103, 140, 115, 170, 158, 145, 229, 214, 16, 117, 200, 216, 208, 142, 242, 189, 162, 136, 14, 91, 133, 188, 109, 129, 53, 187, 76, 150, 236, 240, 125, 40, 161, 100, 132, 74, 119, 4, 29, 26, 9, 21, 118, 125, 148, 205, 5, 244, 186, 173, 190, 163, 104, 8, 92, 154, 240, 216, 28, 227, 219, 118, 191, 84, 214, 72, 155,
                  65,160,184,232,208,49,158,162,249,45,224,172,253,180,161,157,106,23,226,52,9,178,184,249,192,88,243,161,164,189,18,218,137,196,233,167,178,141,91,154,35,109,18,35,141,53,48,49,201,79,205,18,114,63,88,202]);

  var x = isOut ? 0 : 8
  var msgKeyLargePlain = bufferConcat(authKey.subarray(88 + x, 88 + x + 32), dataWithPadding)
  return CryptoJS.sha256Hash(msgKeyLargePlain).then(function (msgKeyLarge) {
    var msgKey = new Uint8Array(msgKeyLarge).subarray(8, 24)
    return msgKey
  })
}

function getAesKeyIv(msgKey, isOut) {
      var authKey = new Uint8Array([18, 18, 237, 142, 218, 187, 233, 42, 122, 70, 78, 158, 219, 244, 216, 248, 89, 10, 119, 188, 170, 195, 122, 24, 48, 251, 59, 37, 59, 182, 43, 129, 62, 165, 255, 252, 143, 137, 193, 208, 101, 44, 124, 132, 146, 140, 185, 237, 130, 189, 185, 206, 98, 175, 187, 37, 109, 52, 21, 228, 163, 33, 202, 4, 198, 61, 134, 175, 151, 66, 128, 95, 47, 43, 48, 162, 149, 37, 199, 56, 164, 93, 232, 203, 179, 130, 167, 46, 7, 183, 189, 116, 59, 77, 247, 148, 35, 225, 121, 168,
                  236, 52, 84, 5, 182, 55, 136, 113, 0, 233, 112, 196, 33, 86, 250, 76, 171, 23, 35, 7, 138, 40, 51, 216, 84, 3, 42, 117, 217, 84, 47, 23, 186, 103, 140, 115, 170, 158, 145, 229, 214, 16, 117, 200, 216, 208, 142, 242, 189, 162, 136, 14, 91, 133, 188, 109, 129, 53, 187, 76, 150, 236, 240, 125, 40, 161, 100, 132, 74, 119, 4, 29, 26, 9, 21, 118, 125, 148, 205, 5, 244, 186, 173, 190, 163, 104, 8, 92, 154, 240, 216, 28, 227, 219, 118, 191, 84, 214, 72, 155,
                  65,160,184,232,208,49,158,162,249,45,224,172,253,180,161,157,106,23,226,52,9,178,184,249,192,88,243,161,164,189,18,218,137,196,233,167,178,141,91,154,35,109,18,35,141,53,48,49,201,79,205,18,114,63,88,202]);

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



