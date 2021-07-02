const models = require("../models/index");
const Curso = models.Curso;

async function index(req, res){
    const cursos = await Curso.findAll();
    res.render("curso/index",{
        cursos: cursos.map(curso=>curso.toJSON()),
        titulo: "Cursos",
    });

}

async function create(req, res){
    if(req.route.methods.get){
        res.render("curso/create", { 
            titulo: "Adicionar Curso",
        });
    }
    else{
        await Curso.create({
            sigla: req.body.sigla,
            nome: req.body.nome,
            descricao: req.body.descricao,
            areaId: req.body.area,
        });
        res.redirect("/curso");
    }
}

async function read(req, res){
    const curso = await Curso.findOne({ where: {id: req.params.id}, include: models.Area});
    res.render("curso/read",{ 
        titulo: "Curso",
        curso: curso.toJSON(),
    });
}

async function update(req, res){
    const curso = await Curso.findOne({ where: {id: req.params.id}});
    if(req.route.methods.get){
        res.render("curso/update",{
            titulo: "Editar curso",
            curso: curso.toJSON(),
        });
    }
    else{
        try{
            await Curso.update({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.areaId,
            }, {where: {id:req.params.id}});
            res.redirect("/curso/"+req.params.id);
        }
        catch(errors){
            res.render("curso/update",{
                titulo: "Editar curso",
                curso: req.body,
                errors: errors
            });
        }
    }
    
}

async function remove(req, res){
    const curso = await Curso.findOne({where: {id:req.params.id}});
    await curso.destroy();
    res.redirect("/curso/");
}

module.exports = { index, create, read, update, remove};