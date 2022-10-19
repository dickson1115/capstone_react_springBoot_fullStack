
function dropDownFunction(element) {
  var string = element.value;
  console.log(string);
  console.log(1);
  document.getElementById("front").style.display = "none";
  document.getElementById("side").style.display = "none";
  document.getElementById("top").style.display = "none";
  document.getElementById(string).style.display = "flex";
  document.getElementById("front_big_view_container").style.display = "none";
  document.getElementById("side_big_view_container").style.display = "none";
  document.getElementById("top_big_view_container").style.display = "none";
  document.getElementById(string + "_big_view_container").style.display = "flex";
}

function clicked_component(element) {
  console.log(element.children[0].classList);
  element.children[0].classList.remove("jello-horizontal");
  void element.offsetWidth; // trigger reflow
  console.log(element.children[0].classList);
  element.children[0].classList.add("jello-horizontal");
  var name = element.children[1].innerText;
  var layer = document.createElement('div');
  layer.className = 'layer';
  layer.innerText = name;

  console.log(element.parentElement.getAttribute('id'));
  var string = element.parentElement.getAttribute('id');
  console.log(element.children[0].getAttribute('src'));
  var new_img = document.createElement('img');
  new_img.src = element.children[0].getAttribute('src');
  new_img.style.position = 'absolute';
  var view = document.getElementById(string + "_canvas");
  var max_width = view.offsetWidth;
  var layer_menu = document.getElementById(string + "_big_view_container").children[1];

  var draggable_container = document.createElement('div');
  draggable_container.className = 'draggable';
  draggable_container.appendChild(layer);

  layer_menu.appendChild(draggable_container);
  console.log(view);
  console.log(max_width);
  new_img.className = "resize_drag";
  console.log(view.children.length);
  new_img.tabIndex = view.children.length;
  new_img.style.zIndex = view.children.length;
  console.log(new_img.style.zIndex);
  new_img.style.maxWidth = max_width + "px";
  document.getElementById(string + "_canvas").insertBefore(new_img, document.getElementById(string + "_canvas").children[1]);
}

var copiedElement;
var copiedElement_width;
var copiedElement_height;
document.addEventListener('keydown', function (event) {
  if (event.key === "Delete") {
    if (document.activeElement.className == "resize_drag") {
      const element = document.activeElement.remove();
    }

  }
  else if (event.key === 'c' && event.ctrlKey) {
    if (document.activeElement.className == "resize_drag") {
      copiedElement = document.activeElement.getAttribute('src');
      copiedElement_width = document.activeElement.offsetWidth;
      copiedElement_height = document.activeElement.offsetHeight;
    }
  }
  else if (event.key === 'v' && event.ctrlKey) {
    if (document.activeElement.className == "resize_drag") {
      var parentElement = document.activeElement.parentElement;
      var new_img = document.createElement('img');
      new_img.src = document.activeElement.getAttribute('src');
      console.log(copiedElement_width);
      new_img.className = "resize_drag";
      var view = parentElement;
      new_img.style.width = copiedElement_width + "px";
      new_img.style.height = copiedElement_height + "px";
      new_img.tabIndex = view.children.length;
      console.log(new_img);
      view.insertBefore(new_img, view.children[0]);
    }
  }
});
