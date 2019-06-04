img_count;
pal_count;
pal_tam;

//function para restaurar início de jogo
function telaPrincipal() {
    //limpando dica
    document.getElementById('p-txt').innerHTML =  `Pressione JOGAR <i class="fas fa-gamepad"></i>`

    //sumindo com os botões e inputs
    document.getElementById('jogar').style.display = 'inline';

    document.getElementById('letra').style.display = 'none';
    document.getElementById('chute').style.display = 'none';
    document.getElementById('inp-palavra').style.display = 'none';
    document.getElementById('btn-palavra').style.display = 'none';
    document.getElementById('desistir').style.display = 'none';

    //sumindo com a imagem do boneco
    document.getElementsByTagName('img')[0].style.display = 'none';
}


//function para montar tela do jogo 
function jogar() {
    //variáveis globais
    img_count = 1;
    pal_count = 0;
    al_tam = 0;

    //sorteando a palavra para o jogo
   let obj = _geraPalavras(Math.floor(Math.random() * 11));

    //inserindo imagem do boneco
    document.getElementsByTagName('img')[0].style.display = 'block';
    document.getElementsByTagName('img')[0].src = `../public/image/stc_${img_count++}.png`;

    //preparando os botões do jogo
    document.getElementById('jogar').style.display = 'none';

    document.getElementById('letra').style.display = 'inline';
    document.getElementById('chute').style.display = 'inline';
    document.getElementById('inp-palavra').style.display = 'inline';
    document.getElementById('btn-palavra').style.display = 'inline';
    document.getElementById('desistir').style.display = 'inline';

    //inserindo dica
    document.getElementById('p-txt').innerHTML = obj.dica;

    //criando caixinhas da palavra
    let str = '<form id="formJogo">';

    for (let i = 0; i < obj.palavra.length; i++) 
        str += `<button type="button" value="${obj.palavra[i]}"></button>`;

    str += '</form>'

    //inserindo as caixinhas na view
    document.getElementById('div-palavra').innerHTML = str;

    //armazenando os dados referentes a palavra sorteada
    pal_tam = pal_count = document.forms['formJogo'].length;
}

//function para verificar se acertou a letra
function chuteLetra() {
    let achou = false;

    //pegando letra digitada
    let letra = document.getElementById('letra').value.trim().toUpperCase();

    //limpando campo
    document.getElementById('letra').value = '';

    //se não digitou nada
    if(letra == '')
        return;

    for (let i = 0; pal_tam > 0 && i < pal_count; i++)
        if(document.forms['formJogo'][i].value == letra && document.forms['formJogo'][i].innerHTML == '') {
            document.forms['formJogo'][i].innerHTML = letra;
            achou = true;
            pal_tam--;
        }

    if(pal_tam == 0) {
        alert('Parabéns você ganhou');
        document.forms['formJogo'].style.display = 'none';
        telaPrincipal();
        return;
    }

    //errou a letra matando o bonequinho
    if(!achou)
        if(img_count != 7)
            document.getElementsByTagName('img')[0].src = `../public/image/stc_${img_count++}.png`;
        else {
            alert('Você morreu !!!');
            document.forms['formJogo'].style.display = 'none';
            telaPrincipal();
        }
}

function desistir() {
    document.forms['formJogo'].style.display = 'none';
    telaPrincipal();
}

//function que gera as palavras e as sorteia
function _geraPalavras(indice) {

    let vetPalavras = [
        {
            dica: 'É uma fruta',
            palavra: 'MORANGO',
        },
        {
            dica: 'É um carro',
            palavra: 'FERRARI',
        },
        {
            dica: 'É um time de futebol',
            palavra: 'CHAPECOENSE',
        },
        {
            dica: 'É um professor do senac',
            palavra: 'Valter',
        },
        {
            dica: 'É um dia da semana',
            palavra: 'DOMINGO',
        },
        {
            dica: 'É um super-herói',
            palavra: 'FLASH',
        },
        {
            dica: 'É uma cor',
            palavra: 'DOURADO',
        },
        {
            dica: 'É uma marca de celular',
            palavra: 'ASUS',
        },
        {
            dica: 'É um prato típico',
            palavra: 'FEIJOADA',
        },
        {
            dica: 'É um pais',
            palavra: 'AUSTRIA',
        },
    ]
    return vetPalavras[indice];
}