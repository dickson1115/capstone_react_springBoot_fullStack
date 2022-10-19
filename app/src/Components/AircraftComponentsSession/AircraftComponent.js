import React, { useContext } from 'react'
import styles from './AircraftComponent.module.css'
import AuthContext from '../../AuthContext/AuthContext'
// onclick={aircraft_component_onclick(this)

const AircraftComponent = ({ tabIndex, image, name }) => {
    const { createComponentInCanvas } = useContext(AuthContext);
    return ( 
        <div tabIndex={tabIndex} className={styles.aircraft_component_container} onClick={(e) => createComponentInCanvas(e.target)}>
            <img src={image} />
            <div>{name}</div>
        </div>
    )
}

export default AircraftComponent