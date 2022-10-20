import React from 'react'
import styles from './LayersWindow.module.css'
const LayersWindow = ({ title, componentsInCanvas, viewingAngle }) => {
  return (
    <div id={"layers_window_"+viewingAngle} className={styles.layers_window}>Layers
                    {componentsInCanvas.map(({ tabIndex, part_type }, index) => (
                      <div id={"layer_" + tabIndex} tabIndex={tabIndex} key={index} classname2={"layer"} className={styles.layer} style={{ width: "100%"}}>{part_type}</div>
                      
                    // <div>{id}, {src}, {index}</div>
                ))}
    </div>
  )
}

export default LayersWindow