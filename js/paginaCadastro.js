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
const btnConfirmarSenhaVisible = document.getElementById("btn-confirmar-senha-visible");
const iconConfirmarSenhaVisible = document.getElementById("icon-confirmar-senha-visible");
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
            if (["valor", "data", "cpf", "cnpj", "cep", "telefone", "idade", "rg", "estado-civil", "data-nascimento", "estado", "cidade", "site-pessoal"].includes(input.id)) {
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
        btnPasswordVisible.setAttribute("aria-label", "Ocultar senha");
        btnPasswordVisible.setAttribute("title", "Ocultar senha");
    } else {
        iconPasswordVisible.classList.add("bi-eye-slash");
        iconPasswordVisible.classList.remove("bi-eye");

        inputPassword.type = "password";
        btnPasswordVisible.setAttribute("aria-label", "Mostrar senha");
        btnPasswordVisible.setAttribute("title", "Mostrar senha");
    }
});

btnConfirmarSenhaVisible.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

btnConfirmarSenhaVisible.addEventListener("click", (event) => {
    event.preventDefault();

    if (inputConfirmarSenha.type === "password") {
        iconConfirmarSenhaVisible.classList.remove("bi-eye-slash");
        iconConfirmarSenhaVisible.classList.add("bi-eye");

        inputConfirmarSenha.setAttribute("type", "text");
        btnConfirmarSenhaVisible.setAttribute("aria-label", "Ocultar confirmação de senha");
        btnConfirmarSenhaVisible.setAttribute("title", "Ocultar confirmação de senha");
    } else {
        iconConfirmarSenhaVisible.classList.add("bi-eye-slash");
        iconConfirmarSenhaVisible.classList.remove("bi-eye");

        inputConfirmarSenha.setAttribute("type", "password");
        btnConfirmarSenhaVisible.setAttribute("aria-label", "Mostrar confirmação de senha");
        btnConfirmarSenhaVisible.setAttribute("title", "Mostrar confirmação de senha");
    }
});

function validarSenhas() {
    let valida = true;
    let mensagem = "";

    if (modoAtual === "login") {
        valida = true;
    } else if (inputPassword.value === "" || inputConfirmarSenha.value === "") {
        valida = false;
        mensagem = "Preencha a senha e a confirmação.";
    } else if (inputPassword.value.length > 30) {
        valida = false;
        mensagem = "A senha deve ter no máximo 30 caracteres.";
    } else if (inputConfirmarSenha.value.length > 30) {
        valida = false;
        mensagem = "A confirmação deve ter no máximo 30 caracteres.";
    } else if (inputConfirmarSenha.value !== inputPassword.value) {
        valida = false;
        mensagem = "As senhas informadas não coincidem.";
    }

    marcarCampo(inputPassword, modoAtual === "login" || inputPassword.value.length <= 30, "A senha deve ter no máximo 30 caracteres.");
    marcarCampo(inputConfirmarSenha, valida, mensagem);
}

inputPassword.addEventListener("input", validarSenhas);
inputConfirmarSenha.addEventListener("input", validarSenhas);

const inputData = document.getElementById("data");

function mascararValor(input) {
    let numeros = input.value.replace(/\D/g, "");
    numeros = numeros === "" ? "0" : numeros;
    const valor = (Number(numeros) / 100).toFixed(2);
    const partes = valor.split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    input.value = "R$ " + partes[0] + "," + partes[1];
}

function mascararData(input) {
    let numeros = input.value.replace(/\D/g, "").slice(0, 8);
    let resultado = numeros;

    if (numeros.length > 2) {
        resultado = numeros.slice(0, 2) + "/" + numeros.slice(2);
    }
    if (numeros.length > 4) {
        resultado = numeros.slice(0, 2) + "/" + numeros.slice(2, 4) + "/" + numeros.slice(4);
    }

    input.value = resultado;
}

function mascararDocumento(input, mascara) {
    const numeros = input.value.replace(/\D/g, "");
    let posicao = 0;
    let resultado = "";
    for (let i = 0; i < mascara.length && posicao < numeros.length; i += 1) {
        if (mascara[i] === "0") {
            resultado += numeros[posicao];
            posicao += 1;
        } else {
            resultado += mascara[i];
        }
    }
    input.value = resultado;
}

function mascararCpf(input) {
    mascararDocumento(input, "000.000.000-00");
}

function mascararCnpj(input) {
    mascararDocumento(input, "00.000.000/0000-00");
}

function mascararCep(input) {
    mascararDocumento(input, "00000-000");
}

function mascararTelefone(input) {
    const numeros = input.value.replace(/\D/g, "").slice(0, 11);
    let resultado = numeros;

    if (numeros.length === 1) {
        resultado = "(" + numeros;
    }
    if (numeros.length === 2) {
        resultado = "(" + numeros + ")";
    }
    if (numeros.length > 2 && numeros.length <= 6) {
        resultado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2);
    }
    if (numeros.length > 6 && numeros.length <= 10) {
        const meio = numeros.length === 10 ? 6 : 5;
        resultado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, meio) + "-" + numeros.slice(meio);
    }
    if (numeros.length === 11) {
        resultado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 7) + "-" + numeros.slice(7);
    }

    input.value = resultado;
}

