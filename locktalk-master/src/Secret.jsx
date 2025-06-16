import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import './Secret.css'
import { useNavigate } from 'react-router-dom';


function Secret() {
  const[msg,setMsg] = useState('');
  const[secret, setSecret] = useState('')
  const[password, setPassword] = useState('')
  const[hint,setHint] =useState('')
  const navigate = useNavigate()
  const[eform, SetEForm] = useState(true)
  const[dform, SetDForm] = useState(false)
  const[decryptedMsg, setDecryptedMsg] = useState('')
  const[copiedSecretMsg, setCopiedSecretMsg] = useState('')
  const[passwordForDecryption, setPasswordForDecryption] = useState('')


  const encryptMessage = ()=>{
      axios.post(`http://localhost:8080/encryptMsg?msg=${msg}&password=${password}`)
      .then((response) => {
        const secretmsg = response.data;
        setSecret(secretmsg);

         navigate("/success" , {
            state:{
                hint_msg : hint, 
                secret_msg : secretmsg}})
      })  
  }

    const decryptMessage = ()=>{
      axios.post(`http://localhost:8080/decryptMsg?secret=${encodeURIComponent(copiedSecretMsg)}&password=${encodeURIComponent(passwordForDecryption)}`)
      .then((response) => {
        const secretmsg = response.data;
        setDecryptedMsg(secretmsg);
        console.log(secretmsg)
      })  
  }



  return (
    <>
      <div className='container'>
            <h1>Lock - Talk</h1>
            <div style={{display:"flex", columnGap:"20px"}}>
              <button className={eform? 'active' : 'disable'} onClick={()=>{
                SetEForm(true)
                SetDForm(false)
                }}>Encrypt</button>

              <button className={dform? 'active':'disable'} onClick={()=>{
                SetDForm(true)
                SetEForm(false)
              }}>Decrypt</button>
            </div>

            {eform && <div id="form">
              <label>Message:</label>

              <textarea
              id="msg-box"
              required
              type="text"
              value={msg}
              onChange={(event)=>{setMsg(event.target.value)}}
              placeholder='Enter your message'
              />

              <label>Password:</label>
              <input
              required
              type='password'
              value={password}
              onChange={(event)=>{setPassword(event.target.value)}}
              placeholder='Enter your password'
              />

              <label>Hint for password:</label>
              <input
              type="text"
              value={hint}
              onChange={(event)=>{setHint(event.target.value)}}
              />
              <button onClick={encryptMessage}>Encrypt Message</button>
            </div>}

            {dform &&             
            <div id="decrypt-form">
              <label>Secret Message:</label>
              <input
              type='text'
              placeholder='Paste the secret message'
              value={copiedSecretMsg}
              onChange={(event)=>{
                setCopiedSecretMsg(event.target.value)
              }}
              />

              <label>Password:</label>
              <input
              placeholder="Decode the password from it's Hint"
              value={passwordForDecryption}
              onChange={(event)=>setPasswordForDecryption(event.target.value)}
              />

              <button onClick={decryptMessage}>Decrypt Message</button>


              <input
              readOnly
              value={decryptedMsg}
              />
            </div>}


      </div>
    </>
  )
}

export default Secret