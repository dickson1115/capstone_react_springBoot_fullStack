import React from 'react'
import Form from './Form'
import styles from './SideBar.module.css'
import AuthContext from '../../../AuthContext/AuthContext'
import { useContext } from 'react'
const SideBar = () => {
    const { saveProjectOnClick } = useContext(AuthContext);
    return (
        <div className={styles.side_bar}>
            <Form />
            <button onClick={saveProjectOnClick}>Save Project</button>
        </div>
    )
}

export default SideBar