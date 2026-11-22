const btnUsuario = document.getElementById("btnUsuario");
const btnVoluntario = document.getElementById("btnVoluntario");
const btnLogin = document.getElementById("btn-login");
const btnCadastro = document.getElementById("btn-cadastro");
const toggleTipo = document.getElementById("toggle-tipo-usuario");

const btnSubmit = document.getElementById("btn-submit");
const textSocialMedia = document.getElementById("text-social-media");

const boxNome = document.getElementById("box-nome");
const inputNome = document.getElementById("nome");

const boxCrp = document.getElementById("box-crp");
const inputCrp = document.getElementById("crp");

const boxDadosCadastro = document.getElementById("box-dados-cadastro");
const inputsDadosCadastro = boxDadosCadastro.querySelectorAll("input, select");

const boxTermos = document.getElementById("box-termos");
const inputTermos = document.getElementById("termos");

const btnPasswordVisible = document.getElementById("btn-password-visible");
const inputPassword = document.getElementById("senha");
const iconPasswordVisible = document.getElementById("icon-password-visible");
const boxConfirmarSenha = document.getElementById("box-confirmar-senha");
const inputConfirmarSenha = document.getElementById("confirmar-senha");
const inputDataNascimento = document.getElementById("data-nascimento");
const mainForm = document.getElementById("mainForm");

let modoAtual = "cadastro"; 
let tipoAtual = "usuario"; 

function atualizarFormulario() {
    if (modoAtual === "login") {
        toggleTipo.style.display = "none";
        btnSubmit.textContent = "Entrar na Minha Conta";
        textSocialMedia.textContent = "OU FAÇA LOGIN COM";

        boxNome.style.display = "none";
        inputNome.required = false;

        boxDadosCadastro.style.display = "none";
        inputsDadosCadastro.forEach((input) => input.required = false);

        boxCrp.style.display = "none";
        inputCrp.required = false;

        boxTermos.style.display = "none";
        boxTermos.classList.remove("d-flex");
        inputTermos.required = false;
        boxConfirmarSenha.style.display = "none";
        inputConfirmarSenha.required = false;

    } else {
        toggleTipo.style.display = "block";
        btnSubmit.textContent = "Criar Minha Conta Gratuita";
        textSocialMedia.textContent = "OU CADASTRE-SE COM";

        boxNome.style.display = "block";
        inputNome.required = true;

        boxDadosCadastro.style.display = "block";
        inputsDadosCadastro.forEach((input) => {
            if (["valor", "data", "cpf", "cnpj", "cep", "telefone", "rg", "data-nascimento", "estado", "cidade"].includes(input.id)) {
                input.required = true;
            }
        });

        boxTermos.style.display = "block";
        boxTermos.classList.add("d-flex"); 
        inputTermos.required = true;
        boxConfirmarSenha.style.display = "block";
        inputConfirmarSenha.required = true;

        if (tipoAtual === "voluntario") {
            boxCrp.style.display = "block";
            inputCrp.required = true;
        } else {
            boxCrp.style.display = "none";
            inputCrp.required = false;
        }
    }
}

btnVoluntario.addEventListener("click", () => {
    tipoAtual = "voluntario";
    btnVoluntario.classList.add("active");
    btnVoluntario.classList.remove("text-muted");
    btnUsuario.classList.remove("active");
    atualizarFormulario();
});

btnUsuario.addEventListener("click", () => {
    tipoAtual = "usuario";
    btnUsuario.classList.add("active");
    btnVoluntario.classList.remove("active");
    btnVoluntario.classList.add("text-muted");
    atualizarFormulario();
});

btnLogin.addEventListener("click", () => {
    modoAtual = "login";
    btnLogin.classList.add("active");
    btnCadastro.classList.remove("active");
    atualizarFormulario();
});

btnCadastro.addEventListener("click", () => {
    modoAtual = "cadastro";
    btnCadastro.classList.add("active");
    btnLogin.classList.remove("active");
    atualizarFormulario();
});

btnPasswordVisible.addEventListener("click", () => {
    if (inputPassword.type === "password") {
        iconPasswordVisible.classList.remove("bi-eye-slash");
        iconPasswordVisible.classList.add("bi-eye");

        inputPassword.type = "text";
    } else {
        iconPasswordVisible.classList.add("bi-eye-slash");
        iconPasswordVisible.classList.remove("bi-eye");

        inputPassword.type = "password";
    }
});

function validarSenhas() {
    if (modoAtual === "cadastro" && inputConfirmarSenha.value !== inputPassword.value) {
        inputConfirmarSenha.setCustomValidity("As senhas informadas não coincidem.");
    } else {
        inputConfirmarSenha.setCustomValidity("");
    }
}

inputPassword.addEventListener("input", validarSenhas);
inputConfirmarSenha.addEventListener("input", validarSenhas);

mainForm.addEventListener("submit", (event) => {
    validarSenhas();
    if (!mainForm.checkValidity()) {
        event.preventDefault();
        mainForm.reportValidity();
    }
});

const hoje = new Date();
const maxDataNascimento = hoje.toISOString().split("T")[0];
inputDataNascimento.max = maxDataNascimento;

atualizarFormulario();