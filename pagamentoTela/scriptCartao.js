document.addEventListener('DOMContentLoaded', function() {
    // Referência aos elementos <select>
    const selectDay = document.getElementById('expiry-day');
    const selectYear = document.getElementById('expiry-year');
    const cardNumber = document.getElementById('card-number');
    const vencimentoDia = document.getElementById('expiry-day');
    const vencimentoAno = document.getElementById('expiry-year');
    const cardCvv = document.getElementById('cvv');

    // 1. Preencher os Dias (01 a 31)
    function populateDays() {
        for (let i = 1; i <= 31; i++) {
            // Garante o formato com dois dígitos (ex: "01", "15")
            const day = String(i).padStart(2, '0'); 
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            selectDay.appendChild(option);
        }
    }

    // 2. Preencher os Anos (De 2010 até o ano atual)
    function populateYears() {
        const currentYear = 2045;
        const startYear = 2025;

        for (let i = startYear; i <= currentYear; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);
        }
    }

    function validarNumero(){
        const numeroCartao = document.getElementById('card-number').value;
        const limpo = numeroCartao.replace(/\s/g, '');

        if (!/^\d{13,19}$/.test(limpo)) {
            alert("Número inválido. Deve ter entre 13 e 19 dígitos.");
            return false;
    }

        let soma = 0;
        let deveDobrar = false;

        for (let i = limpo.length - 1; i >= 0; i--) {
            let digito = parseInt(limpo.charAt(i), 10);

        if (deveDobrar) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9; 
            }
        }

        soma += digito;
        deveDobrar = !deveDobrar;
    }

    const valido = soma % 10 === 0;

    if (valido) {
        alert("Número do cartão VÁLIDO!");
    } else {
        alert("Número do cartão INVÁLIDO");
    }

    return valido;
}

    function validarVencimento(){
        const hoje = new Date();
        const anoAtual = hoje.getFullYear() % 100;
        const mesAtual = hoje.getMonth() + 1;
        const mes = parseInt(vencimentoDia, 10);
        const ano = parseInt(vencimentoAno, 10);

        if (ano < anoAtual) {
            alert("Ano de vencimento INVÁLIDO");
            return false;
        }
    
        if (ano === anoAtual && mes < mesAtual) {
            alert("Mês de vencimento INVÁLIDO");
            return false;
        }
        
        alert("✅ Data de vencimento VÁLIDA!");
            return true;

    }

    function validarCVV(){
        if (!/^\d{3,4}$/.test(limpo)) {
            alert("CVV inválido.");
            return false;
        }
        alert("CVV VÁLIDO!");
        return true;
    }
    
    
    // Executa as funções
    populateDays();
    populateYears();
    validarNumero();
    validarVencimento();
    validarCVV();

});