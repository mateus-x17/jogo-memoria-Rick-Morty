//cpaturar o botão pra verificra se ha um texto dentro dele 
//depois habilitar se houver

const input = document.querySelector('.login-input')
const button = document.querySelector('.button')

// evento para ao digitar realizar uma função para habilitra o botão
//parametro evento é responsavel por capturar o que foi inserido no input usando o .target e .value
input.addEventListener('input', (evento)=>{
    if (evento.target.value.length > 2){
        button.removeAttribute('disabled')
        //se o tamanho do texto do input for >2 remove o atributo disabled no html e habilita o botão de login
    } else{
        button.setAttribute('disabled', '')
        //se o valor do input for menor que 3 habilita novamente o disable no html
    }
})

//redireciona a pessoa para outra pagina ao enviar o formulario
// ao enviar dados o pad~rao é recarregar a pagina, não salvando os dados ou exibindos no console se for pedido. para evitar acessamos o objeto de submissão da pagina e aplicamos o metodo ".preventDefault()" que evita esse recarreamento sem salvar.
const form = document.querySelector('.login-form')
form.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    console.log("Logando..." + input.value)
    //queremos salvar o que foi enviado no forumalrio no navegador, para isso usmaos tecnicas de localStorage
    // localStorage - metodo que acessa o localStorage
    //.setItem() - metodo que envia um valor/item para o localStorage do navegador como forma de um objeto. aceita dois parametros: 1°chave do valor enviado, 2°valor enviado
    localStorage.setItem('player', input.value) //input salvo no local storage como player

    //redirecionar o usuario para a pagina do jogo
    window.location = 'pages/game.html'
})