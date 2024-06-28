//array que vai receber os nomes dos amigos
let amigos = [];
let sorteios = [];

//remover um amigo da lista pelo índice
function removerAmigo(index){
    amigos.splice(index, 1);
    listarAmigos(amigos);
}

//função que imprime a lista de amigos no espaço de amigos incluídos
function listarAmigos(amigos){
    let elementoDaLista = document.getElementById('lista-amigos'); //tag p
    elementoDaLista.innerHTML = ''; //limpando o conteúdo dentro da tag p

    amigos.forEach((amigo, index) => { //para cada amigo na lista de amigos
        let p = document.createElement('p'); //crio uma tag p e armazeno na variável p
        p.textContent = amigo; //a tag p recém-criada recebe o amigo da iteração atual

        p.addEventListener('click', function(){
            removerAmigo(index); //adicionando evento de clique para remover amigo
        });
        elementoDaLista.appendChild(p); //a tag p com o conteúdo do novo amigo entra na lista de amigos incluídos
    })
}

//adicionando os amigos na lista de amigos e limpa o campo depois de adicionar
function adicionar(){
    let campoNomeAmigo = document.getElementById('nome-amigo');

    //validações
    if(amigos.includes(campoNomeAmigo.value)){
        alert('O nome já foi incluído. Preencha um nome diferente.');
        campoNomeAmigo.value = '';
        return;
    }
    if(campoNomeAmigo.value == ''){
        alert('O nome não pode ser vazio. Por favor, preencha um nome.');
        return;
    }

    //salvando o nome na lista de amigos e limpando o campo de digitação do nome
    amigos.push(campoNomeAmigo.value);
    campoNomeAmigo.value = '';
    
    //listar os amigos adicionados no amigo secreto
    listarAmigos(amigos);
}

//sorteia o amigo secreto
function sortearAmigo(amigo, amigosSorteados){
    let amigoSorteado;
    //o laço do...while executa uma vez antes de testar a condição e permanece executando enquanto a condição while for verdadeira
    do{
        //amigoSorteado recebe um item da lista amigosSorteados na posição aleatória gerada pelo código ....
        amigoSorteado = amigosSorteados[Math.floor(Math.random() * amigosSorteados.length)];
    }
    //o laço se repete se o amigo for igual ao amigoSorteado, garantindo que o amigo não sorteie a si mesmo
    while(amigoSorteado === amigo);

    //retorna o amigoSorteado
    return amigoSorteado;
}

//função que sorteia os amigos
function sortear(){
    //validação
    if(amigos.length < 4){
        alert('O sorteio não pode ser feito com menos de 4 amigos. Por favor, insira mais amigos.');
        return;
    }
    
    //criando uma cópia do array original
    let amigosSorteados = amigos.slice();

    //itera a lista de amigos para fazer o sorteio e tirar da lista os amigos já sorteados
    for(let i = 0; i < amigos.length; i++){
        let amigo = amigos[i];
        //sorteio é executado na função sortearAmigo
        let amigoSorteado = sortearAmigo(amigo, amigosSorteados);
        //a lista de sorteios regista o amigo e seu amigoSorteado
        sorteios.push(`${amigo} -> ${amigoSorteado}`);

        //a lista de amigosSorteados é recriada excluindo o amigo que acabou de ser sorteado
        amigosSorteados = amigosSorteados.filter(a => a !== amigoSorteado);
    }
    console.log(sorteios);

    //imprime em tela os sorteios na lista de sorteios
    let listaSorteios = document.getElementById('lista-sorteio');

    sorteios.forEach(function(sorteio) {
        let p = document.createElement('p');
        p.textContent = sorteio;
        listaSorteios.appendChild(p);
    });

    //desabilitando botões de adicionar e de sortear
    document.querySelector('.primary').disabled = true;
    document.querySelector('.secondary').disabled = true;
}

//reinicia o sorteio do amigo secreto, apagando os amigos incluídos e o resultado do sorteio
function reiniciar(){
    amigos = [];
    document.getElementById('lista-amigos').textContent = '';

    sorteios = [];
    document.getElementById('lista-sorteio').innerHTML = '';

    //reabilitando os botões de adicionar e de sortear
    document.querySelector('.primary').disabled = false;
    document.querySelector('.secondary').disabled = false;
}