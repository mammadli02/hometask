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
const PEOPLES = [
    {
      id: 1,
      name: "Tyler the Creator",
      imageURL:
        "https://i.scdn.co/image/ab676161000051748278b782cbb5a3963db88ada",
      age: 70,
    },
    {
      id: 2,
      name: "Kanye West",
      imageURL:
        "https://www.thenews.com.pk/assets/uploads/updates/2023-05-15/1070367_8385471_Untitled-1_updates.jpg",
      age: 45,
    },
  ];

  const PeopleSchema = new mongoose.Schema({
    name:String,
    age:Number,
    imageURL:String
  });
  const MyModel = mongoose.model('ModelPeople',PeopleSchema);

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
    const { name, age, imageURL } = req.body;
    const newPeoples = new MyModel({
      name: name,
      imageURL: imageURL,
      age: age,
    });
   await  newPeoples.save()
    res.status(201).send("created");
  });

//put
app.put("/api/peoples/:id",async (req, res) => {
    const id = req.params.id;
    const { name, age, imageURL } = req.body;
    const existedPeoples =await MyModel.findByIdAndUpdate(id,{name:name, age:age, imageURL:imageURL})
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