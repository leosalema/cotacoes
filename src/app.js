const path = require('path');
const express = require('express');
const hbs = require('hbs');
const {cotacao} = require('./utils/contacoes');
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello World HBS!!!',
        author: 'Leonardo Salema'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Hi I am a about page',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hi I am a help page'
    })
})

app.get('/cotacoes', (req, res) => {
    if (!req.query.ativo) {
        const error = {
            message: 'O ativo deve ser informado'
        }
        return res.status(400).json(error);
    }
    
    const symbol = req.query.ativo.toUpperCase()

    cotacao(symbol, (err, body) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(200).json(body);
    })
})
 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Não existe página depois do /help !',
        author: 'Leonardo Salema'
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'Leonardo Salema'
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Running in port' + port));