const nodeSrcLink = document.querySelector("nav>ul>li:nth-child(1)>a");
const nvmLink = document.querySelector("nav>ul>li:nth-child(2)>a");
// const navIndicator = document.querySelector("nav > ul > li:nth-child(1) > a::after ")
const nvmGuideSection = document.querySelector(".nvm-guide");
const nodeGuideSection = document.querySelector(".node-src-guide");
const root = document.documentElement;
nvmLink.addEventListener("click",(e)=>{
    root.style.setProperty('--active-position', '75%');
    nvmGuideSection.classList.remove('hidden');
    nodeGuideSection.classList.add('hidden');
})
nodeSrcLink.addEventListener("click",(e)=>{
    root.style.setProperty('--active-position', '25%');
    nvmGuideSection.classList.add('hidden');
    nodeGuideSection.classList.remove('hidden');
})

const codeCopyBtns = document.querySelectorAll(".copy-btn");

codeCopyBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        const parent = e.currentTarget.parentElement.parentElement
        const codeEl = parent.querySelector("code")
        const code = codeEl.innerText
        navigator.clipboard.writeText(code);
        
    })
})