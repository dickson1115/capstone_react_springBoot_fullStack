import React, { useContext } from 'react'

import styles from './CanvasWindow.module.css';
import ResizeDragElement from '../ResizeDragElement/ResizeDragElement';
import AuthContext from '../../AuthContext/AuthContext';
const CanvasWindow = ({ title, componentsInCanvas, viewingAngle}) => {
    return (
        <div className={styles.canvas_window}>
            <div style={{ width: "100%", margin: "5px" }}>{title}</div>
            <div id={"canvas_"+viewingAngle}  className={styles.canvas} style={{ textAlign:"left"}}>
                {componentsInCanvas.map((component, index) => (
                    <ResizeDragElement component={component} key={index} />
                    // <div>{id}, {src}, {index}</div>
                ))}
                
            </div>
        </div>
    )
}



export default CanvasWindow