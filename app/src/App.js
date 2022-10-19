import interact from "interactjs";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import AircraftComponentsSession from "./Components/AircraftComponentsSession/AircraftComponentsSession"
import SideBar from "./Components/BuildWindow/SideBar/SideBar";
import BuildWindow from "./Components/BuildWindow/BuildWindow";
import ResizeDragElement from "./Components/ResizeDragElement/ResizeDragElement";
import AuthContext from "./AuthContext/AuthContext";
// import LoginSession from "./LoginPage/LoginSession"
import imageEngineFront from "./img/components/engine_front.png";
import imageEngineSide from "./img/components/engine_side.png";
import imageEngineTop from "./img/components/engine_top.png";

import imageFuselageFront from "./img/components/fuselage_front.png";
import imageFuselageSide from "./img/components/fuselage_side.png";
import imageFuselageTop from "./img/components/fuselage_top.png";

import imageHorizontalStabFront from "./img/components/horizontal_stab_front.png";
import imageHorizontalStabSide from "./img/components/horizontal_stab_side.png";
import imageHorizontalStabTop from "./img/components/horizontal_stab_top.png";

import imageVerticalStabFront from "./img/components/vertical_stab_front.png";
import imageVerticalStabSide from "./img/components/vertical_stab_side.png";
import imageVerticalStabTop from "./img/components/vertical_stab_top.png";

import imageWheelFront from "./img/components/wheel_front.png";
// import imageWheelSide from "./img/components/wheel_side.png";
// import imageWheelTop from "./img/components/wheel_top.png";

import imageWingFront from "./img/components/wing_front.png";
import imageWingSide from "./img/components/wing_side.png";
import imageWingTop from "./img/components/wing_top.png";
import './Components/BuildWindow/CanvasControl'
import './App.css'
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import LoginPage from "./LoginPage/LoginPage";
// import RegisteringPage from "./RegisteringPage/RegisteringPage"

