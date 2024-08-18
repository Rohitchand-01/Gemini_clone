import React, { useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import useGemini from '../../api/useGemini'
import Result from "../Result/Result"

const main = () => {
  const {isGeminiLoading, getResponse} = useGemini()

 const [convo,setConvo] = useState([])

  const [value, setValue] = useState("")

  const handlSubmit = () => {
    if (isGeminiLoading) return
    if (value) {
      const text = value.trim();
      setConvo(prev => [...prev, {type: 'User', message: text}, {type: 'Gemini', message: "Loading..."}]);
      
      getResponse(value, (response, error) => {
        setConvo(prev => {
          prev.pop();
          return prev;
        })
        setConvo(prev => [...prev, {type: 'Gemini', message: response}])
      })
      setValue("")
    }
  }
  return (

    <div className="main">
      <div className="nav">
        <div className='logo'><img src={assets.gemini_icon} alt="" />
        <p>Gemini</p></div>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {convo.length===0 && <><div className="greet">
          <p><span>Hello, dev</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Breifly summarise this concept: urban Planning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstorm team bonding activiites for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div></>}

        {
          !(convo.length===0) && <div className='result_container'>
          {convo?.map((cnv, idx) => {
            return <Result type={cnv.type} response={cnv.message} />
          })}
          </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input type="text" value={value} onChange={(e) => {
              setValue(e.target.value)
            }} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlSubmit()
              }
            }} placeholder='Enter a promt here' />

            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={handlSubmit} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>

  )
}

export default main
