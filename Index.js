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
      const parcela = montante * taxa / (1 - Math.pow(1 + taxa, -tempoEmprestimo)); // Fórmula para cálculo da parcela
      return parcela;
    },
  
    exibirResultados(parcela, montante, taxaJuros, tempoEmprestimo) {
      const resultadoElement = document.getElementById("loan-result");
      resultadoElement.innerHTML = "";
  
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
  
      resultadoElement.appendChild(document.createTextNode("**Parcelas:**"));
      const tabelaParcelas = document.createElement("table");
      tabelaParcelas.classList.add("table");
      for (let i = 1; i <= tempoEmprestimo; i++) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");
        coluna.textContent = `Parcela ${i}: R$ ${parcela.toFixed(2)}`;
        linha.appendChild(coluna);
        tabelaParcelas.appendChild(linha);
      }
      resultadoElement.appendChild(tabelaParcelas);
    },
  
    calcular() {
      const { montante, taxaJuros, tempoEmprestimo } = this.obterValoresFormulario();
      const parcela = this.calcularParcelas(montante, taxaJuros, tempoEmprestimo);
      this.exibirResultados(parcela, montante, taxaJuros, tempoEmprestimo);
    }
  };
  
  document.getElementById("calculate").addEventListener("click", function() {
    LoanSimulator.calcular();
  });