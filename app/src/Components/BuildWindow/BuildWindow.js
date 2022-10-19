import React from 'react'
import styles from './BuildWindow.module.css'
import SideBar from './SideBar/SideBar'
import CanvasWindow from './CanvasWindow';
import LayersWindow from './LayersWindow';
const BuildWindow = ({ show, componentsInCanvas, viewingAngle}) => {
    return (
        <div style={{ display: show.display}}>
            <SideBar />
            <CanvasWindow title={show.viewingAngle} componentsInCanvas={componentsInCanvas} viewingAngle={viewingAngle} />
            <LayersWindow title={show.viewingAngle} componentsInCanvas={componentsInCanvas} viewingAngle={viewingAngle}/>
        </div>
    )
}

export default BuildWindow