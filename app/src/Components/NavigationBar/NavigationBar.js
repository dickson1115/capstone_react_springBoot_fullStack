import React, { useContext } from 'react'
import authContext from '../../AuthContext/AuthContext'
import logo from '../../img/logo.png'
import styles from './NavigationBar.module.css'
const NavigationBar = () => {
    const { navigationBarButtons } = useContext(authContext);
    return (
        <div>
            <div className={styles.navigation_bar_container}>

                <div style={{ width: "100%", display: "flex", justifyContent: 'space-between' }}>
                <div><img src={logo} style={{ height: "30px" }} /></div>
                    {navigationBarButtons.map(({ text, href }, index) => (
                        <a key={index} href={href} >{text}</a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavigationBar