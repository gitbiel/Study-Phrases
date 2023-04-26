const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const x = document.getElementById("x");

let isOpen = false

function openModal() {
  isOpen === false ? isOpen = true: isOpen = false;
  if(isOpen === true) {
    nav.style.display = "flex";
    menu.style.display = "none";
    x.style.display = "block";
  }
}

function closeModal() {
  isOpen === false ? isOpen = true: isOpen = false;
  if(isOpen === false) {
    nav.style.display = "none";
    menu.style.display = "block";
    x.style.display = "none";
  }
}