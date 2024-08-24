const submitBtn = document.querySelector("button")
const errMsg = document.querySelector('[data-err-msg=""]');
submitBtn.addEventListener("click",(e)=>{
    const userEmail = document.querySelector("input")
    e.preventDefault()
    inputValue = userEmail.value
    if(!validateEmail(inputValue)){
        errMsg.setAttribute('data-err-msg',"please enter a valid gmail");
    } else {
        userEmail.parentElement.parentElement.submit()
    }
    
})

function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return emailRegex.test(email) && gmailRegex.test(email);
}