function mascararRg(input) {
    let numeros = input.value.toUpperCase().replace(/[^0-9X]/g, "").slice(0, 9);
    let resultado = numeros;
    if (numeros.length > 2) {
        resultado = numeros.slice(0, 2) + "." + numeros.slice(2);
    }
    if (numeros.length > 5) {
        resultado = numeros.slice(0, 2) + "." + numeros.slice(2, 5) + "." + numeros.slice(5);
    }
    if (numeros.length > 8) {
        resultado = numeros.slice(0, 2) + "." + numeros.slice(2, 5) + "." + numeros.slice(5, 8) + "-" + numeros.slice(8);
    }
    input.value = resultado;
}

function mascararCrp(input) {
    let numeros = input.value.replace(/\D/g, "").slice(0, 8);
    let resultado = "CRP ";

    if (numeros.length > 2) {
        resultado += numeros.slice(0, 2) + "/" + numeros.slice(2);
    } else {
        resultado += numeros;
    }
    input.value = resultado;
}

document.getElementById("valor").addEventListener("input", (event) => mascararValor(event.target));
inputData.addEventListener("input", (event) => mascararData(event.target));
inputDataNascimento.addEventListener("input", (event) => mascararData(event.target));
document.getElementById("cpf").addEventListener("input", (event) => mascararCpf(event.target));
document.getElementById("cnpj").addEventListener("input", (event) => mascararCnpj(event.target));
document.getElementById("cep").addEventListener("input", (event) => mascararCep(event.target));
document.getElementById("telefone").addEventListener("input", (event) => mascararTelefone(event.target));
document.getElementById("rg").addEventListener("input", (event) => mascararRg(event.target));
inputCrp.addEventListener("input", (event) => mascararCrp(event.target));

function adicionarFeedback(input, mensagemPadrao) {
    let pai = input.parentElement;
    if (input.id === "senha" || input.id === "confirmar-senha") {
        pai = input.closest(".mb-4");
    }
    let feedback = pai.querySelector(".invalid-feedback");

    if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        pai.appendChild(feedback);
    }

    feedback.textContent = mensagemPadrao;
    feedback.style.display = "block";
}

function marcarCampo(input, valido, mensagem) {
    input.setCustomValidity(valido ? "" : mensagem);

    if (valido) {
        input.classList.remove("is-invalid");
        const paiValido = input.closest(".mb-3, .mb-4");
        if (paiValido) {
            paiValido.classList.remove("campo-invalido");
            const feedbackValido = paiValido.querySelector(".invalid-feedback");
            if (feedbackValido) {
                feedbackValido.style.display = "none";
            }
        }
    } else {
        input.classList.add("is-invalid");
        adicionarFeedback(input, mensagem);
        const paiInvalido = input.closest(".mb-3, .mb-4");
        if (paiInvalido) {
            paiInvalido.classList.add("campo-invalido");
        }
    }
}

