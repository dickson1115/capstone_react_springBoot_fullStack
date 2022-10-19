import React, { useContext } from 'react'
import AircraftComponent from './AircraftComponent'
import styles from './AircraftComponents.module.css'
import AuthContext from '../../AuthContext/AuthContext'

const AircraftComponents = ({  }) => {
    const { componentsPropsEntry } = useContext(AuthContext);
    return (
        <div className={styles.scroll_menu} style={{ display: "flex", gap: "5px" }}>{
            componentsPropsEntry[1].map(({ tabIndex, image, name }, index) => (
                <AircraftComponent key={index} tabIndex={tabIndex} image={image} name={name} />
            ))}
        </div>
    )
}
export default AircraftComponents