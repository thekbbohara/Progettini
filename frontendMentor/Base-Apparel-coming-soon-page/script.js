const errIcon = document.querySelector(".error-icon");
const errMsg = document.querySelector(".error-msg");
const submitBtn = document.querySelector(".submit-btn");
// console.log(submitBtn)

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the pattern
    return emailPattern.test(email);
}
// console.log(isValidEmail("khagrndrabhr@gmail.com"));

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const email = document.querySelector("input").value
    console.log(email);
    if(!isValidEmail(email)){
        errMsg.style.display = "block";
        errIcon.style.display = "flex";
    }else {
        // Form validation passed, submit the form
        document.getElementById("myForm").submit();
      }

})