function calcula(){
    var raio = document.myForm.raio.value;
    document.getElementById("area").value = Math.PI*(raio*raio);
    document.getElementById("circ").value = 2*Math.PI*raio;
}