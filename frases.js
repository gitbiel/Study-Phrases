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
const phrasesList = document.querySelector("ul.phrases")

function createItem({ id, phrase, priority }) {
  const li = document.createElement('li')
  li.id = id
  li.classList.add('phrases_line')

  const divContainer = document.createElement('div')
  divContainer.classList.add("divContainer")
  li.append(divContainer)
  
  const prioridade = document.createElement('div')
  prioridade.classList.add('phrases_priority')
  li.append(prioridade)
  
  const paragraph = document.createElement('p')
  paragraph.innerHTML = phrase
  li.append(paragraph)
  
  divContainer.append(prioridade)
  divContainer.append(paragraph)
  
  const btn = document.createElement('button')
  btn.classList.add('ellipsis-button')
  btn.addEventListener('click', openSettings)

  const dot1 = document.createElement('span')
  const dot2 = document.createElement('span')
  const dot3 = document.createElement('span')
  dot1.classList.add("dots")
  dot2.classList.add("dots")
  dot3.classList.add("dots")
  btn.append(dot1)  
  btn.append(dot2)  
  btn.append(dot3)  

  li.append(btn)

  const modal = document.createElement('ul')
  modal.classList.add('modal')
  li.append(modal)

  function openSettings() {
    modal.classList.contains("is-visible")
    ? modal.classList.remove('is-visible')
    : modal.classList.add('is-visible')
  }

  const liDelete = document.createElement('li')
  const btnDeletePhrase = document.createElement('button')
  btnDeletePhrase.innerHTML = 'Excluir frase'
  btnDeletePhrase.classList.add('modal-button')
  liDelete.append(btnDeletePhrase)
  // liDelete.addEventListener('click', deletePhrase({
  //   phraseId: id
  // }))

  const liChangePriority = document.createElement('li')
  const btnChangePriority = document.createElement('button')
  btnChangePriority.innerHTML = 'Mudar prioridade'
  btnChangePriority.classList.add('modal-button')
  liChangePriority.append(btnChangePriority)

  const liEdit = document.createElement('li')
  const btnEdit = document.createElement('button')
  btnEdit.innerHTML = 'Editar'
  btnEdit.classList.add('modal-button')
  liEdit.append(btnEdit)

  modal.append(liDelete)
  modal.append(liChangePriority)
  modal.append(liEdit)

  return li
}


const deleteButtons = document.getElementsByClassName('modal-button');
console.log(deleteButtons)

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



