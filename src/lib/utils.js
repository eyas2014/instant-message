function nextRandomInt (maxValue) {
  return Math.floor(Math.random() * maxValue)
}

function bufferConcat (buffer1, buffer2) {
  var l1 = buffer1.byteLength || buffer1.length
  var l2 = buffer2.byteLength || buffer2.length
  var tmp = new Uint8Array(l1 + l2)
  tmp.set(buffer1 instanceof ArrayBuffer ? new Uint8Array(buffer1) : buffer1, 0)
  tmp.set(buffer2 instanceof ArrayBuffer ? new Uint8Array(buffer2) : buffer2, l1)

  return tmp.buffer
}