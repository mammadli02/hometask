const express = require('express')
const app = express()
// const PORT = 7070
var bodyParser = require('body-parser')
const cors=require('cors')
app.use(cors())
app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: false }));
// const crypto = require('crypto');
// let uuid=crypto.randomUUID()

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');


  const PeopleSchema = new mongoose.Schema({
    name:String,
    birthYaer:Number,
    Genre:String,
    ImageURL:String,
    isDead:Boolean,
    isMale :Boolean,
  });
  const MyModel = mongoose.model('authors',PeopleSchema);

  DB_PASSWORD=process.env.DB_PASSWORD
DB_CONNECTION=process.env.DB_CONNECTION
DB_CONNECTION=DB_CONNECTION.replace("<password>",DB_PASSWORD)
// console.log(DB_CONNECTION);
  mongoose.connect(DB_CONNECTION)
  .then(() => console.log('Connected!'));






app.get('/api', (req, res) => {
  res.send('Hello World!')
})
//GETALLL 
app.get("/api/peoples", async(req, res) => {
    const { name } = req.query;
    const peoples=await MyModel.find()
    if (name === undefined) {
      res.status(200).send({
        data: peoples,
        message: "data get success!",
      });
    } else {
      res.status(200).send({
        data: peoples.filter(
          (x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        ),
        message: "data get success!",
      });
    }
  });

//GETBYID
app.get("/api/peoples/:id", async(req, res) => {
    const id = req.params.id;

    const people = await MyModel.findById(id)
    // res.send(people)
    if (!people) {
      console.log("test");
      res.status(204).send("people not found!");
  
    } else {
      res.status(200).send({
        data: people,
        message: "data get success!",
      });
    
    }
  });

//DELeTE
app.delete("/api/peoples/:id", async(req, res) => {
    const id = req.params.id;
    const people = await MyModel.findByIdAndDelete(id)
    if (people === undefined) {
      res.status(404).send("people not found");
    } else {
    
      res.status(203).send({
        data: people,
        message: "people deleted successfully",
      });
    }
  });
  //post
app.post("/api/peoples",async(req, res) => {
    const { name, birthYaer, ImageURL,isDead, isMale,Genre } = req.body;
    const newPeoples = new MyModel({
      name: name,
      ImageURL: ImageURL,
      birthYaer:birthYaer,
      isDead:isDead,
      isMale:isMale,
      Genre:Genre
    });
   await  newPeoples.save()
    res.status(201).send("created");
  });

//put
app.put("/api/peoples/:id",async (req, res) => {
    const id = req.params.id;
    const { name, birthYaer, isDead,isMale,Genre, ImageURL } = req.body;
    const existedPeoples =await MyModel.findByIdAndUpdate(id,{name:name, birthYaer:birthYaer,isDead:isDead, isMale:isMale,Genre:Genre, ImageURL:ImageURL,})
    if (existedPeoples == undefined) {
      res.status(404).send("peoples not found!");
    } else {
      res.status(200).send(`people: ${existedPeoples.name}`);
    }
  });

  PORT  = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})