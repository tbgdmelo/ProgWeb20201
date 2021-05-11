(function () {
    let jogador={
        pontuacao:0,
        continua:true
    }
    function avaliaJogada(jogada, maquina){
        if(maquina===1){
            console.log('O computador jogou Papel');
            if(jogada===maquina){
                console.log('A rodada Empatou');
                return;
            }
            if(jogada===2){
                jogador.continua=false;
                console.log('Você perdeu! A sua pontuação foi de '+jogador.pontuacao);
                return;
            }
            else{
                console.log('Você ganhou!');
                jogador.pontuacao=jogador.pontuacao+1;
                return;
            }
        }

        if(maquina===2){
            console.log('O computador jogou Pedra');
            if(jogada===maquina){
                console.log('A rodada Empatou');
                return;
            }
            if(jogada===3){
                jogador.continua=false;
                console.log('Você perdeu! A sua pontuação foi de '+jogador.pontuacao);
                return;
            }
            else{
                console.log('Você ganhou!');
                jogador.pontuacao=jogador.pontuacao+1;
                return;
            }
        }

        if(maquina===3){
            console.log('O computador jogou Tesoura');
            if(jogada===maquina){
                console.log('A rodada Empatou');
                return;
            }
            if(jogada===1){
                jogador.continua=false;
                console.log('Você perdeu! A sua pontuação foi de '+jogador.pontuacao);
                return;
            }
            else{
                console.log('Você ganhou!');
                jogador.pontuacao=jogador.pontuacao+1;
                return;
            }
        }

        
    }

    while(jogador.continua){
        console.log('Escolha sua jogada:');
        console.log('1 - Papel');
        console.log('2 - Pedra');
        console.log('3 - Tesoura');

        var opcao = parseInt(prompt());
        var computador = Math.floor(Math.random() * 3 + 1);
        
        if(opcao!==1 && opcao!==2 && opcao!==3){
            jogador.continua=false;
            console.log('Você perdeu! A sua pontuação foi de '+jogador.pontuacao);
        }
        else{
            avaliaJogada(opcao, computador);
        }
        
    }
})();