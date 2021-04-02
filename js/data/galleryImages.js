import { encryptMessage, hashMessage, decryptMessage } from "../crypto.js"

//Create cipher:  
/*const cipher = await encryptMessage("nøkkel", JSON.stringify({
  //background: "images/hemmelig.jpg",
  messages: [
    {
      "x":50,
      "y":70,
      "message":"Hvorfor titter"
    },
    {
      "x":80,
      "y":100,
      "message":"akkurat du"
    },
    {
      "x":100,
      "y":180,
      "message":"i denne"
    },
    {
      "x":80,
      "y":300,
      "message":"kodebasen?"
    }
  ]
}));
console.log(await hashMessage("nøkkel"));
console.log("[" + new Uint8Array(cipher).join(",") + "]");*/
/*console.log(await decryptMessage("juks å titte i koden!", Uint8Array.from(
  [195,160,18,127,64,238,235,57,200,93,89,216,129,169,243,120,119,12,87,52,22,195,96,251,13,190,12,8,237,65,72,113,249,60,101,186,202,46,95,195,219,229,96,46,108,161,176,75,180,9,224,65,55,216,8,141,188,226,69,148,118,72,88,155,164,143,197,92,152,184,76,53,163,14,46,126,122,110,174,45,112,75,34,134,80,86,133,121,175,63,187,27,143,177,66,14,190,48,80,61,142,231,5,241,240,13,54,136,143,252,115,119,5,250,97,93,8,181,141,104,80,240,156,221,10,79,195,182,52,83,97,237,81,195,19,251,239,217,112,147,232,34,149,163,232,81,4]      
).buffer
));*/
// Copy array  to this structure:

