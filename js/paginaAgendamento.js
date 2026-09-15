const mesAnoAtual = document.getElementById("mes-ano-atual");

const proximoMes = document.getElementById("proximo");
const anteriorMes = document.getElementById("anterior");

const btnIndividual = document.getElementById("btn-individual");
const btnGrupoApoio = document.getElementById("btn-grupo-apoio");

const iconIndividual = document.getElementById("icon-individual");
const iconGrupoApoio = document.getElementById("icon-grupo-apoio"); 

btnIndividual.addEventListener("click", () => {
    btnGrupoApoio.classList.add("btn-acolhimento-inactive");
    btnGrupoApoio.classList.remove("btn-acolhimento-active");

    btnIndividual.classList.add("btn-acolhimento-active");
    btnIndividual.classList.remove("btn-acolhimento-inactive");

    iconGrupoApoio.classList.remove("color-active", "bi-circle-fill");
    iconGrupoApoio.classList.add("color-inactive", "bi-circle");
    iconIndividual.classList.remove("color-inactive", "bi-circle");

    btnGrupoApoio.classList.add("text-secondary");
    btnIndividual.classList.remove("text-secondary");
});

btnGrupoApoio.addEventListener("click", () => {
    btnGrupoApoio.classList.remove("btn-acolhimento-inactive");
    btnGrupoApoio.classList.add("btn-acolhimento-active");

    btnIndividual.classList.remove("btn-acolhimento-active");
    btnIndividual.classList.add("btn-acolhimento-inactive");

    iconGrupoApoio.classList.add("color-active", "bi-circle-fill");
    iconGrupoApoio.classList.remove("color-inactive", "bi-circle");
    iconIndividual.classList.add("color-inactive", "bi-circle");

    btnGrupoApoio.classList.remove("text-secondary");
    btnIndividual.classList.add("text-secondary");
});

document.addEventListener('DOMContentLoaded', function() {
    const mesAnoTexto = document.getElementById('mes-ano-atual');
    const calendarioCorpo = document.getElementById('calendario-corpo');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Inicia com a data atual
    let dataAtual = new Date();
    let mesAtual = dataAtual.getMonth();
    let anoAtual = dataAtual.getFullYear();
    
    // Objeto para guardar o dia clicado
    let diaSelecionado = null;

    function renderizarCalendario(mes, ano) {
        // Atualiza o título do mês/ano
        mesAnoTexto.textContent = `${meses[mes]} de ${ano}`;
        
        // Limpa o calendário antes de renderizar novamente
        calendarioCorpo.innerHTML = '';

        // Cria o container Grid do calendário
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        grid.style.gap = '8px';
        grid.style.alignItems = 'center';
        grid.style.justifyItems = 'center';

        // 1. Renderiza o cabeçalho com os dias da semana
        diasSemana.forEach(dia => {
            const divDia = document.createElement('div');
            divDia.textContent = dia;
            divDia.className = 'text-muted mb-2';
            divDia.style.fontSize = '0.85rem';
            divDia.style.fontWeight = '500';
            grid.appendChild(divDia);
        });

        // 2. Descobre qual dia da semana cai o 1º dia do mês (0 = Dom, 1 = Seg...)
        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
        
        // 3. Descobre quantos dias tem o mês atual
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        // 4. Preenche os espaços vazios antes do dia 1
        for (let i = 0; i < primeiroDiaSemana; i++) {
            const vazio = document.createElement('div');
            grid.appendChild(vazio);
        }

        // 5. Renderiza os botões dos dias numéricos
        for (let i = 1; i <= diasNoMes; i++) {
            const btnDia = document.createElement('button');
            btnDia.textContent = i;
            
            // Classes base do botão (usando bootstrap e limpando bordas)
            btnDia.className = 'btn border-0 rounded-3 d-flex align-items-center justify-content-center';
            btnDia.style.width = '36px';
            btnDia.style.height = '36px';
            btnDia.style.fontWeight = '500';
            btnDia.style.transition = '0.2s';

            // Verifica se este é o dia selecionado atualmente
            const isSelecionado = diaSelecionado && diaSelecionado.dia === i && diaSelecionado.mes === mes && diaSelecionado.ano === ano;

            if (isSelecionado) {
                // Estilo do dia ativo (Fundo Verde Escuro)
                btnDia.style.backgroundColor = '#638B74'; 
                btnDia.style.color = 'white';
            } else {
                // Estilo do dia normal
                btnDia.style.backgroundColor = 'transparent';
                btnDia.style.color = '#4A5568';
                
                // Efeito Hover (Fundo Verde Claro)
                btnDia.addEventListener('mouseenter', () => btnDia.style.backgroundColor = '#E8EFEA');
                btnDia.addEventListener('mouseleave', () => btnDia.style.backgroundColor = 'transparent');
            }

            // Evento de clique para selecionar o dia
            btnDia.addEventListener('click', (e) => {
                e.preventDefault();
                diaSelecionado = { dia: i, mes: mes, ano: ano };
                renderizarCalendario(mes, ano); // Re-renderiza para atualizar as cores
            });

            grid.appendChild(btnDia);
        }

        calendarioCorpo.appendChild(grid);
    }

    // Navegação: Mês Anterior
    btnAnterior.addEventListener('click', (e) => {
        e.preventDefault();
        mesAtual--;
        if (mesAtual < 0) {
            mesAtual = 11;
            anoAtual--;
        }
        renderizarCalendario(mesAtual, anoAtual);
    });

    // Navegação: Próximo Mês
    btnProximo.addEventListener('click', (e) => {
        e.preventDefault();
        mesAtual++;
        if (mesAtual > 11) {
            mesAtual = 0;
            anoAtual++;
        }
        renderizarCalendario(mesAtual, anoAtual);
    });

    // Chama a função a primeira vez para desenhar o calendário na tela
    renderizarCalendario(mesAtual, anoAtual);
});
