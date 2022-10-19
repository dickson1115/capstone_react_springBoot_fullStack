import React from 'react'


const FormSessionComponent = ({ title, label_list }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <h5 style={{ textAlign: "center", margin:"5px"}}>{title}</h5>
            {
                label_list.map((label, index) => (
                <div key={index}>
                    <label style={{ fontSize: "smaller", margin:"5px"}}>{label}</label>
                    <input />
                </div>
                ))}
                </div>

    )
}

export default FormSessionComponent