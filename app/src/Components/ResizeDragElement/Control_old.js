import interact from 'interactjs'
// import { useContext } from 'react';
// import AuthContext from '../../AuthContext/AuthContext'
// var {trace, trace_forward} = useContext(AuthContext);
var trace = [];
var trace_forward = [];
var clone;
var clone2;
var id = 1;
var dragging = [];
var resizing = [];
document.addEventListener('keydown', function (event) {
    // global event handler for retracing steps
    if ((event.key === 'Z' && event.ctrlKey && event.shiftKey) || (event.key === 'y' && event.ctrlKey)) {
        if (trace_forward.length != 0) {
            var lastIndex = trace_forward.length - 1;
            switch (trace_forward[lastIndex].action) {
                case 'Delete':
                    var { parentElement, element } = trace_forward[lastIndex];
                    trace.push({
                        action: 'Delete',
                        parentElement: parentElement,
                        element: element.cloneNode(true)
                    });
                    trace_forward.splice(lastIndex, 1);
                    element.remove()
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
                    var { parentElement, element } = trace_forward[lastIndex];
                    trace.push({
                        action: 'Paste',
                        parentElement: parentElement,
                        element: element
                    });
                    parentElement.appendChild(element);
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
                    trace[lastIndex].parentElement.appendChild(trace[lastIndex].element);
                    trace_forward.push(trace.splice(lastIndex, 1)[0]);
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
                    var { parentElement, element } = trace[lastIndex];
                    trace_forward.push({
                        action: 'Paste',
                        parentElement: parentElement,
                        element: element
                    });
                    element.remove();
                    var removed_ele = trace.splice(lastIndex, 1)[0];
                    break;
            }
        }
    }



    var target = document.activeElement;
    if (target.attributes.classname2.value == "resize_drag_element") {
        event.preventDefault();

        // combine key control like copy and paste
        if (event.key === 'c' && event.ctrlKey) {
            clone = target.cloneNode(true);
        }
        else if (event.key === 'v' && event.ctrlKey) {
            console.log(1233);
            if (clone != undefined) {
                console.log(123);
                console.log(clone);
                clone2 = clone.cloneNode(true);
                clone2.setAttribute('id', id++);
                target.parentElement.appendChild(clone2);
                trace.push({
                    action: 'Paste',
                    parentElement: target.parentElement,
                    element: clone2
                });
                trace_forward = [];
            }
        }
        else if (event.key === 'Delete') {
            trace.push({
                action: 'Delete',
                parentElement: target.parentElement,
                element: target.cloneNode(true)
            });
            trace_forward = [];
            target.remove()

        }

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
})

// import interact from 'interactjs'

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

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener