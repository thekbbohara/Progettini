const shareBtn = document.querySelector(".share-div")

shareBtn.addEventListener("click", (e)=>{
    // showShareMedia()
    if (window.innerWidth <= 750){
    document.querySelector(".mobile-media-div").style.display = "flex"
    }
})
window.addEventListener("resize",()=>{
    // showShareMedia()
    if (window.innerWidth >= 750){
    document.querySelector(".mobile-media-div").style.display = "none"
    }
})

