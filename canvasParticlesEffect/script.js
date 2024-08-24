import { Particles } from "./particles.js";
import { randomColor } from "./randomColorGenerator.js";


const canvas = document.querySelector("canvas#canvas1")
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvasWidth = canvas.width
const canvasHeight = canvas.height

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const MOUSE={x:0,y:0};
const numOfparticle = 10;
let hue = 0;
canvas.addEventListener('mousemove',(e)=>{
    MOUSE.x = e.x
    MOUSE.y = e.y
    // console.log(MOUSE);
    for(let i=0; i<numOfparticle;i++){
        particlesArray.push(new Particles(MOUSE.x,MOUSE.y,`hsl(${hue},100%,50%)`,ctx))
    }
})
canvas.addEventListener('click',()=>{
    for(let i=0; i<numOfparticle;i++){
        particlesArray.push(new Particles(MOUSE.x,MOUSE.y,'white',ctx))
    }
})
// const particle = new Particles(50,60)
// particle.update()
const particlesArray=[]

// function initParticle(){
//     for(let i=0;i<100;i++){
//         particlesArray.push(new Particles(MOUSE.x,MOUSE.y,canvasWidth,canvasHeight,randomColor(),ctx))
//     }
    
// }
// initParticle()

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        // console.log(particlesArray.length);
        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

function animate() {
    // ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.fillStyle='rgba(0,0,0,0.05)'
    ctx.fillRect(0,0,canvasWidth,canvasHeight)
    handleParticles();
    hue++;
    requestAnimationFrame(animate)
}
animate()