const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");

let isOpen = false

function openModal() {
  isOpen === false ? isOpen = true: isOpen = false;
  if(isOpen === true) {
    nav.style.display = "flex";
    menu.style.display = "none";
    closeMenu.style.display = "block"
  }
}

function closeModal() {
  isOpen === false ? isOpen = true: isOpen = false;
  if(isOpen === false) {
    nav.style.display = "none";
    menu.style.display = "block";
    closeMenu.style.display = "none"
  }
}