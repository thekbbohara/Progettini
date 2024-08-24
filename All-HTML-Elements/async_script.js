import { runScript } from './script.js';
const body = document.querySelector("body");
// fetch('./data.html')
fetch('https://cdn.rawgit.com/kbzcraft/web-dev_edu/main/index.html')
    .then(response => response.text())
    .then(html => {
        const mainElement = document.createElement("main")
        mainElement.setAttribute("id", "content")
        mainElement.setAttribute("class", "main-content")
        // mainElement.classList.add("main-content")
        mainElement.innerHTML = html
        body.appendChild(mainElement)

        // Call the imported function to execute the code in script.js
        runScript();
        
        
    });
    const navDiv = document.querySelector("nav")
    const navHeight = navDiv.offsetHeight
console.log(navHeight);
const htmlElement= document.querySelector("html")
// htmlElement.style.scrollPaddingTop = `${navHeight}px`
const handleResize = () =>{
    if(navDiv.offsetWidth < 550){
        navDiv.querySelector("header").textContent = "HTML > Elements"
    }
    if(navDiv.offsetWidth > 550){
        navDiv.querySelector("header").textContent = "web-dev_edu > HTML > Elements"
    }
} 
handleResize()
window.addEventListener('resize', handleResize);

