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


async function filter(phraseId) {
  // valdar se os dados estao aqui antes de enviar para a api
  // const inputChecked = document.querySelector('input[name="prioridade"]:checked')
  // const inputPhrase = document.getElementById('pesquisar')
    try {
    
    await listPhrases({
      phrase: phraseId
    })
    // inputPhrase.value = ''
    
    // inputChecked.checked = false

  } catch (error) {
    console.log('error', error)
  }
}

function createItem({ id, phrase, priority }) {
  const li = document.createElement('li')
  li.id = id
  li.classList.add('phrases_line')

  const divContainer = document.createElement('div')
  divContainer.classList.add("divContainer")
  li.append(divContainer)
  
  const prioridade = document.createElement('div')
  prioridade.classList.add('phrases_priority')
  if(priority === 'low') {
   prioridade.classList.add('priorityLow') 
  } if(priority === 'medium') {
    prioridade.classList.add('priorityMedium') 
   } if(priority === 'high') {
    prioridade.classList.add('priorityHigh') 
   }
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

  document.addEventListener('click', function(event) {
    const isInsideModal = modal.contains(event.target);
    const isButton = event.target === btn;
  
    if (!isInsideModal && !isButton) {
      modal.classList.remove('is-visible');
    }
  });

  const liDelete = document.createElement('li')
  const btnDeletePhrase = document.createElement('button')
  btnDeletePhrase.innerHTML = 'Excluir frase'
  btnDeletePhrase.classList.add('modal-button')
  liDelete.append(btnDeletePhrase)
  liDelete.addEventListener('click', () => createModalDelete(id))

  const liEdit = document.createElement('li')
  const btnEdit = document.createElement('button')
  btnEdit.innerHTML = 'Editar'
  btnEdit.classList.add('modal-button')
  liEdit.append(btnEdit)
  liEdit.addEventListener('click', () => createModal(phrase, id, priority))

  modal.append(liDelete)
  modal.append(liEdit)

  return li
}

const modalOverlayDelete = document.createElement('div');
modalOverlayDelete.classList.add('modal-overlay');

function createModalDelete(phraseId) {
  swal({
    title: "Você tem certeza ?",
    text: "Uma vez excluído, você não poderá recuperar este arquivo !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Sua frase foi deletada!", {
        icon: "success",
      });
    } else {
      swal("Sua frase não foi apagada :)");
    }
  });

  const textModalDelete = document.getElementsByClassName("swal-text")[0]
  textModalDelete.style.textAlign = "center"
  console.log(textModalDelete)

  const deleteButton = document.getElementsByClassName("swal-button swal-button--confirm swal-button--danger")[0];
  deleteButton.addEventListener('click', () => deletePhrase({
      phraseId: phraseId
    }))  
}

const modalOverlayEdit = document.createElement('div');
modalOverlayEdit.classList.add('modal-overlay');

function createModal(phrase, phraseId, priority) {  
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');  
  modalContent.id = 'modalContent'

  const DivCloseModal = document.createElement('div')
  DivCloseModal.classList.add('closeModal')
  DivCloseModal.innerHTML = 'X'
  DivCloseModal.addEventListener('click',() => closeModal())
  modalContent.append(DivCloseModal)

  const title = document.createElement('h1');
  title.textContent = 'Editar Frase';
  modalContent.appendChild(title);

  const input = document.createElement('input');
  input.classList.add('modalInput');
  input.id = 'inputText'
  input.value = phrase;
  input.placeholder = 'Edite a frase'
  modalContent.appendChild(input);

  const label = document.createElement('label')
  label.innerHTML = 'Prioridade'
  modalContent.append(label)
  
  const containerRadio = document.createElement('div');
  containerRadio.classList.add('containerRadio')
  modalContent.append(containerRadio)

  const inputLow = document.createElement('input')
  inputLow.type = 'radio'
  inputLow.name = 'prioridade'
  inputLow.value = 'low'
  containerRadio.append(inputLow)
 
  const labelLow = document.createElement('label')
  labelLow.innerHTML = 'Baixa'
  containerRadio.append(labelLow)

  const inputMedium = document.createElement('input')
  inputMedium.type = 'radio'
  inputMedium.name = 'prioridade'
  inputMedium.value = 'medium'
  containerRadio.append(inputMedium)
  
  const labelMedium = document.createElement('label')
  labelMedium.innerHTML = 'Média'
  containerRadio.append(labelMedium)

  const inputHigh = document.createElement('input')
  inputHigh.type = 'radio'
  inputHigh.name = 'prioridade'
  inputHigh.value = 'high'
  containerRadio.append(inputHigh)

  const labelHigh = document.createElement('label')
  labelHigh.innerHTML = 'Alta'
  containerRadio.append(labelHigh)

  const btnEdit = document.createElement('button')
  btnEdit.innerHTML = 'Editar'
  btnEdit.classList.add('btnModal')
  btnEdit.addEventListener('click', () => editar(input, phraseId))
  btnEdit.addEventListener('click', () => closeModal())
  modalContent.append(btnEdit)

  modalOverlayEdit.appendChild(modalContent);
  document.body.appendChild(modalOverlayEdit);

  if (priority === 'low') {
    inputLow.checked = true;
  } else if (priority === 'medium') {
    inputMedium.checked = true;
  } else if (priority === 'high') {
    inputHigh.checked = true;
  }
}

function closeModal() {  
  const modalContent = document.getElementById('modalContent');

  while (modalContent.firstChild) {
    modalContent.firstChild.remove();
  }

  modalOverlayEdit.remove();
  modalContent.remove();
}


function closeModalDelete() {
  modalOverlayDelete.style.display = "none"
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

async function editar(phrase, phraseId) {
  const inputChecked = document.querySelector('input[name="prioridade"]:checked')
  try {
    window.location.href = window.location.href;
    
    await editPhrase({
      phrase: phrase.value,
      priority: inputChecked.value,
      phraseId
    })
    

  } catch (error) {
    console.log('error', error)
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

function closeFilter() {
  pesquisar.style.display = "none";
  priority.style.display = "none";
  containerInputs.style.display = "none";
  btnAplicar.style.display = "none";
  containerLupa.style.display = "none";
  purpleFilter.style.display = "none"
  whiteFilter.style.display = "flex";
}

const hamburgerMenu = document.querySelector('.hamburger-menu');
const overlay = document.querySelector('.overlay');

hamburgerMenu.addEventListener('click', function() {
  hamburgerMenu.classList.toggle('open');
  overlay.classList.toggle('open');
});

const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', function() {
  hamburgerMenu.classList.remove('open');
  overlay.classList.remove('open');
});
