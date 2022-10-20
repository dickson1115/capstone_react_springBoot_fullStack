import React from 'react'
import styles from './ResizeDragElement.module.css'
import '../BuildWindow/CanvasControl';

const ResizeDragElement = ({ component }) => {
  console.log(component);
  var { src, tabIndex, data_x, data_y, height, width, z_index ,part_type} = component;
  return (
    <img part-type={part_type}  data-x={data_x} data-y={data_y} style={{ zIndex: z_index, height: height, width: width,transform: `translate(${data_x}px, ${data_y}px)` }}tabIndex={tabIndex} src={src} classname2 = "resize_drag_element" className={styles.resize_drag_element + " resize_drag_element"} id={'resize_drag_element_'+tabIndex}/>
  )
}

export default ResizeDragElement