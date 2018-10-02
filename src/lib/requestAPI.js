import { TLSerialization, TLDeserialization} from './tl_serialization';
import { config } from './config';
import CryptoJS from './CryptoJS';


wrapApiCall(message, options){

  var serializer = new TLSerialization(options);

  serializer.storeInt(0xda9b0d0d, 'invokeWithLayer')
  serializer.storeInt(Config.Schema.API.layer, 'layer')
  serializer.storeInt(0xc7481da6, 'initConnection')
  serializer.storeInt(Config.App.id, 'api_id')
  serializer.storeString(navigator.userAgent || 'Unknown UserAgent', 'device_model')
  serializer.storeString(navigator.platform || 'Unknown Platform', 'system_version')
  serializer.storeString(Config.App.version, 'app_version')
  serializer.storeString(navigator.language || 'en', 'system_lang_code')
  serializer.storeString('', 'lang_pack')
  serializer.storeString(navigator.language || 'en', 'lang_code')

  serializer.storeMethod(method, params)

  var message = {
    msg_id: messageID,
    seq_no: seqNo,
    body: serializer.getBytes(true),
    isAPI: true
  }

  sendEncryptedRequest(message);

}


getEncryptedMessage =function (dataWithPadding) {

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

var authKeyUint8

getMsgKey = function (dataWithPadding, isOut) {
  var authKey = authKeyUint8
  var x = isOut ? 0 : 8
  var msgKeyLargePlain = bufferConcat(authKey.subarray(88 + x, 88 + x + 32), dataWithPadding)
  return CryptoJS.sha256Hash(msgKeyLargePlain).then(function (msgKeyLarge) {
    var msgKey = new Uint8Array(msgKeyLarge).subarray(8, 24)
    return msgKey
  })
}

getAesKeyIv =function (msgKey, isOut) {
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
      promises.sha2b = CryptoWorker.sha256Hash(sha2bText)

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




var serverSalt, sessionID, authKeyID, url;

sendEncryptedRequest = function (message, options) {

      options = options || {}

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


        options = angular.extend(options || {}, {
          responseType: 'arraybuffer',
          transformRequest: null
        });

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



