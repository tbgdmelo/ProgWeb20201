(function () {
    class IntegerSet{
        constructor(tamanho){
            this.valores= Array(tamanho);
            for (var i = 0; i < this.valores.length; i++) {
                this.valores[i]=false;
            }
        }

        insere(valor){
            if(valor<this.valores.length)
                this.valores[valor]=true;
        }

        exclui(valor){
            if(valor<this.valores.length)
                this.valores[valor]=false;
        }

        uniao(conj1, conj2){
            if(conj1.valores.length> conj2.valores.length){
                var uniao = Array(conj1.valores.length);
            }
            else{
                var uniao = Array(conj2.valores.length);
            }
            for(var i=0; i<uniao.length;i++){
                if(conj1.valores[i] || conj2.valores[i]){
                    uniao[i]=true;
                }
                else{
                    uniao[i]=false;
                }
            }
            //console.log(uniao);
            return uniao;
        }

        intersecao(conj1, conj2){
            var intersec=[];
            if(conj1.valores.length> conj2.valores.length){
                var intersec = Array(conj1.valores.length);
            }
            else{
                var intersec = Array(conj2.valores.length);
            }
            for(var i=0; i<intersec.length;i++){
                if(conj1.valores[i] && conj2.valores[i]){
                    intersec[i]=true;
                }
                else{
                    intersec[i]=false;
                }
            }
            //console.log(intersec);
            return intersec;
        }

        diferenca(conj1, conj2){
            var dif=[];
            if(conj1.valores.length> conj2.valores.length){
                var dif = Array(conj1.valores.length);
            }
            else{
                var dif = Array(conj2.valores.length);
            }
            for(var i=0; i<dif.length;i++){
                if(conj1.valores[i] && !conj2.valores[i]){
                    dif[i]=true;
                }
                else{
                    dif[i]=false;
                }
            }
            //console.log(dif);
            return dif;
        }

        converte(conj){
            var conv= Array (conj.valores.length);
            for(var i =0; i<conv.length;i++){
                conv[i]=conj.valores[i].toString();
            }
            return conv;
        }
    }

    let val=new IntegerSet(3);
    val.insere(0);
    val.insere(1);
    //val.insere(2);
    console.log('Conjunto 1: '+val.valores);

    let val2=new IntegerSet(5);
    val2.insere(0);
    val2.insere(1)
    val2.insere(4);
    console.log('Conjunto 2: '+val2.valores);

    val2.exclui(1);

    console.log('Conjunto 2 com remoção do nº 1: '+val2.valores);

    let valU = val.uniao(val,val2);
    console.log('Conjunto União: '+valU);

    let valI = val.intersecao(val,val2);
    console.log('Conjunto Interseção: '+valI);

    let valD = val.diferenca(val, val2);
    console.log('Diferença de conjuntos: '+ valD);

    let valS = val.converte(val);
    console.log('Conj1 convertido em String: '+valS);
})();