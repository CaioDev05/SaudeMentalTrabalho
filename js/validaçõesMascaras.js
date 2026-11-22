function adicionarFeedback(input, mensagem) {
    let pai = input.closest(".mb-3, .mb-4") || input.parentElement;
    let feedback = pai.querySelector(".invalid-feedback");
    if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        pai.appendChild(feedback);
    }
    feedback.textContent = mensagem;
    feedback.style.display = "block";
}

function marcarCampo(input, valido, mensagem) {
    input.setCustomValidity(valido ? "" : mensagem);
    if (valido) {
        input.classList.remove("is-invalid");
        const pai = input.closest(".mb-3, .mb-4");
        if (pai) {
            pai.classList.remove("campo-invalido");
            const feedback = pai.querySelector(".invalid-feedback");
            if (feedback) {
                feedback.style.display = "none";
            }
        }
    } else {
        input.classList.add("is-invalid");
        adicionarFeedback(input, mensagem);
        const pai = input.closest(".mb-3, .mb-4");
        if (pai) {
            pai.classList.add("campo-invalido");
        }
    }
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
        resultado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 6) + "-" + numeros.slice(6);
    }
    if (numeros.length === 11) {
        resultado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 7) + "-" + numeros.slice(7);
    }
    input.value = resultado;
}

function mascararRg(input) {
    const numeros = input.value.toUpperCase().replace(/[^0-9X]/g, "").slice(0, 9);
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
    const numeros = input.value.replace(/\D/g, "").slice(0, 8);
    let resultado = "CRP ";
    if (numeros.length > 2) {
        resultado += numeros.slice(0, 2) + "/" + numeros.slice(2);
    } else {
        resultado += numeros;
    }
    input.value = resultado;
}

function mascararValor(input) {
    let numeros = input.value.replace(/\D/g, "");
    numeros = numeros === "" ? "0" : numeros;
    const valor = (Number(numeros) / 100).toFixed(2);
    const partes = valor.split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    input.value = "R$ " + partes[0] + "," + partes[1];
}

