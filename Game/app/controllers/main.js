function index (req, res){
    res.render("main/index", { 
        titulo: "Página inicial",
    });
}
function sobre(req, res){
    res.render("main/about", { 
        titulo: "Sobre",
    });
}

function ui(req, res){
    res.render("main/ui", { 
        titulo: "Página Ui",
    });
}

function game(req, res){
    res.render("main/game", { 
        titulo: "Game",
    });
}

module.exports= { index, sobre, ui, game }