(function () {

    const TAM = 40;
    const FPS = 5;

    //objetos do jogo e utilitários
    let VEL = 500;
    let frames=0;
    let board;
    let snake;
    let placar;
    let alimento;
    
    //controladores das funções do jogo
    let pausar=false;
    let perdeu=false;
    let comecou=false; //pra não executar duas vezes a inicializacao

    //controladores das funções
    let gameover;
    let comendo;
    let andando;
    let velocidade;
    
    function init() {
        placar = new Placar();
        board = new Board();
        snake = new Snake();
        alimento = new Alimento();
    }

    //Chama as funções novamente colocando com a nova velocidade
    function changeSpeed(){
        gameover = window.setInterval(gameOver, 100/FPS);
        andando = window.setInterval(run, VEL/FPS);
        comendo = window.setInterval(verificaAlimento, VEL/FPS);
        velocidade = window.setInterval(verificaVel, VEL/FPS);
    }

    //Reinicia o intervalo das funções executadas
    function finaliza(){
        clearInterval(gameover);
        clearInterval(andando);
        clearInterval(comendo);
        clearInterval(velocidade);
    }

    //Verifica o fim de jogo
    //Teste se a cabeça bateu fora do campo ou no próprio corpo
    function gameOver(){
        //verificar se a cabeça bateu em uma parte do corpo ou fora da tabela
        let cabeca = snake.corpo[snake.corpo.length-1];

        if(cabeca[0] >=41 || cabeca[1] >=41 || cabeca[0] <=0 || cabeca[1]<=0){
            perdeu=true;
            console.log('perdeu saindo do campo');
            document.getElementById("GameStatus").innerHTML = ('Fim de Jogo! Você saiu do campo.');
            finaliza();
            return;
        }

        for (let j = 0; j < snake.corpo.length-1; j++) {
            if(cabeca[0] === snake.corpo[j][0] && cabeca[1] === snake.corpo[j][1] ){
                finaliza();
                console.log('perdeu batendo no corpo');
                document.getElementById("GameStatus").innerHTML = ('Fim de Jogo! Você bateu no corpo.');   
                perdeu=true;
            }
        }        
    }

    //Inicia o jogo
    function comeca(){
        if(!perdeu){
            comecou=true;
            gameover = window.setInterval(gameOver, 100/FPS);
            andando = window.setInterval(run, VEL/FPS);
            comendo = window.setInterval(verificaAlimento, VEL/FPS);
            velocidade = window.setInterval(verificaVel, VEL/FPS);
        }
    }

    //Muda a velocidade do jogo
    function verificaVel(){
        if(frames%60==0){
            VEL=VEL-2;
            finaliza();
            changeSpeed();
            console.log('nova vel '+ VEL)
        }
    }

    //Verifica se apertou a tecla S para começar ou reiniciar o jogo
    //Atualizo o html quaso seja necessário reinicia
    window.addEventListener("keydown", function(e){
        if(e.key==='s' || e.key==='S'){
            if(!perdeu && !comecou){
                comeca();
            }
            else if(perdeu && comecou){
                window.location.reload();
            }
        }
    });


    //Realiza a movimentação da snake impedindo movimentos de 180°
    window.addEventListener("keydown", function(e) {
        switch(e.key) {            
            case "ArrowUp":
                if(snake.direcao!==2){ //baixo
                    snake.mudarDirecao(0);
                }
                break;
            case "ArrowRight":
                if(snake.direcao!==3){ //esquerda
                    snake.mudarDirecao(1);
                }
                break;
            case "ArrowDown":
                if(snake.direcao!==0){
                    snake.mudarDirecao(2);
                }
                break;              
            case "ArrowLeft":
                if(snake.direcao!==1){
                    snake.mudarDirecao(3);
                }
                break;                  
        }
    });

    //Pausa o game
    function pause(){
        console.log('hora de parar')
        if(!pausar){
            pausar=true;
        }
        else if(pausar){
            pausar=false;
        }
    }

    //Verifica se a tecla P foi pressionada para pausar o jogo
    window.addEventListener('keydown', function(e){
        if(e.key==='p' || e.key==='P'){
            pause();
        }
    });

    //Alimentos da snake
    class Alimento{
        constructor(){
            //Preciso de uma posição diferente das que são ocupadas pela snake
            let posicao= snake.getPosLivre();
            this.local = posicao; 
            this.cor = this.sorteiaCor();
            document.querySelector(`#board tr:nth-child(${this.local[0]}) td:nth-child(${this.local[1]})`).style.backgroundColor = this.cor;
            if(this.cor==='#111111'){
                this.valor=1;
            }
            else{
                this.valor=2;
            }
        }

        //Escolhe aleatóriamente a cor da snake
        sorteiaCor(){
            //preto tendo o dobro de posições do verm. ele tem 2x mais chances de ser escolhido
            let coresAlimento=["#111111","#ff0000","#111111"];
            const random = (min, max) =>Math.floor(Math.random() * (max-min) +min);
            return coresAlimento[random(0,3)];
        }
        defineCor(){
            let possibilidades =["#111111","#ff0000"];
            let probabilidades = [0.66, 0.34];
    
            let total = 0;
            const random = (min, max) => Math.floor(Math.random() * (max-min) +min);
            let chanceSorteada = random(0,2) ;
    
            for (let j = 0; j < possibilidades.length; j++) {
                total += probabilidades[j];
                
                console.log(chanceSorteada);
                console.log(total);
    
                if (chanceSorteada <= total) {
                    console.log(possibilidades[j]);
                    return possibilidades[j];
                    break;
                }
            }
            
        }

    }

    //Cria a pontuação do jogo e a mensagem de game over
    class Placar{
        constructor(){
            this.pontos=0;

            // Buscar elemento pai
            var elemento_pai = document.getElementById("meio");

            // Criar elemento
            var placarPontos = document.createElement('h2');
            placarPontos.setAttribute('id','pontuacao');

            // Criar o nó de texto
            var texto = document.createTextNode("Pontuação: "+this.pontos.toLocaleString('en', {minimumIntegerDigits:5,useGrouping:false}));

            // Anexar o nó de texto ao elemento h1
            placarPontos.appendChild(texto);

            // Agora sim, inserir (anexar) o elemento filho (placarPontos) ao elemento pai (body)
            elemento_pai.appendChild(placarPontos);

            
            var elemento_pai = document.getElementById("meio");
            var gameStatus = document.createElement('h3');
            gameStatus.setAttribute('id','GameStatus');
            var texto = document.createTextNode('');
            gameStatus.appendChild(texto);
            elemento_pai.appendChild(gameStatus);
        }
    }

    //Tabela para a snake caminhar
    class Board {
        constructor() {
            this.element = document.createElement("table");
            this.element.setAttribute('id','board');
            this.cor = "#fff";
            for (let i = 0; i < TAM; i++) {
                let row = document.createElement("tr");
                for (let j = 0; j < TAM; j++) {
                    let campo = document.createElement("td");
                    row.appendChild(campo);
                }
                this.element.appendChild(row);
            }
            var elemento_pai = document.getElementById("meio");
            elemento_pai.appendChild(this.element);
        }
    }

    class Snake {
        constructor() {
            this.corpo = [[4,5],[4,6],[4,7],];
            this.cor = "#111111";
            this.direcao = 1; // 0:pracima; 1:pradireita; 2:prabaixo; 3:praesquerda
            this.corpo.forEach(campo => document.querySelector(`#board tr:nth-child(${campo[0]}) td:nth-child(${campo[1]})`).style.backgroundColor = this.cor);
        }

        andar() {
            frames=frames+5;
            let head = this.corpo[this.corpo.length-1];
            let add;
            switch(this.direcao) {
                case 0:
                    add = [head[0]-1,head[1]];
                   break;
                case 1:
                    add = [head[0],head[1]+1];
                    break;
                case 2:
                    add = [head[0]+1,head[1]];
                    break;  
                case 3:
                    add = [head[0],head[1]-1];
                    break;                                                            
            }
            this.corpo.push(add);
            document.querySelector(`#board tr:nth-child(${add[0]}) td:nth-child(${add[1]})`).style.backgroundColor = this.cor;
            let rem = this.corpo.shift();
            document.querySelector(`#board tr:nth-child(${rem[0]}) td:nth-child(${rem[1]})`).style.backgroundColor = board.cor;
        }

        mudarDirecao(direcao) {
            this.direcao = direcao;
        }

        //Gerar um x e um y que não seja ocupado pela snake
        getPosLivre(){
            let x=4;
            let y=5;
            let ocupado=true;
                
            while(ocupado){
                x=Math.floor(Math.random() * TAM + 1); //4
                y=Math.floor(Math.random() * TAM + 1); //6
                for (var i = 0; i < snake.corpo.length; i++) {
                    if(x===snake.corpo[i][0] && y===snake.corpo[i][1]){
                        console.log('posicao invalida foi: '+x,y);
                        break;
                    }
                }
                if(i>=snake.corpo.length){
                    console.log('posicao valida foi: '+x,y)
                    ocupado=false;
                }
            }
            return [x,y];
        }
    }

    //Faz a verificação constante se a snake consumiu o alimento
    function verificaAlimento(){
        //cabeça é o último elemento
        let cabeca = snake.corpo[snake.corpo.length-1];//[5,6]  [5,6]

        if(cabeca[0] == alimento.local[0] && cabeca[1] == alimento.local[1]){

            console.log('marcou: '+alimento.valor);
            placar.pontos = placar.pontos+alimento.valor;

            document.getElementById("pontuacao").innerHTML = "Pontuação: "+ placar.pontos.toLocaleString('en', {minimumIntegerDigits:5,useGrouping:false});

            //Aumentar tamanho
            //Vou adicionar no incio da lista para a snake crescer para a cauda
            let cauda = snake.corpo[0];
            //console.log('cauda' + cauda)
            snake.corpo.unshift([cauda[0]+1,[1]+1]);

            alimento=new Alimento();
        }
    }

    //Faz a snake andar se o jogo não estiver pausado e não tiver perdido
    function run () {
        if(!pausar && !perdeu){
            snake.andar();
        }
    }

    init();

})();