import { TLSerialization, TLDeserialization} from './tl_serialization';
import { config } from './config';
import CryptoJS from './CryptoJS';


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


MtpNetworker.prototype.getEncryptedMessage = function (dataWithPadding) {
      var self = this
      return self.getMsgKey(dataWithPadding, true).then(function (msgKey) {
        return self.getAesKeyIv(msgKey, true).then(function (keyIv) {
          // console.log(dT(), 'after msg key iv')
          return CryptoWorker.aesEncrypt(dataWithPadding, keyIv[0], keyIv[1]).then(function (encryptedBytes) {
            // console.log(dT(), 'Finish encrypt')
            return {
              bytes: encryptedBytes,
              msgKey: msgKey
            }
          })
        })
      })
    }

sendEncryptedRequest = function (message, options) {
      var self = this
      options = options || {}
      // console.log(dT(), 'Send encrypted'/*, message*/)
      // console.trace()
      var data = new TLSerialization({startMaxLength: message.body.length + 2048})

      data.storeIntBytes(this.serverSalt, 64, 'salt')
      data.storeIntBytes(this.sessionID, 64, 'session_id')

      data.storeLong(message.msg_id, 'message_id')
      data.storeInt(message.seq_no, 'seq_no')

      data.storeInt(message.body.length, 'message_data_length')
      data.storeRawBytes(message.body, 'message_data')

      var dataBuffer = data.getBuffer()

      var paddingLength = (16 - (data.offset % 16)) + 16 * (1 + nextRandomInt(5))
      var padding = new Array(paddingLength)
      MtpSecureRandom.nextBytes(padding)

      var dataWithPadding = bufferConcat(dataBuffer, padding)
      // console.log(dT(), 'Adding padding', dataBuffer, padding, dataWithPadding)
      // console.log(dT(), 'auth_key_id', bytesToHex(self.authKeyID))

      return this.getEncryptedMessage(dataWithPadding).then(function (encryptedResult) {
        // console.log(dT(), 'Got encrypted out message'/*, encryptedResult*/)
        var request = new TLSerialization({startMaxLength: encryptedResult.bytes.byteLength + 256})
        request.storeIntBytes(self.authKeyID, 64, 'auth_key_id')
        request.storeIntBytes(encryptedResult.msgKey, 128, 'msg_key')
        request.storeRawBytes(encryptedResult.bytes, 'encrypted_data')

        var requestData = xhrSendBuffer ? request.getBuffer() : request.getArray()

        var requestPromise
        var url = MtpDcConfigurator.chooseServer(self.dcID, self.upload)
        var baseError = {code: 406, type: 'NETWORK_BAD_RESPONSE', url: url}

        try {
          options = angular.extend(options || {}, {
            responseType: 'arraybuffer',
            transformRequest: null
          })
          requestPromise = $http.post(url, requestData, options)
        } catch (e) {
          requestPromise = $q.reject(e)
        }
        return requestPromise.then(
          function (result) {
            if (!result.data || !result.data.byteLength) {
              return $q.reject(baseError)
            }
            return result
          },
          function (error) {
            if (!error.message && !error.type) {
              error = angular.extend(baseError, {type: 'NETWORK_BAD_REQUEST', originalError: error})
            }
            return $q.reject(error)
          }
        )
      })
    }