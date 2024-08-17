import React, { useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import useGemini from '../../api/useGemini'

const main = () => {
  const {isGeminiLoading, getResponse} = useGemini()

  const [value, setValue] = useState("")
  return (

    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        <div className="greet">
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
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input type="text" value={value} onChange={(e) => {
              setValue(e.target.value)
            }} placeholder='Enter a promt here' />

            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => {
                if (value) {
                  const text = value.trim();
                  getResponse(value, (response, error) => {
                    console.log(response)
                  })
                  setValue("")
                }
              }} src={assets.send_icon} alt="" />
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
