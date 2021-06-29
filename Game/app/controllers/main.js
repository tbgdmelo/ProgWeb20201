function index (req, res){
    res.render("main/index", { 
        titulo: "Página inicial",
    });
}
function sobre(req, res){
    res.render("main/about", { 
        titulo: "Página About",
    });
}

module.exports= { index, sobre }