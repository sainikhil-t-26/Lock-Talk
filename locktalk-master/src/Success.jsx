import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Success() {

    const location = useLocation()

    const{hint_msg, secret_msg} = location.state
    

  return (
   <>
            <div
            style={{
                width:"100vw",
                height:"100vh",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
                <div style={{border:"1px solid black", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"centet",rowGap:"10px",padding:"12px",borderRadius:"12px"}}>
                         <h1>Your message has been secured</h1>
                <h1>You can copy & send the blow given content to your friend</h1>
                <h2>Copy the secret message in the decoder box and type the password based on the Hint that I have provided</h2>
                <h3>Secret message : {secret_msg}</h3>
                <h3>Password hint : {hint_msg}</h3>

                <Link to="/"><button>Go to Home </button></Link>
                </div>
               
            </div>
   </>
  )
}

export default Success