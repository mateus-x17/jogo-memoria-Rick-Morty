//pegar dados do jogador para o ccabeçalho e do tempo
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

//queremos pegar as imagens e para cada imagem cria uma nova carta no jogo da memoria seguindo a estrutura do HTML 
const grid = document.querySelector('.grid') //acessar a div mae onde a carta deve ser adc, contem o display grid

//acessar imagens colocando-as em um array
const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
] //nomes das imagens que seão a frente das cartas

//func para criar um elemento automaticamente recebendo a tag e nome da classe desejada - substitui os metodos anteriores comentado
const createElement = (tag, className) =>{
    const element = document.createElement(tag)
    element.className = className;
    return element;
} 

// variaveis que armazenam a carta clicada
let firstCard = '';
let secondCard = '';

//variaveis que conta os acertos e erros
let acertos = 0
let erros = 0

//verificar se i jogo acabou
const checkEndgame = () =>{
    //se o total de cartas deabilitadas estiver igual a quantidade de personagens duplicados o jogo acabou
    const desabledCards = document.querySelectorAll('.desable-card')

    //encerrar o timer ao vencer o jogo
    if (desabledCards.length === characters.length * 2) {
        clearInterval(this.loop);
        alert(`FIM DE JOGO !!  ${spanPlayer.innerHTML} seu tempo foi: ${(Number(timer.innerHTML) / 60).toPrecision(2)} min`);
        
        // Chama o confirm uma vez e usa o resultado na condição para reiniciar ou não o jogo
        const restart = confirm("deseja reiniciar o jogo?");
        
        if (restart === true) {
            window.location = '../index.html';
        } else {
            return;
        }
    }
           
};


//func para verificar se as duas cartas clicadas são iguais
const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondCharacter){
        console.log("acertou o jogo!!")
        //se acertar devemos mudar o estilo da frente das cartas que são iguais para sinalizar que foi acertado enviando uma classe css para elas
        firstCard.firstChild.classList.add('desable-card') //o firstChild é a primeira div correspondente do html, neste caso a div .front
        secondCard.firstChild.classList.add('desable-card')
        acertos += 1 //contabilizar os acertos
        console.log('acertos: ' + acertos)

        //limpar var de cards
        firstCard = ''
        secondCard = ''

        //verificar se o jogo acabou
        checkEndgame()
    } else{
        setTimeout(()=>{
            firstCard.classList.remove('revel-Card')
            //console.log(`removeu classe da 1° carta: ${firstCard}`)
            secondCard.classList.remove('revel-Card')
           // console.log(`removeu classe da 2° carta: ${secondCard}`)
           erros += 1 //contabilizar os erros
           console.log('erros: ' + erros)
           firstCard = ''
           secondCard = ''

        }, 500) //se houver outro click antes de 500ms a carta pode ficar com a imagem a mostra - verificar possivel erro
    } //se os atributos data-character for igual ... senão remove a classe das variaveis tirando a fto da tela no intervalo de tempo da func setTimeout()*/
} //as variaveis que fazem a compparação devem ser resetadas a cada 2 cartas, para que possa fazer outras comparações depois. senão o valor da variavel fica estatico e não realiza mais comparações. 

 const revelCard = ({target}) =>{
    //console.log(target.parentNode);
    if (target.parentNode.classList.contains('revel-Card')) {
        console.log('A classe "revel-Card" já está presente');
        return;
    }//se a carta ja tiver virada não faz nada, pula para o fim da função.

    //se o card não estiver clicado adciona a clss de revelar a frente e guarda na variavel firstCard
    if(firstCard === ''){
        target.parentNode.classList.add('revel-Card')
        firstCard = target.parentNode
    } else if (secondCard === ''){
        target.parentNode.classList.add('revel-Card')
        secondCard = target.parentNode

        checkCards() //func para verificar se as cartas são iguais
    }

     //acessa a div pai (.parentNode) do event (card face back clicado) no caso a div card e adciona a classe de revelar a frente da carta
    target.parentNode.classList.add('revel-Card')
}
// função para criar uma carta/card - deve receber um personagem (correspondente a img)
const createCard = (character) =>{
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')
    /*const card = document.createElement('div') //criar uma div
    const front = document.createElement('div') //criar uma div para a frente da carta
    const back = document.createElement('div') //criar uma div para as costas da carta*/

    front.style.backgroundImage = `url('../imgs/${character}.png')` //substitui a img do card no css

    // adcionar as classes das divs
    /*card.className = 'card' //adiciona a classe 'card' no elemento card.
    front.className = 'face front'
    back.className = 'face back'*/
    // criar os elementos 
    card.appendChild(front) //adciona a div de classe front a div card
    card.appendChild(back) //adciona a div de classe back a div card
    // adcionar a carta na div mãe chamada .grid
    /*const grid = document.querySelector('.grid') //acessar a div mae onde a carta deve ser adc, contem o display grid
    grid.appendChild(card)*/

    //ao clicar na card adciona a classe css que exibe seu front*/
    card.addEventListener('click', revelCard )
    card.setAttribute('data-character', character); //adc um atributo novo (personalizado com data-nome) para verificar se este atributo é igual ao da segunda card clicada
    return card

}

//func para carregar o jogo
const loadGame = () =>{
    const duplicateCharacters = [...characters, ...characters] //duplicar a lista de personagens para ter o jogo da memoria, senão serão apenas fotos unnicas de cada personagem

    //precismaos embaralhar a ordem das imgs, como são retiradas de uma lista, podemos usar o metodo .sort() nativo do js para arrays
    // embaralhar os itens - Math.random() - 0.5 gera numeros aleatorios entre 0 e 1
    const shuffleadArray = duplicateCharacters.sort( ()=> Math.random() - 0.5 ) // se o numero retornado pela callbakc for menor q 0 (negativo) altera, sençao não aleta a posição do item

    shuffleadArray.forEach((character)=>{
        const card = createCard(character) //a img do front deve ser dinamica
        grid.appendChild(card)
    }) //percorre cada item do array de cards embaralhadas (imgs) e executa a callback (recebe o item percorrido naquela hora) para cada um, criando assim as novas cartas chamando as funções createElement() e createCard().

}

const startTimer = () => {
    this.loop = setInterval(()=>{
        const currentTimer = Number(timer.innerHTML); //timer = espaço html com o tempo
        timer.innerHTML = currentTimer + 1
    }, 1000) //a cada segundo realiza a função
    //this - contexto geral de alguma coisa/func
    //criamo uma chave loop para acessar o cronometro
}//adionar cronometro do cabeçalho

window.onload = () =>{
    const playerGame = localStorage.getItem('player') //recuperar valor enviado ao localStorage no form de jogador
    spanPlayer.innerHTML = playerGame //texto do span player no cabeçalho é o nome do jogador
    loadGame() //carrega o jogo
    startTimer() //quando carregar a janela inicia o timer
} //quando a janela for carregada executar a func de carregamento do jogo e informações do jogador no localStorage

