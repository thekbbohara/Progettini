const colors='0123456789ABCDEF'

export const randomColor = () => {
    let colorCode = '#'
    for (let i = 0; i < 6; i++) {
        const randNum=()=> Math.floor(Math.random()*colors.length)
        colorCode += colors[randNum()]
    }
    return colorCode
}