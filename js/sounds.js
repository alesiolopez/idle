let botonimg = document.querySelector(".img-btn")
let audioEtiqueta = document.querySelector("audio")

botonimg.addEventListener("click", () => {
     audioEtiqueta.setAttribute("src", "./sound/single-coin1.mp3")
     audioEtiqueta.play()
     //console.log(`Reproduciendo: ${audioEtiqueta.src}`)
});
