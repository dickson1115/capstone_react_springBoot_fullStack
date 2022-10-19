import React from 'react'

const DropDown = ({ dropDownOptions, dropDownOnChange, style}) => {
    return (
        // <select onchange="dropDownOnChange(this)">
        <select style={style} onChange={(e) => dropDownOnChange(e.target.value)}>
            {
                dropDownOptions.map((text,index) => (
                    <option key={index}>{text}</option>
                ))
            }
        </select>
    )
}

export default DropDown