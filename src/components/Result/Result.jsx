import React from 'react'
import { assets } from '../../assets/assets'
import showdown from 'showdown'
import parse from 'html-react-parser';
import './Result.css'


const Result = (props) => {
    const converter = new showdown.Converter();
    let text = props.response;
    let res = converter.makeHtml(text);

    if (props.type != 'Gemini') {
        return (
            <div className='main-12end'>
                <div className='result'>
                    <img src={assets.user_icon} alt="" />
                    {parse(res)}
                </div>
            </div>
        )
    }
    return (
        <div className='main-13'>
            {/* <div className="nav-12">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div> */}
            <div className='gemini-result'>
                <img src={assets.gemini_icon} alt="" />
            <div>{parse(res)}</div>
            </div>
        </div>
    )
}

export default Result
