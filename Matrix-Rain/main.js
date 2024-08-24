const canvas = document.querySelector('canvas#canvas1')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

// console.log(ctx);

let gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
gradient.addColorStop(0,"rgba(225,25,50,.25)")
gradient.addColorStop(0.2,"rgba(155,225,50,0.5)")
gradient.addColorStop(0.4,"rgba(80,225,5,.69)")
gradient.addColorStop(0.6,"rgba(50,125,0,.69)")
gradient.addColorStop(0.8,"rgba(100,225,50,0.69)")
gradient.addColorStop(1,"rgba(225,25,50,0.2)")


class Symbol{
    constructor(x,y,fontSize,canvasHeight){
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
        

    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillStyle = gradient;
        context.fillText(this.text, this.x*this.fontSize, this.y*this.fontSize)
        if(this.y*this.fontSize > this.canvasHeight && Math.random()>0.7){
            this.y=0;
        }else{
            this.y++;
        }
    }

}

class Effect{
    constructor(canvasWidth,canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        for(let i=0; i<this.columns; i++){
            this.symbols[i] = new Symbol(i,0,this.fontSize,this.canvasHeight)
        }
    }
    resize(width,height){
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = [];
        this.#initialize()
    }
}

const effect = new Effect(canvas.width, canvas.height)

let lastTime=0;

const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        ctx.font = effect.fontSize + "px monospace";
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.textAlign='center';
        ctx.fillRect(0,0,canvas.width,canvas.height)
        effect.symbols.forEach(symbol => symbol.draw(ctx))
        timer = 0
    }else{
        timer+=deltaTime;
    }
    requestAnimationFrame(animate)
}

animate(0)


window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // console.log("resized");
    effect.resize(canvas.width,canvas.height)
})