const galleryImages = [
  {
    frontImageUrl: "images/gåsUnger.jpg",
    figcaption: "Gåsunger som spirer på trærne!",
    checksum: "fb8c4b268f75a50fbb5dfa5498d8c23127a37612f22eefe0cb60372a25b5f374",
    ciphertext: Uint8Array.from(
      [154,85,50,223,53,232,82,153,239,228,188,175,29,196,44,54,13,146,142,197,101,119,235,112,181,152,76,37,44,178,128,227,92,179,119,19,255,249,86,185,30,93,210,74,251,19,164,179,146,93,158,83,221,233,246,204,14,240,14,225,77,43,176,32,133,249,190,123,3,45,2,240,13,217,116,143,3,121,192,237,4,164,130,63,104,135,117,36,49,10,210,81,27,11,81,134,243,36,158,179,32,13,81,147,239,23,56,22,153,89,244,68,156,71,48,213,155,159,5,121,132,19,253,123,231,232,92,29,104,42,205,125,107,222,29,41,82,244,182,194,87,105,149,40,65,75,154,77,150,30,95,251,114,101,234,182,64,41,125,111,101,43,20,93]
    ).buffer
  },
  {
    frontImageUrl: "images/gotteri.jpg",
    figcaption: "Påskegodt i mange fine farger!",
    checksum: "6e28abf5ef35b100a65aec9c1d4d966173a246c071847b355cf51d3be62b8a98",
    ciphertext: Uint8Array.from(
      [162,217,96,245,163,31,63,34,49,122,205,246,138,50,133,229,229,112,33,169,198,143,131,121,27,119,97,242,55,152,8,67,200,85,195,217,178,199,153,87,30,142,111,232,79,75,48,68,249,166,137,29,40,24,91,25,3,209,233,58,49,76,61,140,85,223,58,223,225,241,134,219,149,34,165,187,114,244,161,175,123,159,167,232,235,78,227,70,60,151,41,249,171,178,30,238,133,77,247,100,62,232,200,226,233,51,100,231,89,176,53,28,158,27,42,10,223,135,23,145,84,160,159,248,179,155,6,109,65,175,213,169,205,225,121,239,11,91,136,64,122,195,145,192,136,108,96,168,39,158,50,164,31,255,125]
    ).buffer
  },
  {
    frontImageUrl: "images/gravenErTom.jpg",
    figcaption: "Jesu grav er tom",
    checksum: "f246c22dbcb1b88cafd044897ab302bf5fd4b95b8f6e854a8ad7849017b74c5d",
    ciphertext: Uint8Array.from(
      [205,143,22,149,89,121,127,120,94,218,37,129,196,176,122,245,112,200,222,4,171,134,142,6,245,29,114,69,112,187,120,5,147,93,239,216,205,233,7,181,196,6,115,154,7,43,74,150,142,158,102,42,57,244,191,249,159,115,13,254,170,162,22,117,222,178,7,121,63,40,33,9,92,221,201,44,139,171,220,163,0,98,144,24,44,211,33,224,250,158,159,36,32,192,85,28,78,98,84,3,158,250,142,142,127,29,229,0,67,126,76,35,177,48,143,14,21,119,159,243,68,215,148,214,101,96,2,114,23,14,195,18,116,14,242,104,165,197,3,231,28,107,5,70,213,178,5,196,181,172,109,64,222,37,126,178,87,111,27,85,145,173,49,227,115,32,72,179,163,200,242,158,148,215,171,59,206,182,156,30,255,63,117,111,33,147,138,27,53,21,112,91,78,31,22,138,250,238,135,98,100,118,43,147,43,247,75,52,110,146,12,221,6,193,9,67,189,60,59,228,166,28,164,40,46,18,115,78,180,18,184,92,216,12,102,54,246,188,75,236,28,255,236,221,83,133,196,176,242,59,72,107,104,51,120,105,153,253,202,180,246,252,18,203,249,115,84,148,122,69,162,134,197,36]
    ).buffer
  },
  {
    frontImageUrl: "images/hare.jpg",
    figcaption: "Søt og nysgjerrig hare i gresset!",
    checksum: "a2067fbed66e2cdfa85bb21c9a7483a931713bbf9f1fea3fbe45b2e6d216f4ea",
    ciphertext: Uint8Array.from(
      [227,249,93,98,17,167,187,104,157,2,89,155,248,232,229,51,101,26,68,111,67,156,49,227,72,225,26,1,255,35,40,60,174,127,39,234,143,54,81,130,219,211,0,52,108,161,177,86,180,13,238,0,32,144,6,149,227,183,6,203,53,86,31,131,171,157,165,43,190,255,66,106,185,75,51,126,122,125,215,72,23,75,38,136,17,69,203,107,185,44,227,78,208,224,90,75,225,35,92,47,144,241,70,166,173,75,117,146,198,165,107,45,21,244,122,95,10,162,214,55,70,184,142,149,4,87,155,227,107,2,121,168,14,210,25,233,241,201,51,199,173,127,197,241,175,14,99,38,210,132,208,195,122,205,134,185,253,11,111,12]
    ).buffer
  },
  {
    frontImageUrl: "images/krokus.jpg",
    figcaption: "Flotte, lilla krokus i blomst på fjellet!",
    checksum: "405cc80a3fc5a7f575a048dca157ede1d88518c87397f3f12b5951c4703db28f",
    ciphertext: Uint8Array.from(
      [134,154,211,25,221,43,103,185,17,68,30,138,247,213,33,135,209,59,128,143,245,252,156,51,19,55,1,44,190,188,3,172,67,149,156,165,20,209,224,166,164,220,52,183,13,172,195,11,120,26,84,255,72,227,178,22,245,18,181,30,105,74,72,86,31,100,125,136,202,234,152,124,200,154,101,41,235,134,71,160,13,57,90,98,121,235,132,200,192,230,117,57,106,174,175,25,50,237,229,106,35,134,213,155,132,180,42,142,140,41,193,26,64,65,165,36,81,252,12,47,21,167,218,191,71,35,177,104,246,38,59,133,227,215,27,17,116,201,213,44,253,120,230]
    ).buffer
  },
  {
    frontImageUrl: "images/kaninhull.jpeg",
    figcaption: "Her bor påskeharen!",
    checksum: "f610a340fbd5d6af9f39afca3ac42c5d244813a9827217110675dbc4887bd261",
    ciphertext: Uint8Array.from(
      [155,79,133,213,173,14,250,54,161,251,92,171,18,240,168,10,26,202,114,93,101,94,150,13,15,34,251,21,185,199,117,120,223,39,63,219,126,64,21,38,64,107,72,90,177,41,4,154,157,230,157,122,254,126,27,151,153,115,159,247,60,135,172,72,68,248,7,201,161,32,231,49,112,248,199,200,241,52,194,212,131,98,149,74,106,66,198,34,124,6,225,18,179,111,77,34,0,200,220,237,254,89,34,119,133,246,71,170,223,171,232,10,145,65,227,106,118,119,88,123,155,177,55,78,52,53,238,121]
    ).buffer
  },
  {
    frontImageUrl: "images/kors.jpg",
    figcaption: "Tre hjemmesnekrede kors som symboliserer golgata!",
    checksum: "9b40e3fe429b58110e87109d97a127212ae22185db7a4c6d052cb56880632d64",
    ciphertext: Uint8Array.from(
      [80,113,127,46,253,213,61,19,138,246,189,47,57,17,230,93,49,174,27,42,69,183,230,41,46,44,201,15,132,87,31,26,143,46,134,167,83,98,236,82,14,100,42,248,159,195,187,201,203,245,14,220,169,57,72,226,39,187,59,52,94,77,46,161,85,166,24,119,63,202,96,77,72,78,57,36,36,181,119,25,131,146,67,145,231,155,39,147,180,201,117,9,199,105,207,179,99,209,133,173,85,230,190,203,196,71,243,69,68,73,107,159,173,135,52,21,223,186,131,198,65,219,43,198,60,21,121,154,254,4,58,180,199,45,135,248,227,21,205,167,56,159,13,131,50,68,33,50,22,233,135,121,176,235,150,156,172,108,153,190,227,201,147]
    ).buffer
  },
  {
    frontImageUrl: "images/jesusLever.jpg",
    figcaption: "Et ark med budskap om at Jesus lever!",
    checksum: "9fdea7d457b55c29b2492cfce593b106e5b32714ea4d570bf2b07aa701538c42",
    ciphertext: Uint8Array.from(
      [65,159,160,180,8,147,138,154,29,225,82,151,78,158,42,16,151,180,8,107,13,125,7,100,47,229,182,51,166,199,111,92,93,130,7,245,77,106,76,7,10,50,189,50,223,181,32,34,217,200,157,121,234,169,131,32,85,162,158,226,77,115,162,232,39,160,31,113,73,89,177,144,238,242,246,112,111,123,253,188,237,174,12,14,14,3,175,224,210,180,46,93,183,110,82,73,134,45,82,131,61,24,90,71,191,105,238,158,156,67,117,80,93,81,153,13,240,118,153,195,117,31,192,250,225,12,45,197,132,251,253,214,110,75,153,72,83,36,10,109,106,127,7,93,105,211,24,180,51,147,5,59,63,30,55,21,125,124,254,112,24,153,144,179,150]
    ).buffer
  }
];

export default galleryImages;