const LoanSimulator = {
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    obterValoresFormulario() {
        const montante = parseFloat(document.getElementById("amount").value);
        const taxaJuros = parseFloat(document.getElementById("interestRate").value) / 100;
        const tempoEmprestimo = parseInt(document.getElementById("loanTerm").value);
        return { montante, taxaJuros, tempoEmprestimo };
    },

    calcularParcelas(montante, taxaJuros, tempoEmprestimo) {
        const taxa = taxaJuros / 12; // Taxa de juros mensal
        const parcelas = [];
        for (let i = 1; i <= tempoEmprestimo; i++) {
            const parcela = montante * taxa / (1 - Math.pow(1 + taxa, -tempoEmprestimo)); // Fórmula para cálculo da parcela
            parcelas.push(parcela);
        }
        return parcelas;
    },

    calcularJurosTotal(montante, parcelas) {
        const totalParcelas = parcelas.reduce((acc, val) => acc + val, 0);
        return totalParcelas - montante;
    },

    exibirResultados(parcelas, montante, taxaJuros, tempoEmprestimo) {
        const resultadoElement = document.getElementById("result");
        resultadoElement.innerHTML = "";

        const informacoesElement = document.createElement("div");
        informacoesElement.classList.add("informacoes");

        const montanteLabel = document.createElement("p");
        montanteLabel.textContent = `Montante do Empréstimo: R$ ${montante.toFixed(2)}`;

        const taxaJurosLabel = document.createElement("p");
        taxaJurosLabel.textContent = `Taxa de Juros: ${(taxaJuros * 100).toFixed(2)}% ao mês`;

        const tempoEmprestimoLabel = document.createElement("p");
        tempoEmprestimoLabel.textContent = `Prazo do Empréstimo: ${tempoEmprestimo} meses`;

        informacoesElement.appendChild(montanteLabel);
        informacoesElement.appendChild(taxaJurosLabel);
        informacoesElement.appendChild(tempoEmprestimoLabel);

        resultadoElement.appendChild(informacoesElement);

        resultadoElement.appendChild(document.createElement("hr"));

        const tabelaParcelas = document.createElement("table");
        tabelaParcelas.classList.add("table");

        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const cabecalho = document.createElement("tr");

        const colunaParcela = document.createElement("th");
        colunaParcela.textContent = "";
        cabecalho.appendChild(colunaParcela);

        const colunaValorParcela = document.createElement("th");
        colunaValorParcela.textContent = "Valor da Parcela";
        cabecalho.appendChild(colunaValorParcela);

        const colunaJuros = document.createElement("th");
        colunaJuros.textContent = "Juros Acumulados";
        cabecalho.appendChild(colunaJuros);

        thead.appendChild(cabecalho);

        let totalJuros = 0;
        for (let i = 0; i < tempoEmprestimo; i++) {
            const linha = document.createElement("tr");

            const numeroParcela = document.createElement("td");
            numeroParcela.textContent = `${i + 1}`;
            linha.appendChild(numeroParcela);

            const valorParcela = document.createElement("td");
            valorParcela.textContent = `R$ ${parcelas[i].toFixed(2)}`;
            linha.appendChild(valorParcela);

            const juros = montante * taxaJuros * (i + 1);
            totalJuros += juros;
            const colunaJuros = document.createElement("td");
            colunaJuros.textContent = `R$ ${juros.toFixed(2)}`;
            linha.appendChild(colunaJuros);

            tbody.appendChild(linha);
        }

        tabelaParcelas.appendChild(thead);
        tabelaParcelas.appendChild(tbody);
        resultadoElement.appendChild(tabelaParcelas);

        resultadoElement.appendChild(document.createElement("hr"));

        const totalJurosElement = document.createElement("p");
        totalJurosElement.textContent = `Total de Juros: R$ ${totalJuros.toFixed(2)}`;
        resultadoElement.appendChild(totalJurosElement);

        const valorFinalElement = document.createElement("p");
        valorFinalElement.textContent = `Valor Final do Empréstimo: R$ ${(montante + totalJuros).toFixed(2)}`;
        resultadoElement.appendChild(valorFinalElement);
    },

    calcular() {
        const { montante, taxaJuros, tempoEmprestimo } = this.obterValoresFormulario();
        const parcelas = this.calcularParcelas(montante, taxaJuros, tempoEmprestimo);
        this.exibirResultados(parcelas, montante, taxaJuros, tempoEmprestimo);
    }
};

document.getElementById("calculate").addEventListener("click", function() {
    LoanSimulator.calcular();
});
