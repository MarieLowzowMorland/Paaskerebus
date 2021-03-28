import { decryptMessage, hashMessage } from "../crypto.js"
import galleryImages from "../data/galleryImages.js"

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

const scratchRadius = 50;
const gallery = document.getElementById("gallery");

const leftButtonPressed = (event) => event.which === 1 || event.buttons === 1 || event.button === 1;

const galleryImageTemplate = (galleryImage) => /*template*/`
  <div>
    <figure class="gallery-image-container">
      <canvas width="300" height="500"></canvas>
      <canvas class="gallery-image" width="300" height="500"></canvas>
      <figcaption>${galleryImage.figcaption}</figcaption>
    </figure>
    <form>
      <input type="text" name="key-guess" placeholder="Kom med tilbakemelding"/>
      <button type="submit">Send</button>
    </form>
  </div>`;

galleryImages.forEach(galleryImage => {
  gallery.insertAdjacentHTML("afterbegin", galleryImageTemplate(galleryImage));
  const currentElement = gallery.firstElementChild;
  const imageForm = currentElement.querySelector("form");
  const lowerCanvas = currentElement.querySelector("canvas");
  const upperCanvas = currentElement.querySelector(".gallery-image");
  const upperCanvasContext = upperCanvas.getContext('2d');
  const img = new Image();
  img.src = galleryImage.frontImageUrl;
  img.onload = () => upperCanvasContext.drawImage(img, 0, 0, upperCanvas.width, upperCanvas.height);

    
  const scratch = (point) => {
    const {x, y} = point;
    const ctx = upperCanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, scratchRadius, 0, 2 * Math.PI, true);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill();
  }

  const boundedPoint = (x, y) => {
    const { left, right, top, bottom } = upperCanvas.getBoundingClientRect();
    const relativeX = ( x - left) / ( right - left);
    const relativeY = ( y - top ) / ( bottom - top);

    return {
      x: Math.floor( relativeX * upperCanvas.width),
      y: Math.floor( relativeY * upperCanvas.height)
    };
  }

  const writeSecret = async (ciphertext, key) => {
    const ctx = lowerCanvas.getContext("2d");
    ctx.font = "30px Arial";
    
    const secrets = JSON.parse(await decryptMessage(key, ciphertext));
    secrets.forEach(secret => {
      const { x, y, message} = secret;
      ctx.fillText(message, x, y);
    });
  }
  
  imageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const keyGuess = event.target["key-guess"].value;
    const hash = await hashMessage(keyGuess);
    const { checksum, ciphertext } = galleryImage;

    if(hash === checksum){
      upperCanvas.classList.add("scratchable");
      writeSecret(ciphertext, keyGuess);
    
      upperCanvas.addEventListener("mousemove", function(e) {
        e.preventDefault();
        if (leftButtonPressed(e)) {
          scratch(boundedPoint(e.clientX, e.clientY));
        }
      });
      
      upperCanvas.addEventListener("touchmove", function(e) {
        e.preventDefault();
        const touch = e.targetTouches[0];
        if (touch) {
          scratch(boundedPoint(touch.clientX, touch.clientY));
        }
      });
    }
  })
});
