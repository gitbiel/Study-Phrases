const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");

const form = document.getElementById("form")
const textarea = document.getElementById("textarea");
const radios = document.getElementsByName("prioridade");
const criarButton = document.getElementById("btnCriar")

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Adiciona um evento de input ao textarea
textarea.addEventListener("input", validarFormulario);

// Adiciona um evento de click a cada input radio
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("click", validarFormulario);
}

// Função de validação do formulário
function validarFormulario() {
  const textareaValue = textarea.value.trim();
  let radioChecked = false;

  // Verifica se o textarea tem texto
  // e se pelo menos um input radio foi selecionado
  if (textareaValue !== "") {
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        radioChecked = true;
        break;
      }
    }
  }

  // Habilita ou desabilita o botão "Criar" com base na validação
  criarButton.disabled = !(textareaValue && radioChecked);
}

// Função para manipular o clique do botão "Criar"
async function limparFormulario() {
  // Limpa o textarea
  textarea.value = "";

  // Desmarca todos os inputs radio
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }

  // Desabilita o botão "Criar" novamente
  criarButton.disabled = true;
}

async function pegarDados() {
  // valdar se os dados estao aqui antes de enviar para a api
  const inputChecked = document.querySelector('input[name="prioridade"]:checked')
  try {
    
    await createPhrase({
      phrase: textarea.value,
      priority: document.querySelector('input[name="prioridade"]:checked').value
    })
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