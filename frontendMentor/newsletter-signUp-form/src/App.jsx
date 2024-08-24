import { useState } from 'react'
import './styles/style.scss'
import './styles/sucess.scss'

function App() {
  const [email, setEmail] = useState("");
  const validateEmail = (userEmail) =>{
    const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regx.test(userEmail)
  }
  const handelSubmit = (event)=> {
    event.preventDefault()
    if(validateEmail(email)){
      document.querySelector(".sign-up-form").style.display = "none"
      document.querySelector(".success").style.display = "flex"
      document.querySelector("#container").style.maxWidth = "550px"
      document.querySelector("#container").style.padding = "4rem 1rem"
      document.querySelector("#container").style.borderRadius = "2.5rem"
    } else {
      document.querySelector(".errMsg").style.display = "block"
    }
}
  return (
    <>
      <main id='container'>
      {/* <!-- Sign-up form start --> */}
      <section className="sign-up-form">
            <div className="context">
            <h1>Stay updated!</h1>
            <h2>Join 60,000+ product managers receiving monthly updates on:</h2>
            <ul>
            <li>Product discovery and building what matters</li>
            <li>Measuring to ensure updates are a success</li>
            <li>And much more!</li>
            </ul>
            <form onSubmit={handelSubmit}>
            <label htmlFor="email"><span>Email address</span><span className='errMsg'>Valid email required</span></label>
            <input 
                type="text"
                name="email"
                id="email"
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
                placeholder='email@company.com'
                aria-placeholder='enter your email'
            />
            <button type='submit'>              
            Subscribe to monthly newsletter
            </button>            
            </form>

            </div>
            <div className="bg-img">
                <picture>
                    <source media="(min-width:585px)" srcSet="https://raw.githubusercontent.com/kbzcraft/newsletter-signUp-form/af9b02cef39f815d1cfece1e6555027cf78c5d2b/public/assets/images/illustration-sign-up-desktop.svg" />
                    <img src="https://raw.githubusercontent.com/kbzcraft/newsletter-signUp-form/af9b02cef39f815d1cfece1e6555027cf78c5d2b/public/assets/images/illustration-sign-up-mobile.svg" alt="illustration" />
                </picture>
            </div>
        </section>


      {/* <!-- Sign-up form end --> */}

      {/* <!-- Success message start --> */}
      <section className="success">
            <img src="https://raw.githubusercontent.com/kbzcraft/newsletter-signUp-form/main/public/assets/images/icon-success.svg" alt="sucessed" />
            <h1>
                Thanks for subscribing!
            </h1>
            <p>
                A confirmation email has been sent to<strong> {email}</strong>. 
                Please open it and click the button inside to confirm your subscription.
            </p>
            <button id="disableBtn">
            Dismiss message
            </button>
        </section>
      {/* <!-- Success message end --> */}
      </main>
    </>
  )
}

export default App
