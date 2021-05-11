(function () {
    let x=1;
    while (x<11){
        document.write("<table border='1'>");
        document.write("<tbody><tr><th colspan='2'>Produto de "+x+"</th><tr>");
        document.write("<tr>");
        let y=1;
        while(y<11){
            document.write("<td>"+x+"x"+y+"</td>");
            document.write("<td>"+(x*y)+"</td>");
            document.write("</tr>");
            y++;
        }
        x++;
    }
})();