const express = require('express');
const app = express();
let http = require('http');
const PORT = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const sessions = require('express-session');
const mysql = require('mysql');
const fetch = require('node-fetch')

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('views', path.join(__dirname, 'views'));

//session middleware
app.use(sessions({
    secret: "pokesession-16581q26d51e6wce1wc6ew54c41w",
    saveUninitialized:true,
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'pokefan',
    user     : 'root',
    password : '',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

const initPokemonDB = () => {
    for (let index = 1; index < 151; index++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data.name, data.types[0].type.name, data.sprites.front_default )
            connection.query('INSERT INTO pokemon (nombre, tipo, imagen) VALUES (?) ', [[data.name, data.types[0].type.name, data.sprites.front_default]], function(error, results) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
            });
            //imagen, typo y nombre
        })
        .catch(err => console.log(err))        
    }

}

initPokemonDB()

app.get('/', (req, res) =>{
	res.render('index', {
        pantalla: 'HOME'
    })
});

app.get('/form', (req, res) =>{
	res.render('form', {
        pantalla: 'FORMULARIO'
    })
});

app.get('/pokedex', (req, res) =>{
	res.render('pokedex', {
        pantalla: 'POKÉDEX'
    })
});



/* app.get('/searchPokemon', (req, res) =>{
	const namePokemon = req.body.name;
}); */


app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () =>{
    console.log(`Servidor está trabajando en el Puerto ${PORT}`);
});

app.on('error', (err) =>{
    console.log(`Error en la ejecución del Servidor ${error}`);
})