function mascararData(input) {
    const numeros = input.value.replace(/\D/g, "").slice(0, 8);
    let resultado = numeros;
    if (numeros.length > 2) {
        resultado = numeros.slice(0, 2) + "/" + numeros.slice(2);
    }
    if (numeros.length > 4) {
        resultado = numeros.slice(0, 2) + "/" + numeros.slice(2, 4) + "/" + numeros.slice(4);
    }
    input.value = resultado;
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
        const pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        for (let i = 0; i < 12; i += 1) {
            soma += Number(cnpj[i]) * pesos[i];
        }
        let resto = soma % 11;
        let digito = resto < 2 ? 0 : 11 - resto;
        valido = digito === Number(cnpj[12]);
    }
    if (valido) {
        const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        for (let i = 0; i < 13; i += 1) {
            soma += Number(cnpj[i]) * pesos[i];
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
    marcarCampo(input, tamanhoValido && formatoCrp.test(input.value),
        "Informe o CRP no formato CRP XX/YYYYY ou CRP XX/YYYYYY.");
}

function validarData(input, mensagem) {
    const formatoValido = /^\d{2}\/\d{2}\/\d{4}$/.test(input.value);
    let valida = false;
    if (formatoValido) {
        const hoje = new Date();
        const hojeIso = hoje.getFullYear() + "-" +
            String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
            String(hoje.getDate()).padStart(2, "0");
        const partes = input.value.split("/");
        const dataIso = partes[2] + "-" + partes[1] + "-" + partes[0];
        const dataInformada = new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
        const dataExiste = dataInformada.getFullYear() === Number(partes[2]) &&
            dataInformada.getMonth() === Number(partes[1]) - 1 &&
            dataInformada.getDate() === Number(partes[0]);
        valida = dataExiste && dataIso >= "0001-01-01" && dataIso <= hojeIso;
    }
    marcarCampo(input, valida, mensagem);
}

function configurarMascaras() {
    const elementos = {
        valor: document.getElementById("valor"),
        data: document.getElementById("data"),
        cpf: document.getElementById("cpf"),
        cnpj: document.getElementById("cnpj"),
        cep: document.getElementById("cep"),
        telefone: document.getElementById("telefone"),
        rg: document.getElementById("rg"),
        crp: document.getElementById("crp"),
        dataNascimento: document.getElementById("data-nascimento")
    };
    if (elementos.valor) {
        elementos.valor.addEventListener("input", () => mascararValor(elementos.valor));
    }
    if (elementos.data) {
        elementos.data.addEventListener("input", () => mascararData(elementos.data));
    }
    if (elementos.cpf) {
        elementos.cpf.addEventListener("input", () => mascararCpf(elementos.cpf));
    }
    if (elementos.cnpj) {
        elementos.cnpj.addEventListener("input", () => mascararCnpj(elementos.cnpj));
    }
    if (elementos.cep) {
        elementos.cep.addEventListener("input", () => mascararCep(elementos.cep));
    }
    if (elementos.telefone) {
        elementos.telefone.addEventListener("input", () => mascararTelefone(elementos.telefone));
    }
    if (elementos.rg) {
        elementos.rg.addEventListener("input", () => mascararRg(elementos.rg));
    }
    if (elementos.crp) {
        elementos.crp.addEventListener("input", () => mascararCrp(elementos.crp));
    }
    if (elementos.dataNascimento) {
        elementos.dataNascimento.addEventListener("input", () => mascararData(elementos.dataNascimento));
    }
}

function validarFormularioGeral(formulario) {
    formulario.classList.add("was-validated");
    const campos = formulario.querySelectorAll("input, select, textarea");
    let formularioValido = true;
    campos.forEach((campo) => {
        campo.setCustomValidity("");
        campo.classList.remove("is-invalid");
        if (campo.required) {
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
    const nome = formulario.querySelector("#nome");
    if (nome && nome.value !== "") {
        marcarCampo(nome, nome.value.length <= 100, "O nome deve ter no máximo 100 caracteres.");
    }
    const email = formulario.querySelector("#email");
    if (email && email.value !== "") {
        const limite = email.maxLength > 0 ? email.maxLength : 100;
        marcarCampo(email, email.value.length <= limite && email.checkValidity(),
            "Informe um e-mail válido com no máximo " + limite + " caracteres.");
    }
    const cpf = formulario.querySelector("#cpf");
    if (cpf && cpf.value !== "") {
        validarCpf(cpf);
    }
    const cnpj = formulario.querySelector("#cnpj");
    if (cnpj && cnpj.value !== "") {
        validarCnpj(cnpj);
    }
    const crp = formulario.querySelector("#crp");
    if (crp && crp.value !== "" && crp.offsetParent !== null) {
        validarCrp(crp);
    }
    const data = formulario.querySelector("#data");
    if (data && data.value !== "") {
        validarData(data, "Informe uma data válida com ano de 4 dígitos e sem data futura.");
    }
    const dataNascimento = formulario.querySelector("#data-nascimento");
    if (dataNascimento && dataNascimento.value !== "") {
        validarData(dataNascimento, "Informe uma data de nascimento válida e sem data futura.");
    }
    const idade = formulario.querySelector("#idade");
    if (idade && idade.value !== "") {
        const limiteMinimo = formulario.id === "mainForm" ? 18 : 0;
        marcarCampo(idade, Number(idade.value) > limiteMinimo,
            limiteMinimo === 18 ? "A idade deve ser maior que 18 anos." : "A idade deve ser maior que zero.");
    }
    const mensagem = formulario.querySelector("#mensagem");
    if (mensagem && mensagem.value !== "") {
        marcarCampo(mensagem, mensagem.value.length <= 500,
            "A mensagem deve ter no máximo 500 caracteres.");
    }
    const senha = formulario.querySelector("#senha");
    const confirmarSenha = formulario.querySelector("#confirmar-senha");
    if (senha && senha.offsetParent !== null && senha.value !== "") {
        marcarCampo(senha, senha.value.length <= 30,
            "A senha deve ter no máximo 30 caracteres.");
    }
    if (senha && confirmarSenha && confirmarSenha.offsetParent !== null) {
        let senhasValidas = confirmarSenha.value !== "" &&
            senha.value === confirmarSenha.value &&
            confirmarSenha.value.length <= 30;
        let mensagemSenha = "Preencha a confirmação e informe a mesma senha.";
        if (confirmarSenha.value.length > 30) {
            mensagemSenha = "A confirmação deve ter no máximo 30 caracteres.";
        } else if (confirmarSenha.value !== "" && senha.value === confirmarSenha.value) {
            mensagemSenha = "As senhas coincidem.";
        }
        marcarCampo(confirmarSenha, senhasValidas, mensagemSenha);
    }
    campos.forEach((campo) => {
        if (!campo.checkValidity()) {
            formularioValido = false;
        }
    });
    formulario.dataset.valido = formularioValido ? "true" : "false";
}

configurarMascaras();

const formularios = document.querySelectorAll("form");
formularios.forEach((formulario) => {
    formulario.addEventListener("submit", (event) => {
        validarFormularioGeral(formulario);
        if (formulario.dataset.valido !== "true") {
            event.preventDefault();
        }
    });
});
