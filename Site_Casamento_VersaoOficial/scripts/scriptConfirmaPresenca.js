const quantAdultos = document.getElementById('quantidade_adultos'); 
const nomeAcompanhante = document.getElementById('acompanhante'); 
const quantCriancas = document.getElementById('quantidade_crianca');
const nomeCriancas = document.getElementById('crianca'); 
const telefoneConfirmacao = document.getElementById('telefone')
const nomeConfirmacao = document.getElementById('nome')
const emailConfirmacao = document.getElementById('email')
const form = document.getElementById("form");
const observacao = document.getElementById("observacoes");
const mensagemConfirmacao = document.getElementById("mensagem");

function confirmarPresenca(event) {

    event.preventDefault();

    let nomesAcompanhantes = "Nenhum";
    // Seleciona TODOS os inputs que têm a classe 'nome_acompanhante_input'
    const acompanhantesInputs = document.querySelectorAll('.nome_acompanhante_input');
    
    if (acompanhantesInputs.length > 0) {
        // Converte a lista de inputs para um Array, pega o valor de cada um e junta com vírgula.
        nomesAcompanhantes = Array.from(acompanhantesInputs)
                                  .map(input => input.value)
                                  .filter(value => value.trim() !== '') // Remove vazios, se houver
                                  .join(', ');
    }

    let nomesCriancas = "Nenhum";
    // Seleciona TODOS os inputs que têm a classe 'nome_crianca_input'
    const criancasInputs = document.querySelectorAll('.nome_crianca_input');
    
    if (criancasInputs.length > 0) {
        // Converte a lista de inputs para um Array, pega o valor de cada um e junta com vírgula.
        nomesCriancas = Array.from(criancasInputs)
                             .map(input => input.value)
                             .filter(value => value.trim() !== '') // Remove vazios, se houver
                             .join(', ');
    }

    const confirmacaoValue = document.querySelector('input[name="confirmacao"]:checked') ? 
        document.querySelector('input[name="confirmacao"]:checked').value : 'Não preenchido';
    const obsValue = document.getElementById('observacoes').value.trim() || 'Nenhuma';


    let message = ` Olá, Martha e Odilon!\n
    ${nomeConfirmacao.value} acaba de ${confirmacaoValue === 'sim' ? 'CONFIRMAR a' : 'NEGAR a'} presença no seu casamento!
    
    Esses são os dados que ${nomeConfirmacao.value} preencheu: 
      Telefone: ${telefoneConfirmacao.value}
      E-mail: ${emailConfirmacao.value}
      Quantidade de adultos (Incluindo ${nomeConfirmacao.value}): ${quantAdultos.value}
      Nomes dos acompanhantes adultos: ${nomesAcompanhantes}
      Quantidade de crianças: ${quantCriancas.value}
      Nomes das crianças: ${nomesCriancas}
      Observação: ${observacao.value}
      
                     `
    emailjs.send("service_casamento", "template_bdzwr62",{
        title: "Confirmação de Presença",
        name: nomeConfirmacao.value,
        message,
        email: emailConfirmacao.value,
        telefone: telefoneConfirmacao.value,
        Quantidadedeadultos: quantAdultos.value,
        Nomedosacompanhantes: nomesAcompanhantes,
        Quantidadedecriancas: quantCriancas.value,
        Nomedascriancas: nomesCriancas,
        Observacao: observacao,

        }).then(function(response) {
            mensagemConfirmacao.textContent = 'Sua presença foi confirmada e enviada aos noivos!'
             mensagemConfirmacao.style.display = 'block';
            form.reset();
        }, function(error) {
            mensagemConfirmacao.textContent = 'Ocorreu um erro ao confirmar sua presença. Por favor tente novamente.'
             mensagemConfirmacao.style.display = 'block';
            console.error('Falha no envio:', error);
    });     
}

form.addEventListener('submit', confirmarPresenca);
//form.addEventListener("submit", logSubmit);


function atualizarAcompanhantes(){ 
    const totalAdultos = parseInt(quantAdultos.value); 
    const numeroAcompanhantes = totalAdultos - 1; 
    nomeAcompanhante.innerHTML = ''; 
    
    for(let i = 1; i <= numeroAcompanhantes; i++){
        const divAcompanhante = document.createElement('div');
        divAcompanhante.classList.add('acompanhante');
        const inputAcompanhante = document.createElement('input');
        inputAcompanhante.setAttribute('type', 'text');
        inputAcompanhante.classList.add('nome_acompanhante_input');
        inputAcompanhante.setAttribute('name', `adulto${i}`); 
        inputAcompanhante.setAttribute('placeholder', 'Nome completo do acompanhante'); 
        divAcompanhante.appendChild(inputAcompanhante);
        nomeAcompanhante.appendChild(divAcompanhante);
    }
}
function atualizarCriancas(){ 
    const numeroCriancas = parseInt(quantCriancas.value); 
    nomeCriancas.innerHTML = ''; 

    for(let i = 1; i <= numeroCriancas; i++){
        const divCriancas = document.createElement('div');
        divCriancas.classList.add('crianca');
        const inputCriancas = document.createElement('input');
        inputCriancas.setAttribute('type', 'text');
        inputCriancas.classList.add('nome_crianca_input');
        inputCriancas.setAttribute('name', `crianca${i}`); 
        inputCriancas.setAttribute('placeholder', 'Nome completo da criança'); 
        divCriancas.appendChild(inputCriancas);
        nomeCriancas.appendChild(divCriancas);
    }
}

quantAdultos.addEventListener('change', atualizarAcompanhantes);
atualizarAcompanhantes();
quantCriancas.addEventListener('change', atualizarCriancas);
atualizarCriancas();
