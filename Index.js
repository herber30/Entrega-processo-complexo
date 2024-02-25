// Funcao para obter o preco de custo do usuario
function obterPrecoCusto() {
    const precoCustoElement = document.getElementById("preco-custo")
    const precoCusto = parseFloat(precoCustoElement.value)
    return precoCusto
}

function calcularICMS(precoCusto, taxaICMS) {
    const valorICMS = precoCusto * taxaICMS
    return valorICMS
}

function mostrarPrecoFinal(precoFinal) {
    const precoFinalElement = document.getElementById("preco-final")
    precoFinalElement.textContent = precoFinal.toFixed(2)
}

// Funcao principal para calcular e mostrar o preoo final
function calcularPrecoFinal() {
    const taxaICMS = 0.19; // levando em consideracao que seja a porcentagem de 19%
    const precoCusto = obterPrecoCusto()
    const valorICMS = calcularICMS(precoCusto, taxaICMS)
    const precoFinal = precoCusto + valorICMS
    mostrarPrecoFinal(precoFinal)
}

// Associando a funçao de calcular ao botao para que o resultado apareca
const calcularButton = document.getElementById("calcular")
calcularButton.addEventListener("click", calcularPrecoFinal)
