import { encryptMessage, hashMessage } from "../crypto.js"

//Create cipher: 
const cipher = await encryptMessage("test2", JSON.stringify([
  {
    x: 100,
    y: 200,
    message: "BØ!"
  }
]));
console.log(await hashMessage("test2"));
console.log("[" + new Uint8Array(cipher).join(",") + "]");
// Copy array  to this structure:

const galleryImages = [
  {
    frontImageUrl: "/images/paaskeegg.png",
    figcaption: "Enestående egg!",
    checksum: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    ciphertext: Uint8Array.from(
      [162,12,240,43,207,46,225,138,194,86,106,5,50,33,193,131,180,139,54,184,153,165,73,119,220,234,69,186,69,80,72,127,104,190,89,230,209,206,157,88,229,22,212,58,220,175,207,180,6,102,145,181,101,216,117,111,189,30,87,178,175,252,210,220,169,225,28,166,137,109,154,255,206,30,5,187,216,35,233,226,64,236,55,125,246,122,126,14]
    ).buffer
  },
  {
    frontImageUrl: "/images/hareoerer.png",
    figcaption: "Flotte og lodne ører!",
    checksum: "60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752",
    ciphertext: Uint8Array.from(
      [35,87,63,97,218,76,205,193,76,195,255,193,204,249,125,123,131,179,26,87,123,151,41,235,111,255,135,220,244,59,109,60,102,8,174,48]
    ).buffer
  }
];

export default galleryImages;