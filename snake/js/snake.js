(function () {

    const TAM = 40;
    const FPS = 5;
    let board;
    let snake;
    let placar;
    let alimento;
    
    function init() {
        placar = new Placar();
        board = new Board();
        snake = new Snake();
        alimento = new Alimento();

        //esperando para iniciar
        window.addEventListener("keydown", function(e){
            if(e.key==='s'){
                window.setInterval(run, 300/FPS);
                window.setInterval(verificaAlimento, 300/FPS);
            }
            else{
                
            }
        });
    }

    window.addEventListener("keydown", function(e) {
        switch(e.key) {            
            case "ArrowUp":
                if(snake.direcao!==2){
                    snake.mudarDirecao(0);
                }
                break;
            case "ArrowRight":
                if(snake.direcao!==3){
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

    class Alimento{
        constructor(){
            //Preciso de uma posição diferente das que são ocupadas pela snake
            let posicao= snake.getPosLivre();
            this.local = [posicao];
            this.cor = "#111111";
            this.local.forEach(campo => document.querySelector(`#board tr:nth-child(${campo[0]}) td:nth-child(${campo[1]})`).style.backgroundColor = this.cor);            
        }
    }

    class Placar{
        constructor(){
            this.pontos=0;
            // Buscar elemento pai
            var elemento_pai = document.body;

            // Criar elemento
            var placarPontos = document.createElement('h1');
            placarPontos.setAttribute('id','pontuacao');

            // Criar o nó de texto
            var texto = document.createTextNode(this.pontos);

            // Anexar o nó de texto ao elemento h1
            placarPontos.appendChild(texto);

            // Agora sim, inserir (anexar) o elemento filho (placarPontos) ao elemento pai (body)
            elemento_pai.appendChild(placarPontos);
        }
    }

    class Board {
        constructor() {
            this.element = document.createElement("table");
            this.element.setAttribute('id','board');
            this.cor = "#EEEEEE";
            for (let i = 0; i < TAM; i++) {
                let row = document.createElement("tr");
                for (let j = 0; j < TAM; j++) {
                    let campo = document.createElement("td");
                    row.appendChild(campo);
                }
                this.element.appendChild(row);
            }
            document.body.appendChild(this.element);
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
                x=Math.floor(Math.random() * TAM + 1);
                y=Math.floor(Math.random() * TAM + 1);
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

    function verificaAlimento(){
        //cabeça é o último elemento
        let cabeca = snake.corpo[snake.corpo.length-1];

        if(cabeca[0] == alimento.local[0][0] && cabeca[1] == alimento.local[0][1]){
            placar.pontos = placar.pontos+1;
            console.log(placar.pontos);

            document.getElementById("pontuacao").innerHTML = placar.pontos;
            //Aumentar tamanho
            //Vou adicionar no incio da lista para a snake crescer para a cauda
            let cauda = snake.corpo[0];
            //console.log('cauda' + cauda)
            snake.corpo.unshift([cauda[0]+1,[1]+1]);

            alimento=new Alimento();
        }
    }

    function run () {
        snake.andar();
    }

    init();

})();



