// import { randomColor } from "./randomColorGenerator"

export class Particles{
    constructor(x,y,color="#0000ff",ctx){
        this.x = x
        this.y = y
        // this.x = Math.random()*cw
        // this.y = Math.random()*ch
        this.color = color
        this.size = Math.random()*5+1
        this.speedX = Math.random()*3-1.5
        this.speedY = Math.random()*3-1.5
        this.ctx = ctx
    }
    update(){
        // console.log(this.x, this.y);
        this.x += this.speedX
        this.y += this.speedY
        if(this.size>0.2) this.size -= 0.05;
    }
    draw(){
        this.ctx.fillStyle=this.color
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.size,0,2*Math.PI)
        this.ctx.fill()
    }
}




