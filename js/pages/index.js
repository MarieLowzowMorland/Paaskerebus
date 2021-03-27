/*
https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
https://stackoverflow.com/questions/3451670/java-aes-and-using-my-own-key
https://github.com/mdn/dom-examples/blob/master/web-crypto/encrypt-decrypt/aes-ctr.js
*/
const counter = Uint8Array.from([202, 114, 183, 160, 46, 0, 50, 179, 136, 27, 152, 36, 28, 157, 181, 195]).buffer;


const keyDataToKey = async (keyData) => {
  const keyBytes = new TextEncoder().encode(keyData)
  const hash = await crypto.subtle.digest('SHA-384', keyBytes);
  return crypto.subtle.importKey("raw", hash.slice(0,16),   'AES-CTR' ,  false,   ["encrypt", "decrypt"]);
}

const encryptMessage = async (keyData, text) => {
  const key = await keyDataToKey(keyData);
  const encoded = new TextEncoder("utf-8").encode(text);
  // counter will be needed for decryption
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter,
      length: 64
    },
    key,
    encoded
  );
  return ciphertext;
}
//console.log(await encryptMessage("test", "secret!"))
const ciphertextA = [
  138,
  18,
  177,
  33,
  136,
  96,
  241
]

const decryptMessage = async (keyData, ciphertext) => {
  const key = await keyDataToKey(keyData);
  const plaintext = await window.crypto.subtle.decrypt(
    {
      name: "AES-CTR",
      counter,
      length: 64
    },
    key,
    ciphertext
  );
  return new TextDecoder("utf-8").decode(plaintext);
}
//console.log(await decryptMessage("test", Uint8Array.from(ciphertextA).buffer))
//console.log(await decryptMessage("test", await encryptMessage("test", "secret!")))

const 
  egg = document.getElementById("egg"),
  eggCanvas = egg.getContext('2d'),
  scratchRadius = 50,
  img = new Image();

img.src = "../../images/paaskeegg.png"
img.onload = () => eggCanvas.drawImage(img, 0, 0, egg.width, egg.height);

const writeSecret = async (key) => {
  const canvas = document.getElementById("test");
  const ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50);
  const secret = await decryptMessage(key, Uint8Array.from(ciphertextA).buffer);
  console.log(secret)
  ctx.fillText(secret, 500, 400);
}
      
const scratch = (point) => {
  const {x, y} = point;
	eggCanvas.beginPath();
  eggCanvas.arc(x, y, scratchRadius, 0, 2 * Math.PI, true);
  eggCanvas.globalCompositeOperation = "destination-out";
  eggCanvas.fill();
}

const leftButtonPressed = (event) => event.which === 1 || event.buttons === 1 || event.button === 1;

const boundedPoint = (x, y) => {
  const { left, right, top, bottom } = egg.getBoundingClientRect();
  const relativeX = ( x - left) / ( right - left);
  const relativeY = ( y - top ) / ( bottom - top);

  return {
    x: Math.floor( relativeX * egg.width),
    y: Math.floor( relativeY * egg.height)
  };
}

const digestMessage = async (message) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const intArray = Array.from(new Uint8Array(hash));            
  return intArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

document.getElementById("coin").addEventListener("click", async () => {
  const inputText = document.getElementById("testText").value;
  //console.log(inputText);
  const checksum = await digestMessage(inputText);
  //console.log(checksum);
  const answer = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
  if(checksum === answer){
    egg.classList.add("scratchable");
    writeSecret(inputText);
  
    egg.addEventListener("mousemove", function(e) {
      e.preventDefault();
      if (leftButtonPressed(e)) {
        scratch(boundedPoint(e.clientX, e.clientY));
      }
    });
    
    egg.addEventListener("touchmove", function(e) {
      e.preventDefault();
      const touch = e.targetTouches[0];
      if (touch) {
        scratch(boundedPoint(touch.pageX, touch.pageY));
      }
    });
  }
})
