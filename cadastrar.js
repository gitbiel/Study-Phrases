const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");

const form = document.getElementById("form")
const btnCriar = document.getElementById("btnCriar")

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

async function pegarDados() {
  // valdar se os dados estao aqui antes de enviar para a api
  const inputChecked = document.querySelector('input[name="prioridade"]:checked')
  const textarea = document.getElementById("textarea")
  try {
    if (!inputChecked || !textarea.value) {
      // error
      alert('erro maroto')
    }
    
    await createPhrase({
      phrase: textarea.value,
      priority: document.querySelector('input[name="prioridade"]:checked').value
    })
    console.log('============')

    textarea.value = ''
    inputChecked.checked = false


  } catch (error) {
    console.log('error', error)
  }
}



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

btnCriar.addEventListener("click", function () {
  disableButton();
});

function enableButton() {
  btnCriar.disabled = false;
  btnCriar.style.cursor = "pointer";
}

function disableButton() {
  btnCriar.disabled = true;
  btnCriar.style.cursor = "not-allowed";
}

(function textAreaValidate() {
  textarea.addEventListener("keyup", function (event) {
    if (textarea.value === "") {
      disableButton();  
    } else {
      enableButton();
    }
  });
})();

textarea.addEventListener("input", () => {
  textarea.value = textarea.value
    ? textarea.value.trimStart()
    : "";
});
