const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

//declaring genere object

let genres = [
    {id: 1, genre:'horror'},
    {id: 2, genre:'romantic'},
    {id: 3, genre:'comedy'}
];

//Get request
app.get('/api/genres',(req,res)=>{
    if(genres){
        res.send(genres);
    }else{
        res.status(404).send('No Genre available');
    }
});

function validateGenre(gen){
    const schema = Joi.object({
        genre: Joi.string().min(1).required()
    });
    const res = schema.validate(gen);
    return res;
}
//Post request
app.post('/api/genres/:id',(req,res)=>{
    const g = genres.find(gen => gen.id == parseInt(req.params.id));
    if(!g){
        const result = validateGenre(req.body);
        if(result.error){
            res.send(result.error.details[0].message);
        }else{
            const item = {
                id: genres.length +1,
                genre: req.body.genre
            }
            genres.push(item);
            res.send(item);
        }
    }else{
        res.status(404).send('Genre already exist');
    }
});

//PUT request - To update a genre
app.put('/api/genres/:id',(req,res)=>{
    const g = genres.find(g => g.id == parseInt(req.params.id));
    if(!g){
        res.status(404).send('Id not found');
    }else{
        const result = validateGenre(req.body);
        if(result.error){
            res.status(404).send(result.error.details[0].message);
        }else{
            
            g.genre = req.body.genre;
           res.send(g);
        }
    }
});

app.delete('/api/genres/:id',(req,res)=>{
    const g = genres.find(g => g.id == parseInt(req.params.id));
    if(!g){
        res.status(404).send('Id not found to delete');
    }else{
        const index = genres.indexOf(g);
        genres.splice(index,1);
        res.send(g);
    }

});

const port = process.env.port || 3000
app.listen(port, ()=>{ console.log('Listening to port 3000');});


