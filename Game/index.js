const express = require("express");
const morgan = require("morgan");
const router = require("./routes/router");
const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars({
    helpers: require(`${__dirname}/app/views/helpers`),
}));

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

app.use(morgan("combined"));

app.use("/img", express.static(`${__dirname}/public/img`));

app.use("/css", express.static(`${__dirname}/public/css`));

app.use("/js", express.static(`${__dirname}/public/js`));

app.use(router);

app.listen(3000, function(){
    console.log("express iniciado na 3000");
})