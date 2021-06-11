const counter = function (valor){
    return{
        incrementar: function(){
            valor+=1
            return valor;
        }
    }
}

const newCounter= counter(1);

console.log('Primeira: '+ newCounter.incrementar());
console.log('Segunda: '+ newCounter.incrementar());
console.log('Terceira: '+ newCounter.incrementar());