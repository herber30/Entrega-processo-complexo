// Objeto para controlar o simulador de empréstimo
const LoanSimulator = {
    // Método para validar se um valor é numérico
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value)
    },

    // Método para obter os valores do formulário
    obterValoresFormulario() {
        const montanteElement = document.getElementById("amount");
        const taxaJurosElement = document.getElementById("interestRate");
        const tempoEmprestimoElement = document.getElementById("loanTerm");

        const montante = parseFloat(montanteElement.value);
        const taxaJuros = parseFloat(taxaJurosElement.value) / 100;
        const tempoEmprestimo = parseInt(tempoEmprestimoElement.value);

        return {
            montante,
            taxaJuros,
            tempoEmprestimo,
        };
    },

    // Método para calcular as parcelas simples
    calcularParcelaSimples(montante, taxaJuros, tempoEmprestimo) {
        return montante * (taxaJuros * Math.pow((1 + taxaJuros), tempoEmprestimo)) / (Math.pow((1 + taxaJuros), tempoEmprestimo) - 1);
    },

    // Método para exibir os resultados na tela
    exibirResultados(parcelasSimples, montante, taxaJuros, tempoEmprestimo) {
        const resultadoElement = document.getElementById("result");

        resultadoElement.innerHTML = "";

        // Informações gerais
        const informacoesElement = document.createElement("div");
        informacoesElement.classList.add("informacoes");

        const montanteLabel = document.createElement("span");
        montanteLabel.textContent = `Montante: R$ ${montante.toFixed(2)}`;

        const taxaJurosLabel = document.createElement("span");
        taxaJurosLabel.textContent = `Taxa de Juros: ${(taxaJuros * 100).toFixed(2)}%`;

        const tempoEmprestimoLabel = document.createElement("span");
        tempoEmprestimoLabel.textContent = `Tempo do Empréstimo: ${tempoEmprestimo} meses`;

        informacoesElement.appendChild(montanteLabel);
        informacoesElement.appendChild(taxaJurosLabel);
        informacoesElement.appendChild(tempoEmprestimoLabel);

        resultadoElement.appendChild(informacoesElement);

        // Exibir resultado das parcelas simples
        resultadoElement.appendChild(document.createTextNode("**Parcelas simples:**"));
        const tabelaSimples = document.createElement("table");
        tabelaSimples.classList.add("table");
        for (let i = 1; i <= tempoEmprestimo; i++) {
            const linha = document.createElement("tr");
            const coluna = document.createElement("td");
            const parcela = this.calcularParcelaSimples(montante, taxaJuros, i);
            coluna.textContent = `Parcela ${i}: R$ ${parcela.toFixed(2)}`;
            linha.appendChild(coluna);
            tabelaSimples.appendChild(linha);
        }
        resultadoElement.appendChild(tabelaSimples);
    },

    // Função principal para calcular e exibir os resultados
    calcular() {
        const { montante, taxaJuros, tempoEmprestimo } = this.obterValoresFormulario();
        const parcelasSimples = [];
        for (let i = 1; i <= tempoEmprestimo; i++) {
            const parcela = this.calcularParcelaSimples(montante, taxaJuros, i);
            parcelasSimples.push(parcela);
        }
        this.exibirResultados(parcelasSimples, montante, taxaJuros, tempoEmprestimo);
    }
};

// Esperar que o DOM seja carregado
document.addEventListener("DOMContentLoaded", function() {
    // Associar função ao botão de simular
    document.getElementById("calculate").addEventListener("click", function() {
        LoanSimulator.calcular();
    });
});


//utilizei algumas referencias para compor o codigo em sites como
https://www.w3schools.com, e series de videos como: https://www.youtube.com/watch?v=aRergQRF3lw