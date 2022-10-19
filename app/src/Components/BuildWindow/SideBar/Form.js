import React from 'react'
import FormSessionComponent from './FormSessionComponent'
import styles from './Form.css'
const FormComponent = () => {
    const labelListEngine = ["x-position:", "y-position:", "z-position:", "Trust:"]
    const formSessionsData = new Array(["Engine", labelListEngine], ["Engine", labelListEngine], ["Engine", labelListEngine])

    return (
        <form >
            {
                // formSessionsData.map((mapEntry, index) => (
                //     <FormSessionComponent key={index} title={mapEntry[0]} label_list={mapEntry[1]} />
                // ))
                formSessionsData.map((mapEntry, index) => (
                    <FormSessionComponent key={index} title={mapEntry[0]} label_list={mapEntry[1]} />
                ))
            }
        </form>
    )
}


export default FormComponent