/*
https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
https://stackoverflow.com/questions/3451670/java-aes-and-using-my-own-key
https://github.com/mdn/dom-examples/blob/master/web-crypto/encrypt-decrypt/aes-ctr.js
*/

const algorithm = {
  name: "AES-CTR",
  counter: Uint8Array.from([202, 114, 183, 160, 46, 0, 50, 179, 136, 27, 152, 36, 28, 157, 181, 195]).buffer,
  length: 64
}

//String key to CryptoKey
const toCryptoKey = async (stringKey) => {
  const keyBytes = new TextEncoder().encode(stringKey)
  const hash = await crypto.subtle.digest('SHA-384', keyBytes);
  return crypto.subtle.importKey("raw", hash.slice(0,16),   'AES-CTR' ,  false,   ["encrypt", "decrypt"]);
}

export const encryptMessage = async (stringKey, stringPlaintext) => {
  const key = await toCryptoKey(stringKey);
  const encoded = new TextEncoder("utf-8").encode(stringPlaintext);
  return await window.crypto.subtle.encrypt(algorithm, key, encoded);
}

export const decryptMessage = async (stringKey, ciphertextArrayBuffer) => {
  const key = await toCryptoKey(stringKey);
  const plaintext = await window.crypto.subtle.decrypt(algorithm, key, ciphertextArrayBuffer);
  return new TextDecoder("utf-8").decode(plaintext);
}

export const hashMessage = async (message) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const intArray = Array.from(new Uint8Array(hash));            
  return intArray.map(b => b.toString(16).padStart(2, '0')).join('')
}