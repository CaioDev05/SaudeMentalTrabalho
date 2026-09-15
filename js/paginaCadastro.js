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

const boxTermos = document.getElementById("box-termos");
const inputTermos = document.getElementById("termos");

const btnPasswordVisible = document.getElementById("btn-password-visible");
const inputPassword = document.getElementById("senha");
const iconPasswordVisible = document.getElementById("icon-password-visible");

let modoAtual = "cadastro"; 
let tipoAtual = "usuario"; 

function atualizarFormulario() {
    if (modoAtual === "login") {
        toggleTipo.style.display = "none";
        btnSubmit.textContent = "Entrar na Minha Conta";
        textSocialMedia.textContent = "OU FAÇA LOGIN COM";

        boxNome.style.display = "none";
        inputNome.required = false;

        boxCrp.style.display = "none";
        inputCrp.required = false;

        boxTermos.style.display = "none";
        boxTermos.classList.remove("d-flex"); // Evita conflitos de layout flex
        inputTermos.required = false;

    } else {
        toggleTipo.style.display = "block";
        btnSubmit.textContent = "Criar Minha Conta Gratuita";
        textSocialMedia.textContent = "OU CADASTRE-SE COM";

        // Nome e Termos sempre aparecem no cadastro
        boxNome.style.display = "block";
        inputNome.required = true;

        boxTermos.style.display = "block";
        boxTermos.classList.add("d-flex"); 
        inputTermos.required = true;

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

atualizarFormulario();