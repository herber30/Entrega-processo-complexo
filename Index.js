//para validar um numero
function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
}

//para obter os valores dos inputs do formulario
function obterValoresFormulario() {
    const montanteElement = document.getElementById("montante")
    const taxaJurosElement = document.getElementById("taxaJuros")
    const tempoEmprestimoElement = document.getElementById("tempoEmprestimo")

    const montante = parseFloat(montanteElement.value);
    const taxaJuros = parseFloat(taxaJurosElement.value) / 100
    const tempoEmprestimo = parseInt(tempoEmprestimoElement.value)

    return {
        montante,
        taxaJuros,
        tempoEmprestimo,
    };
}

//calcular as parcelas simples
function calcularParcelaSimples(montante, taxaJuros, tempoEmprestimo) {
    return montante * (taxaJuros * Math.pow((1 + taxaJuros), tempoEmprestimo)) / (Math.pow((1 + taxaJuros), tempoEmprestimo) - 1)
}

//exibir os resultados na tela
function exibirResultados(parcelasSimples, montante, taxaJuros, tempoEmprestimo) {
    const resultadoElement = document.getElementById("resultado")

    resultadoElement.innerHTML = ""

    //informacoes gerais
    const informacoesElement = document.createElement("div")
    informacoesElement.classList.add("informacoes")

    const montanteLabel = document.createElement("span")
    montanteLabel.textContent = `Montante: R$ ${montante.toFixed(2)}`

    const taxaJurosLabel = document.createElement("span")
    taxaJurosLabel.textContent = `Taxa de Juros: ${(taxaJuros * 100).toFixed(2)}%`

    const tempoEmprestimoLabel = document.createElement("span");
    tempoEmprestimoLabel.textContent = `Tempo do Empréstimo: ${tempoEmprestimo} meses`

    informacoesElement.appendChild(montanteLabel)
    informacoesElement.appendChild(taxaJurosLabel)
    informacoesElement.appendChild(tempoEmprestimoLabel)

    resultadoElement.appendChild(informacoesElement)

    //exibir resultado das parcelas simples
    resultadoElement.appendChild(document.createTextNode("**Parcelas simples:**"))
    const tabelaSimples = document.createElement("table")
    tabelaSimples.classList.add("table")
    for (let i = 1; i <= tempoEmprestimo; i++) {
        const linha = document.createElement("tr")
        const coluna = document.createElement("td")
        const parcela = calcularParcelaSimples(montante, taxaJuros, i)
        coluna.textContent = `Parcela ${i}: R$ ${parcela.toFixed(2)}`
        linha.appendChild(coluna)
        tabelaSimples.appendChild(linha)
    }
    resultadoElement.appendChild(tabelaSimples)
}

//funcao principal para calcular e exibir os resultados
function calcular() {
    const { montante, taxaJuros, tempoEmprestimo } = obterValoresFormulario()
    const parcelasSimples = []
    for (let i = 1; i <= tempoEmprestimo; i++) {
        const parcela = calcularParcelaSimples(montante, taxaJuros, i)
        parcelasSimples.push(parcela)
    }
    exibirResultados(parcelasSimples, montante, taxaJuros, tempoEmprestimo)
}

//utilizei algumas referencias para compor o codigo em sites como
https://www.w3schools.com, e series de videos como: https://www.youtube.com/watch?v=aRergQRF3lw