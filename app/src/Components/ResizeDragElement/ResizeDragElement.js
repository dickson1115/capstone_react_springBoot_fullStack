import React from 'react'
import styles from './ResizeDragElement.module.css'
import '../BuildWindow/CanvasControl';

const ResizeDragElement = ({ src, id }) => {
  return (
    <img style={{zIndex:id}}tabIndex={id} src={src} classname2 = "resize_drag_element" className={styles.resize_drag_element + " resize_drag_element"} id={'resize_drag_element_'+id}/>
  )
}

export default ResizeDragElement