function validarCpf(input) {
    const cpf = input.value.replace(/\D/g, "");
    let valido = cpf.length === 11;

    if (valido) {
        const digitosIguais = cpf.split("").every((digito) => digito === cpf[0]);
        valido = !digitosIguais;
    }

    if (valido) {
        let soma = 0;
        for (let i = 0; i < 9; i += 1) {
            soma += Number(cpf[i]) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10) {
            resto = 0;
        }
        valido = resto === Number(cpf[9]);
    }

    if (valido) {
        let soma = 0;
        for (let i = 0; i < 10; i += 1) {
            soma += Number(cpf[i]) * (11 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10) {
            resto = 0;
        }
        valido = resto === Number(cpf[10]);
    }

    marcarCampo(input, valido, "Informe um CPF válido.");
}

function validarCnpj(input) {
    const cnpj = input.value.replace(/\D/g, "");
    let valido = cnpj.length === 14;

    if (valido) {
        const digitosIguais = cnpj.split("").every((digito) => digito === cnpj[0]);
        valido = !digitosIguais;
    }

    if (valido) {
        const pesosPrimeiro = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        for (let i = 0; i < 12; i += 1) {
            soma += Number(cnpj[i]) * pesosPrimeiro[i];
        }
        let resto = soma % 11;
        let digito = resto < 2 ? 0 : 11 - resto;
        valido = digito === Number(cnpj[12]);
    }

    if (valido) {
        const pesosSegundo = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        for (let i = 0; i < 13; i += 1) {
            soma += Number(cnpj[i]) * pesosSegundo[i];
        }
        let resto = soma % 11;
        let digito = resto < 2 ? 0 : 11 - resto;
        valido = digito === Number(cnpj[13]);
    }

    marcarCampo(input, valido, "Informe um CNPJ válido.");
}

function validarCrp(input) {
    const formatoCrp = /^CRP [0-9]{2}\/[0-9]{5,6}$/;
    const tamanhoValido = input.value.length >= 12 && input.value.length <= 13;
    marcarCampo(input, tamanhoValido && formatoCrp.test(input.value), "Informe o CRP no formato CRP XX/YYYYY ou CRP XX/YYYYYY.");
}

function validarSite(input) {
    let valido = true;

    if (input.value.trim() !== "") {
        const dominio = input.value.trim();
        const possuiProtocolo = /^https?:\/\//i.test(dominio);
        const endereco = possuiProtocolo ? dominio : "https://" + dominio;
        const formatoDominio = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
        valido = formatoDominio.test(dominio) && endereco.length <= 100;

        try {
            const url = new URL(endereco);
            valido = valido && Boolean(url.hostname);
        } catch (erro) {
            valido = false;
        }
    }

    if (input.value.trim() === "" && input.required) {
        valido = false;
    }

    marcarCampo(input, valido, "Informe um site válido, como oi.com.br.");
}

function validarDataIso(input, mensagem) {
    let valida = true;
    const formatoValido = /^\d{2}\/\d{2}\/\d{4}$/.test(input.value);
    let dataIso = "";
    const dataHoje = new Date();
    const hojeIso = dataHoje.getFullYear() + "-" +
        String(dataHoje.getMonth() + 1).padStart(2, "0") + "-" +
        String(dataHoje.getDate()).padStart(2, "0");

    if (input.value !== "") {
        const partes = input.value.split("/");
        dataIso = partes[2] + "-" + partes[1] + "-" + partes[0];
        const dataInformada = new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
        const dataExiste = dataInformada.getFullYear() === Number(partes[2]) &&
            dataInformada.getMonth() === Number(partes[1]) - 1 &&
            dataInformada.getDate() === Number(partes[0]);
        valida = formatoValido && dataExiste && dataIso >= "0001-01-01" && dataIso <= hojeIso;
    }

    marcarCampo(input, valida, mensagem);
}

function validarFormulario() {
    mainForm.classList.add("was-validated");
    let formularioValido = true;

    const campos = mainForm.querySelectorAll("input, select");
    campos.forEach((campo) => {
        campo.setCustomValidity("");
        campo.classList.remove("is-invalid");

        if (campo.required && campo.offsetParent !== null) {
            let vazio = false;
            if (campo.type === "checkbox") {
                vazio = !campo.checked;
            } else {
                vazio = campo.value.trim() === "";
            }

            if (vazio) {
                marcarCampo(campo, false, "Este campo é obrigatório.");
            }
        }
    });

    if (modoAtual === "cadastro") {
        const nome = document.getElementById("nome");
        if (nome.value !== "") {
            marcarCampo(nome, nome.value.length <= 100, "O nome deve ter no máximo 100 caracteres.");
        }

        const idade = document.getElementById("idade");
        const idadeNumero = Number(idade.value);
        if (idade.value !== "") {
            marcarCampo(idade, idadeNumero > 18 && idadeNumero <= 120, "A idade deve ser maior que 18 anos.");
        }

        const valor = document.getElementById("valor");
        if (valor.value !== "") {
            const valorNumerico = Number(valor.value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
            marcarCampo(valor, valorNumerico > 0, "O valor deve ser maior que zero.");
        }

        const cpf = document.getElementById("cpf");
        if (cpf.value !== "") {
            validarCpf(cpf);
        }

        const cnpj = document.getElementById("cnpj");
        if (cnpj.value !== "") {
            validarCnpj(cnpj);
        }

        if (tipoAtual === "voluntario" && inputCrp.value !== "") {
            validarCrp(inputCrp);
        }

        const campoData = document.getElementById("data");
        if (campoData.value !== "") {
            validarDataIso(campoData, "Informe uma data válida, com ano de 4 dígitos e sem data futura.");
        }
        if (inputDataNascimento.value !== "") {
            validarDataIso(inputDataNascimento, "Informe uma data de nascimento válida, com ano de 4 dígitos e sem data futura.");
        }

        const cidade = document.getElementById("cidade");
        if (cidade.value !== "") {
            marcarCampo(cidade, cidade.value.length <= 50, "A cidade deve ter no máximo 50 caracteres.");
        }

        const site = document.getElementById("site-pessoal");
        if (site.value.trim() !== "") {
            validarSite(site);
        }

        validarSenhas();
    }

    const email = document.getElementById("email");
    if (email.value !== "") {
        marcarCampo(email, email.value.length <= 40 && email.checkValidity(), "Informe um e-mail válido com no máximo 40 caracteres.");
    }

    if (inputPassword.value !== "") {
        const senhaValida = inputPassword.value.length <= 30;
        marcarCampo(inputPassword, senhaValida, "A senha deve ter no máximo 30 caracteres.");
    }

    campos.forEach((campo) => {
        if (!campo.checkValidity()) {
            formularioValido = false;
            campo.classList.add("is-invalid");

            let paiCampo = campo.parentElement;
            if (campo.id === "senha" || campo.id === "confirmar-senha") {
                paiCampo = campo.closest(".mb-4");
            }

            if (!paiCampo.querySelector(".invalid-feedback")) {
                adicionarFeedback(campo, "Preencha este campo corretamente.");
            }
        }
    });
}

mainForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validarFormulario();
});

atualizarFormulario();