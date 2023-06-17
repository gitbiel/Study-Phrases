const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");
const pesquisar = document.getElementById("pesquisar");
const priority = document.getElementById("priority");
const containerInputs = document.getElementById("container-inputs");
const btnAplicar = document.getElementById("btnAplicar");
const containerLupa = document.getElementById("container-lupa");
const whiteFilter = document.getElementById("whiteFilter");
const purpleFilter = document.getElementById("purpleFilter");
const phrasesLine = document.getElementById("1")
const phrasesList = document.querySelector("ul.phrases")

function createItem({ id, phrase, priority }) {
  const li = document.createElement('li')
  li.id = id
  li.innerHTML = phrase
  li.classList.add('phrases_line')

  return li
}

async function getPhrases() {
 try {
  const phrases = await listPhrases()
  if(phrases.length > 0) {
    phrases.forEach(item => {
      const { id, phrase, priority } = item
      const li = createItem({ id, phrase, priority })
      phrasesList.append(li)
    })
  }
 } catch (error) {
  
 }
}
getPhrases()

const frasesCadastradas = {
  totalItems: 6,
  items: [
    { priority: 0, phrase: 'I have a dog.', id: 'uuid1' },
    { priority: 1, phrase: 'My brother is very strong..', id: 'uuid2' },
    { priority: 2, phrase: 'My father is about 5 months without work.', id: 'uuid3' },
    { priority: 0, phrase: 'My favorty color is black.', id: 'uuid4' },
    { priority: 1, phrase: 'I have to study every day.', id: 'uuid5' },
    { priority: 2, phrase: 'I have a cat.', id: 'uuid1', id: 'uuid6 ' },
  ],
}

let isOpen = false

function openModal() {
  isOpen === false ? isOpen = true: isOpen = false;
  if(isOpen === true) {
    nav.style.display = "flex";
    menu.style.display = "none";
    closeMenu.style.display = "block";
  }
}

function closeModal() {
  isOpen === false ? isOpen = true: isOpen = false;
  if(isOpen === false) {
    nav.style.display = "none";
    menu.style.display = "block";
    closeMenu.style.display = "none";
  }
}

function openFilter() {
  pesquisar.style.display = "flex";
  priority.style.display = "flex";
  containerInputs.style.display = "block";
  btnAplicar.style.display = "block";
  containerLupa.style.display = "flex";
  whiteFilter.style.display = "none";
  purpleFilter.style.display = "flex";
}

function closedFilter() {
  pesquisar.style.display = "none";
  priority.style.display = "none";
  containerInputs.style.display = "none";
  btnAplicar.style.display = "none";
  containerLupa.style.display = "none";
  purpleFilter.style.display = "none"
  whiteFilter.style.display = "flex";
}


function openSettings(e) {
  phrasesLine.classList.contains("is-visible")
  ? phrasesLine.classList.remove('is-visible')
	: phrasesLine.classList.add('is-visible')
}

const btn = document.getElementById("btn")
btn.addEventListener("click", openSettings)