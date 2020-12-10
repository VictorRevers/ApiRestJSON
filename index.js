const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
    games:[
        {
            id: 23,
            title: "GTA V",
            year: 2013,
            price: 60
        },
        {
            id: 65,
            title: "Pokemon",
            year: 2007,
            price: 15
        },
        {
            id: 2,
            title: "FIFA 21",
            year: 2021,
            price: 350
        },
    ]
}

app.get('/games', (req, res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get('/game/:id', (req, res)=>{
    
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post('/game', (req, res)=>{
  var {title, price, year} = req.body;

  if(title == undefined || price == undefined || year == undefined){
      res.sendStatus(406);
  }else{
     DB.games.push({
         id: 30,
         title,
         year,
         price
     });
     res.sendStatus(200); 
  }
});

app.delete('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }    
});

app.put('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

            var {title, price, year} = req.body;

            if(title != undefined){
                 game.title = title;
            }

            if(price != undefined){

                if(isNaN(price)){
                    res.sendStatus(400);
                }else{
                    game.price = price;
                   
                }
            }

            if(year != undefined){
                if(isNaN(year)){
                    res.sendStatus(400);
                }else{
                    game.year = year;
                } 
            }

            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }
});


app.listen(5000, ()=>{
    console.log("API Rodando!");
});