import { BrowserRouter, Routes, Route} from "react-router-dom";
var trace = [];
var trace_forward = [];
function App() {
  const navigationBarButtons = [
    { text: "Home", href: "#" },
    { text: "Tutorial", href: "#" },
    { text: "Builder", href: "#" },
    { text: "Explore", href: "#" },
    { text: "About", href: "#" },
    { text: "Login", href: "#" }
  ]
  var componentsPropsFront = [
    { tabIndex: 1, image: imageEngineFront, name: "Engine" },
    { tabIndex: 2, image: imageFuselageFront, name: "Fuselage" },
    { tabIndex: 3, image: imageHorizontalStabFront, name: "Horizontal Stabilizer" },
    { tabIndex: 4, image: imageVerticalStabFront, name: "Vertical Stabilizer" },
    { tabIndex: 5, image: imageWheelFront, name: "Wheel" },
    { tabIndex: 6, image: imageWingFront, name: "Wing" },
  ];
  var componentsPropsSide = [
    { tabIndex: 1, image: imageEngineSide, name: "Engine" },
    { tabIndex: 2, image: imageFuselageSide, name: "Fuselage" },
    { tabIndex: 3, image: imageHorizontalStabSide, name: "Horizontal Stabilizer" },
    { tabIndex: 4, image: imageVerticalStabSide, name: "Vertical Stabilizer" },
    // { tabIndex: 5, image: imageWheelSide, name: "Wheel" },
    { tabIndex: 6, image: imageWingSide, name: "Wing" },
  ];
  var componentsPropsTop = [
    { tabIndex: 1, image: imageEngineTop, name: "Engine" },
    { tabIndex: 2, image: imageFuselageTop, name: "Fuselage" },
    { tabIndex: 3, image: imageHorizontalStabTop, name: "Horizontal Stabilizer" },
    { tabIndex: 4, image: imageVerticalStabTop, name: "Vertical Stabilizer" },
    // { tabIndex: 5, image: imageWheelTop, name: "Wheel" },
    { tabIndex: 6, image: imageWingTop, name: "Wing" },
  ];

  const componentsMap = new Map([
    ["front", componentsPropsFront],
    ["side", componentsPropsSide],
    ["top", componentsPropsTop],
  ]);

  const dropDownOptionsViews = ["Front", "Side", "Top"];

  const [dropDownOptionsAircraftModels, setdropDownOptionsAircraftModels] =
    useState(["Boeing787"]);

  const [componentsPropsEntry, setComponentsPropsEntry] = useState([
    "front",
    componentsMap.get("front"),
  ]);


  //[front, side, top]
  const [showBuildWindow, setShowBuildWindow] = useState([
    {
      viewingAngle: "Front",
      display: "flex",
    },
    {
      viewingAngle: "Side",
      display: "none",
    },
    {
      viewingAngle: "Top",
      display: "none",
    },
  ]);


  const createComponentInCanvas = (target) => {
    var viewingAngle = componentsPropsEntry[0];
    if (viewingAngle == "front") {
      var resize_drag_element_object = {
        id: componentsInCanvasFront.length,
        src: target.firstChild.src,
        name: target.lastChild.textContent,
      }
      setComponentsInCanvasFront(componentsInCanvasFront => [...componentsInCanvasFront, resize_drag_element_object]);
    }
    else if (viewingAngle == "side") {
      var resize_drag_element_object = {
        id: componentsInCanvasSide.length,
        src: target.firstChild.src,
        name: target.lastChild.textContent,
      }
      setComponentsInCanvasSide(componentsInCanvasSide => [...componentsInCanvasSide, resize_drag_element_object]);
    }
    else {
      var resize_drag_element_object = {
        id: componentsInCanvasTop.length,
        src: target.firstChild.src,
        name: target.lastChild.textContent,
      }
      setComponentsInCanvasTop(componentsInCanvasTop => [...componentsInCanvasTop, resize_drag_element_object]);
    }
    trace.push({
      action: 'Create',
      id: componentsInCanvasFront.length,
      viewingAngle: viewingAngle,

    });
    console.log(trace);
    trace_forward = [];
  }
  // const modifyComponentInCanvas = (id) => {

  //   setComponentsInCanvas([...target]);
  // }
  // const deleteComponentInCanvas = (target) => {
  //   setComponentsInCanvas([...target]);
  // }
  const dropDownViewOnChange = (viewingAngle_downDown) => {
    viewingAngle_downDown = viewingAngle_downDown.toLowerCase();
    setComponentsPropsEntry([viewingAngle_downDown, componentsMap.get(viewingAngle_downDown)]);
    var map = showBuildWindow.map(({ viewingAngle, display }) => {
      var viewingAngle_show_lower = viewingAngle.toLowerCase();
      if (viewingAngle_downDown == viewingAngle_show_lower) {
        display = "flex";
      }
      else {
        display = "none";
      }
      return {
        viewingAngle: viewingAngle,
        display: display,
      }
    }
    )
    setShowBuildWindow(map);
  };

  const dropDownAircraftModelOnChange = (aircraftModel) => { };
  // var trace = [];
  // var trace_forward = [];
  const [componentsInCanvasFront, setComponentsInCanvasFront] = useState([
  ]);

  const [componentsInCanvasSide, setComponentsInCanvasSide] = useState([
  ]);

  const [componentsInCanvasTop, setComponentsInCanvasTop] = useState([
  ]);
  // const [loading, setLoading] = useState(false);
  // const { id } = useParams();
  // useEffect(() => {
  //   if (id !== 'new') {
  //     var data_arr = [];
  //     fetch(`/api/user/${id}`)
  //       .then(response => response.json())
  //       .then(data => data_arr.push(data));
  //       data_arr.forEach(element => {
  //       if (element.view == "front"){
  //         setComponentsInCanvasFront(...componentsInCanvasFront,element);
  //       }});
  //   }
  // }, [id, setComponentsInCanvasFront]);
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // const api = axios.create({
  //   baseURL: 'http://localhost:8082'
  // })
  const [componentsInCanvas, setComponentsInCanvas] = useState([]);
  var object = {
    height: "141px",
    src: "http://localhost:3000/static/media/horizontal_stab_front.8638d5a4a2a1b5344ad5.png",
    data_x: "326",
    data_y: "191",
    view: "front",
    width: "343.203px",
    z_index: "0",
    class: "ResizeDragElement_resize_drag_element__eQOBs resize_drag_element",
    classname2: "resize_drag_element",
    tabIndex: "0",
    transform: "translate(149px, 120px)",
  }

  const saveProjectOnClick = () => {
    var elements = [];
    var children_elements = document.querySelector("#canvas_front").children;
    for (const child of children_elements) {
      var element = {
        height: child.style.height,
        src: child.getAttribute("src"),
        data_x: child.getAttribute("data-x"),
        data_y: child.getAttribute("data-y"),
        view: "front",
        width: child.style.width,
        z_index: child.style.zIndex,
        class: child.getAttribute("class"),
        classname2: child.getAttribute("classname2"),
        id: child.getAttribute("id"),
        tabIndex: child.getAttribute("tabindex"),
        transform: child.style.transform,
      };
      const api = axios.create({
        baseURL: "http://localhost:8083"
      })


      // console.log(api.get('/').then(res=>{
      //   console.log(res.data)
      // }));

      api.post('/post', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      elements.push(element);
    }
    var children_elements = document.querySelector("#canvas_side").children;
    for (const child of children_elements) {
      var element = {
        height: child.style.height,
        src: child.getAttribute("src"),
        data_x: child.getAttribute("data-x"),
        data_y: child.getAttribute("data-y"),
        view: "side",
        width: child.style.width,
        z_index: child.style.zIndex,
        class: child.getAttribute("class"),
        classname2: child.getAttribute("classname2"),
        id: child.getAttribute("id"),
        tabIndex: child.getAttribute("tabindex"),
        transform: child.style.transform,
      };
      elements.push(element);
    }
    var children_elements = document.querySelector("#canvas_top").children;
    for (const child of children_elements) {
      var element = {
        height: child.style.height,
        src: child.getAttribute("src"),
        data_x: child.getAttribute("data-x"),
        data_y: child.getAttribute("data-y"),
        view: "top",
        width: child.style.width,
        z_index: child.style.zIndex,
        class: child.getAttribute("class"),
        classname2: child.getAttribute("classname2"),
        id: child.getAttribute("id"),
        tabIndex: child.getAttribute("tabindex"),
        transform: child.style.transform,
      };
      elements.push(element);
    }
    // setComponentsInCanvas(...componentsInCanvas, elements);


    // var newElement = document.createElement('img');
    // newElement.setAttribute("class",object.class);
    // newElement.setAttribute("src",object.src);
    // newElement.setAttribute("data-x", object.data_x);
    // newElement.setAttribute("data-y", object.data_y);
    // newElement.setAttribute("classname2", object.classname2);
    // newElement.setAttribute("tabIndex", object.tabIndex);
    // newElement.style.transform = object.transform;
    // newElement.style.height = object.height;
    // newElement.style.width = object.width;
    // document.querySelector("#canvas_"+object.view).appendChild(newElement);
  }
  return (
    //530 media queries
    <AuthContext.Provider value={{
      navigationBarButtons: navigationBarButtons,
      dropDownOptionsViews: dropDownOptionsViews,
      dropDownOptionsAircraftModels: dropDownOptionsAircraftModels,
      componentsPropsEntry: componentsPropsEntry,
      dropDownViewOnChange: dropDownViewOnChange,
      dropDownAircraftModelOnChange: dropDownAircraftModelOnChange,
      createComponentInCanvas: createComponentInCanvas,
      trace: trace,
      trace_forward: trace_forward,
      saveProjectOnClick: saveProjectOnClick,

    }}>

      <div className="App">
        {/* <LoginPage/> */}
        <BrowserRouter >
        <Routes >
            <Route path="/" element={<LoginPage />}/>
              <Route path="/build" element={
                <body>
                  <NavigationBar />
                  <AircraftComponentsSession />
                  <BuildWindow show={showBuildWindow[0]} componentsInCanvas={componentsInCanvasFront} viewingAngle={"front"} />
                  <BuildWindow show={showBuildWindow[1]} componentsInCanvas={componentsInCanvasSide} viewingAngle={"side"} />
                  <BuildWindow show={showBuildWindow[2]} componentsInCanvas={componentsInCanvasTop} viewingAngle={"top"} />
                </body>
              } />
          </Routes >
        </BrowserRouter >
        {/* <NavigationBar />
        <AircraftComponentsSession />
        <BuildWindow show={showBuildWindow[0]} componentsInCanvas={componentsInCanvasFront} viewingAngle={"front"} />
        <BuildWindow show={showBuildWindow[1]} componentsInCanvas={componentsInCanvasSide} viewingAngle={"side"} />
        <BuildWindow show={showBuildWindow[2]} componentsInCanvas={componentsInCanvasTop} viewingAngle={"top"} /> */}
      </div>
    </AuthContext.Provider>
  );
}
export default App;

var clone;
var clone2;
var dragging = [];
var resizing = [];
document.addEventListener('keydown', function (event) {
  // global event handler for retracing steps
  if ((event.key === 'Z' && event.ctrlKey && event.shiftKey) || (event.key === 'y' && event.ctrlKey)) {
    if (trace_forward.length != 0) {
      var lastIndex = trace_forward.length - 1;
      switch (trace_forward[lastIndex].action) {
        case 'Delete':
          var { viewingAngle, element, layer_element } = trace_forward[lastIndex];
          trace.push({
            action: 'Delete',
            viewingAngle: viewingAngle,
            element: element,
            layer_element: layer_element
          });
          trace_forward.splice(lastIndex, 1);
          element.remove();
          layer_element.remove();
          break;
        case 'Move':
          var { element, x, y } = trace_forward[lastIndex];
          trace.push({
            element: element,
            action: 'Move',
            x: (parseFloat(element.getAttribute('data-x')) || 0),
            y: (parseFloat(element.getAttribute('data-y')) || 0)
          })
          element.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          element.setAttribute('data-x', x)
          element.setAttribute('data-y', y)
          var removed_ele = trace_forward.splice(lastIndex, 1)[0]
          break;
        case 'Resize':
          var { element, x, y, width, height } = trace_forward[lastIndex];
          trace.push({
            action: 'Resize',
            element: element,
            x: (parseFloat(element.getAttribute('data-x')) || 0),
            y: (parseFloat(element.getAttribute('data-y')) || 0),
            width: element.style.width,
            height: element.style.height,
          });

          element.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          element.setAttribute('data-x', x)
          element.setAttribute('data-y', y)
          element.style.width = width;
          element.style.height = height;
          element.style.transform = 'translate(' + x + 'px,' + y + 'px)'
          var removed_ele = trace_forward.splice(lastIndex, 1)[0]
          break;
        case 'Paste':
          var { parentElement, element_clone, layer_element_clone, layer_window } = trace_forward[lastIndex];
          trace.push({
            action: 'Paste',
            parentElement: parentElement,
            element_clone: element_clone,
            layer_element_clone: layer_element_clone,
            layer_window: layer_window,
          });
          parentElement.appendChild(element_clone);
          layer_window.appendChild(layer_element_clone);
          var removed_ele = trace_forward.splice(lastIndex, 1)[0];
          break;

        case 'Create': //TODO 
          var { layer_element, element, viewingAngle, id } = trace_forward[lastIndex];
          var canvas = document.querySelector("#canvas_" + viewingAngle);
          var layer_window = document.querySelector("#layers_window_" + viewingAngle);
          // var children = children_list.filter((child => {
          //   child.id = id;
          // }));
          console.log(element);
          trace.push({
            action: 'Create',
            id: id,
            viewingAngle: viewingAngle,
          });
          canvas.appendChild(element);
          // layer_window.insertBefore(layer_element, layer_window.firstChild);
          layer_window.appendChild(layer_element);
          console.log(trace);
          var removed_ele = trace_forward.splice(lastIndex, 1)[0];
          break;
      }
    }
  }
  else if (event.key === 'z' && event.ctrlKey) {
    if (trace.length != 0) {
      var lastIndex = trace.length - 1;
      switch (trace[lastIndex].action) {
        case 'Delete':
          var { element, parentElement, layer_element, viewingAngle } = trace[lastIndex];
          var canvas = document.querySelector("#canvas_" + viewingAngle);
          var layers_window = document.querySelector("#layers_window_" + viewingAngle);
          canvas.appendChild(element);
          layers_window.appendChild(layer_element);
          trace_forward.push({
            action: 'Delete',
            viewingAngle: viewingAngle,
            element: element,
            layer_element: layer_element
          }
          );
          var removed_ele = trace.splice(lastIndex, 1)[0];
          break;
        case 'Move':
          var { element, x, y } = trace[lastIndex];
          trace_forward.push({
            element: element,
            action: 'Move',
            x: (parseFloat(element.getAttribute('data-x')) || 0),
            y: (parseFloat(element.getAttribute('data-y')) || 0)
          })
          element.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          element.setAttribute('data-x', x)
          element.setAttribute('data-y', y)
          var removed_ele = trace.splice(lastIndex, 1)[0]
          break;

        case 'Resize':
          var { element, x, y, width, height } = trace[lastIndex];
          trace_forward.push({
            action: 'Resize',
            element: element,
            x: (parseFloat(element.getAttribute('data-x')) || 0),
            y: (parseFloat(element.getAttribute('data-y')) || 0),
            width: element.style.width,
            height: element.style.height,
          });

          element.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          element.setAttribute('data-x', x)
          element.setAttribute('data-y', y)
          element.style.width = width;
          element.style.height = height;
          element.style.transform = 'translate(' + x + 'px,' + y + 'px)'
          var removed_ele = trace.splice(lastIndex, 1)[0]
          break;

        case 'Paste':
          var { parentElement, element_clone, layer_element_clone, layer_window } = trace[lastIndex];
          trace_forward.push({
            action: 'Paste',
            parentElement: parentElement,
            element_clone: element_clone,
            layer_element_clone: layer_element_clone,
            layer_window: layer_window,
          });
          element_clone.remove();
          layer_element_clone.remove();
          var removed_ele = trace.splice(lastIndex, 1)[0];
          break;
        case 'Create': //TODO
          var { id, viewingAngle } = trace[lastIndex];
          // console.log(document.querySelector("#"+componentsPropsEntry[0]+"_canvas"));
          // var element = document.querySelector('#resize_drag_element'+id);
          var element = document.querySelector("#canvas_" + viewingAngle).querySelector('#resize_drag_element_' + id);
          var layer_element = document.querySelector("#layers_window_" + viewingAngle).querySelector('#layer_' + id);
          // var children = children_list.filter((child => {
          //   child.id = id;
          // }));
          console.log(element);
          trace_forward.push({
            action: 'Create',
            id: id,
            element: element,
            layer_element: layer_element,
            viewingAngle: viewingAngle,

          });

          element.remove();
          layer_element.remove();
          var removed_ele = trace.splice(lastIndex, 1)[0];
          break;
      }
    }
  }

  var target = document.activeElement;
  // if (target.attributes.classname2 != null && target.attributes.classname2.value == "layer") {
  //   if (event.key == "ArrowUp" && event.ctrlKey) {
  //     console.log("ArrowUp");
  //     if (target.parentNode.children[0] != target) {
  //       target.parentNode.insertBefore(target, target.previousElementSibling);
  //       target.focus({ focusVisible: true });
  //     }
  //   }
  //   else if (event.key == "ArrowDown" && event.ctrlKey) {
  //     if (target.parentElement.lastChild != target) {
  //       console.log(target.parentElement.lastChild);
  //       target.parentNode.insertBefore(target, target.nextElementSibling.nextElementSibling);
  //       target.focus({ focusVisible: true });
  //     }
  //   }
  // }
  if (target.attributes.classname2 != null && target.attributes.classname2.value == "resize_drag_element") {
    event.preventDefault();

    // combine key control like copy and paste
    if (event.key === 'c' && event.ctrlKey) {
      clone = target.cloneNode(true);
    }
    else if (event.key === 'v' && event.ctrlKey) {
      if (clone != undefined) {
        var id = target.getAttribute('id').split('_').pop();
        var viewingAngle = target.parentElement.getAttribute('id').split('_').pop();
        var layer_element = document.querySelector("#layers_window_" + viewingAngle).querySelector('#layer_' + id);
        var layer_window = layer_element.parentElement;
        var layer_element_clone = layer_element.cloneNode(true);
        layer_element_clone.setAttribute('id', "layer_" + target.parentElement.children.length);
        layer_element_clone.setAttribute('tabindex', target.parentElement.children.length);
        layer_window.appendChild(layer_element_clone);
        clone2 = clone.cloneNode(true);
        clone2.setAttribute('id', "resize_drag_element_" + target.parentElement.children.length);
        clone2.setAttribute('tabindex', target.parentElement.children.length);
        clone2.style.zIndex = (target.parentElement.children.length);
        target.parentElement.appendChild(clone2);
        trace.push({
          action: 'Paste',
          parentElement: target.parentElement,
          element_clone: clone2,
          layer_element_clone: layer_element_clone,
          layer_window: layer_window,
        });
        trace_forward = [];
      }
    }
    else if (event.key === 'Delete') {

      var id = target.getAttribute('id').split('_').pop();
      var viewingAngle = target.parentElement.getAttribute('id').split('_').pop();
      var layer_element = document.querySelector("#layers_window_" + viewingAngle).querySelector('#layer_' + id);
      trace.push({
        action: 'Delete',
        viewingAngle: viewingAngle,
        element: target.cloneNode(true),
        layer_element: layer_element
      });
      trace_forward = [];
      target.remove()
      layer_element.remove()

    }

    else if (event.key == "ArrowUp" && event.ctrlKey) {
      var id = target.getAttribute('id').split('_').pop();
      var viewingAngle = target.parentElement.getAttribute('id').split('_').pop();
      var layer_element = document.querySelector("#layers_window_" + viewingAngle).querySelector('#layer_' + id);
      console.log("ArrowUp");
      if (target.parentElement.firstChild != target) {
        target.previousElementSibling.style.zIndex++;
        target.style.zIndex--;
        target.parentNode.insertBefore(target, target.previousElementSibling);
        target.focus({ focusVisible: true });
        layer_element.parentNode.insertBefore(layer_element, layer_element.previousElementSibling);

      }
    }

    else if (event.key == "ArrowDown" && event.ctrlKey) {
      var id = target.getAttribute('id').split('_').pop();
      var viewingAngle = target.parentElement.getAttribute('id').split('_').pop();
      var layer_element = document.querySelector("#layers_window_" + viewingAngle).querySelector('#layer_' + id);
      if (target.parentElement.lastChild != target) {
        console.log("ArrowDown");
        target.nextElementSibling.style.zIndex--;
        target.style.zIndex++;
        target.parentNode.insertBefore(target, target.nextElementSibling.nextElementSibling);
        target.focus({ focusVisible: true });
        layer_element.parentNode.insertBefore(layer_element, layer_element.nextElementSibling.nextElementSibling);
      }
    }
    // var id = target.getAttribute('id').split('_').pop();
    // var viewingAngle = target.parentElement.getAttribute('id').split('_').pop();
    // var layer_element = document.querySelector("#layers_window_" + viewingAngle).querySelector('#layer_' + id);
    // if (target.attributes.classname2 != null && target.attributes.classname2.value == "layer") {
    //   if (event.key == "ArrowUp" && event.ctrlKey) {
    //     console.log("ArrowUp");
    //     if (target.parentNode.children[0] != target) {
    //       layer_element.parentNode.insertBefore(layer_element, layer_element.previousElementSibling);
    //       layer_element.focus({ focusVisible: true });
    //     }
    //   }
    //   else if (event.key == "ArrowDown" && event.ctrlKey) {
    //     if (target.parentElement.lastChild != target) {
    //       console.log(target.parentElement.lastChild);
    //       layer_element.parentNode.insertBefore(layer_element, layer_element.nextElementSibling.nextElementSibling);
    //       layer_element.focus({ focusVisible: true });
    //     }
    //   }
    // }

    // else if (event.key == "ArrowUp" && event.ctrlKey) {
    //   var target = document.activeElement;
    //   if (target != null && target.attributes.classname2.value == "resize_drag_element") {
    //     if (target.parentElement.lastChild != target) {
    //       target.parentNode.insertBefore(target, target.nextElementSibling.nextElementSibling);
    //       target.focus({ focusVisible: true });
    //     }
    //   }
    // }
    // else if (event.key == "ArrowDown" && event.ctrlKey) {
    //   var target = document.activeElement;

    // if (target != null && (target.attributes.classname2.value == "resize_drag_element")) {
    //   var temp = target.style.zIndex
    //   // console.log(temp);
    //   // temp = target.style.zIndex++;
    //   // console.log(temp);
    //   console.log(target.parentElement.attributes.id.value.split("_").pop());
    //   if (target.style.zIndex != target.parentElement.children.length - 1) {
    //     // var viewingAngle = target.parentElement.attributes.id.value.split("_").pop();
    //     // var id = target.attributes.id.value.split("_").pop();
    //     // var layer = document.querySelector("#layers_window_" + viewingAngle).querySelector("#layer_" + id);
    //     // var layer_previous = layer.previousElementSibling;
    //     // var layer_previous_id = layer_previous.attributes.id.value.split("_").pop();
    //     // var element_previous_list = target.parentElement.children.filter(ele => ele.attributes.id.value.split("_").pop() == layer_previous_id);
    //     // console.log(element_previous_list[0]);

    //     // target.style.zIndex = layer_previous.style.zIndex;
    //     // layer_previous.style.zIndex = temp;
    //     // target.focus({ focusVisible: true });

    //     target.parentNode.insertBefore(target, target.nextElementSibling.nextElementSibling);
    //     target.focus({ focusVisible: true });
    //   }
    // }
    // }


    else {
      // signle key control like movement using arrow key and detele
      var dx = 0;
      var dy = 0;
      var step_size = 5;
      var save_trace = false;
      switch (event.key) {

        case 'ArrowLeft':

          dx = -step_size;
          save_trace = true;
          break;
        case 'ArrowRight':
          dx = step_size;
          save_trace = true;
          break;
        case 'ArrowUp':
          dy = -step_size;
          save_trace = true;
          break;
        case 'ArrowDown':
          dy = step_size;
          save_trace = true;
          break;
      }

      if (save_trace) {
        trace.push({
          action: 'Move',
          element: target,
          x: (parseFloat(target.getAttribute('data-x')) || 0),
          y: (parseFloat(target.getAttribute('data-y')) || 0)
        });
        trace_forward = [];
        save_trace = false;
      }
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + dx
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + dy
      // translate the element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    }
  }
})

interact('.resize_drag_element')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move(event) {
        var target = event.target

        if (!resizing.includes(target.id)) {
          resizing.push(target.id);
          trace.push({
            action: 'Resize',
            element: target,
            x: (parseFloat(target.getAttribute('data-x')) || 0),
            y: (parseFloat(target.getAttribute('data-y')) || 0),
            width: event.rect.width + 'px',
            height: event.rect.height + 'px'
          });
          trace_forward = [];
        }
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      },
      end(event) {
        resizing = resizing.filter((id) => {
          return id != event.target.id;
        });
        // var textEl = event.target.querySelector('p')
        // textEl && (textEl.textContent =
        //     'moved a distance of ' +
        //     (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
        //         Math.pow(event.pageY - event.y0, 2) | 0))
        //         .toFixed(2) + 'px')
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 60, height: 60 }
      })
    ],

    inertia: true
  })

