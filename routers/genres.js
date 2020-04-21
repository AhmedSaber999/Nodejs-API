const express = require('express') ; 
const router = express.Router() ; 
const Joi = require('joi');
const mongoose = require('mongoose') ;

mongoose.connect('mongodb://localhost/geners')
.then(()=> console.log('connected to mongoDB...'))
.catch(err => console.error(err)) ;



const genersSchema = new mongoose.Schema({
    id: Number,
    name: String,
    auther: String,
    is_published : {type : Boolean, default : false } 
 });
 const Gener = mongoose.model('gener',genersSchema) ;

 var genres = [
   {id : 1, name : "test1", auther : "Ahmed saber" }
 ];

 async function get_geners()
 {
    const genrs = await Gener.find( ) ; 
    return genrs ;
 }
 async function add_gener(req)
 { 
    const gener = new Gener({
      id: req.id,
      name: req.name,
      auther: req.auther,
    });
    gener.save() ;
 }
 

router.get('/', (req, res) => {
    //console.log("jkdsjknhjdsk");
    res.send(get_geners());
});
  
router.post('/', (req, res) => {
      const { error } = validateGenre(req.body); 
      if (error) return res.status(400).send(error.details[0].message);

      const genre = {
        name: req.body.name
      };
      //genres.push(genre);
      add_gener(req) ;
      res.send(genre);
});
  
router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name; 
    res.send(genre);
});
  
router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
});
  
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});
  
function validateGenre(genre) {
    const schema = {
    name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
}
  module.exports = router ; 