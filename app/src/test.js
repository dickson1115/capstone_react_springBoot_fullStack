// var trace = [];
// trace.push(1);
// console.log(trace);
// console.log(trace.includes(1));

document.addEventListener('keydown', (event) => {
    var target = document.activeElement;
    if (target != null && target.attributes.classname2.value == "layer") {
        if (event.key == "ArrowUp" && event.ctrlKey) {
            target.parentNode.insertBefore(target, target.previousElementSibling);
            target.focus({ focusVisible: true });
        }
        else if (event.key == "ArrowDown" && event.ctrlKey) {
            target.parentNode.insertBefore(target, target.nextElementSibling.nextElementSibling);
            target.focus({ focusVisible: true });
        }
    }
})