interact('.resize_drag_element')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end(event) {
        dragging = dragging.filter((id) => {
          return id != event.target.id;
        });
        // var textEl = event.target.querySelector('p')
        // textEl && (textEl.textContent =
        //     'moved a distance of ' +
        //     (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
        //         Math.pow(event.pageY - event.y0, 2) | 0))
        //         .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener(event) {
  var target = event.target
  if (!dragging.includes(target.id)) {
    dragging.push(target.id);
    trace.push({
      action: 'Move',
      element: target,
      x: (parseFloat(target.getAttribute('data-x')) || 0),
      y: (parseFloat(target.getAttribute('data-y')) || 0)
    });
    trace_forward = [];
  }
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

}

function saveTrace(event) {
  var target = event.target
  trace.push({
    action: 'Move',
    element: target,
    x: (parseFloat(target.getAttribute('data-x')) || 0),
    y: (parseFloat(target.getAttribute('data-y')) || 0)
  });
  console.log(trace);
}

function saveTraceForward(event) {
  var target = event.target
  trace.push({
    action: 'Move',
    element: target,
    x: (parseFloat(target.getAttribute('data-x')) || 0),
    y: (parseFloat(target.getAttribute('data-y')) || 0)
  });
  console.log(trace);
}

// document.addEventListener('keydown', (event) => {
//   var target = document.activeElement;
//   if (target != null && (target.attributes.classname2.value == "resize_drag_element" || target.attributes.classname2.value == "layer")) {
//     if (event.key == "ArrowUp" && event.ctrlKey) {
//       if (target.parentNode.children[0] != target) {
//         target.parentNode.insertBefore(target, target.previousElementSibling);
//         target.focus({ focusVisible: true });
//       }
//     }
//     else if (event.key == "ArrowDown" && event.ctrlKey) {
//       target.parentNode.insertBefore(target, target.nextElementSibling.nextElementSibling);
//       target.focus({ focusVisible: true });
//     }
//   }
// })
