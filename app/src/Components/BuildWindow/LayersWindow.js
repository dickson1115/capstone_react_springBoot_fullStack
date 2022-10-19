import React from 'react'
import styles from './LayersWindow.module.css'
const LayersWindow = ({ title, componentsInCanvas, viewingAngle }) => {
  return (
    <div id={"layers_window_"+viewingAngle} className={styles.layers_window}>Layers
                    {componentsInCanvas.map(({ id, name }, index) => (
                      <div id={"layer_" + id} tabIndex={id} key={index} classname2={"layer"} className={styles.layer} style={{ width: "100%"}}>{name}</div>
                      
                    // <div>{id}, {src}, {index}</div>
                ))}
    </div>
  )
}

export default LayersWindow