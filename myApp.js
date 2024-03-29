require('dotenv').config();

let mongoose = require('mongoose')
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection
conn.on('connected', function(){
console.log("mongodb启动成功")
})
// Manejador de eventos para errores de conexión
conn.on('error', function(err) {
  console.error("Error de conexión a MongoDB:", err);
});

// Manejador de eventos cuando la conexión se cierra
conn.on('disconnected', function() {
  console.log("La conexión a MongoDB se ha cerrado");
});

// Manejador de eventos cuando la aplicación se cierra (puedes usar esto para cerrar la conexión antes de salir)
process.on('SIGINT', function() {
  conn.close(function() {
    console.log("Desconexión de la base de datos debido a la terminación de la aplicación");
    process.exit(0);
  });
});


const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
  // You can add more fields, validators, and default values here if needed
});

let Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  let newPerson = new Person({ name: "Yeray", age: 20, favoriteFoods: ["egg", "queso"] })
  newPerson.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */

var createManyPeople = function(done) {
  var arrayOfPeople = [
    {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
    {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
    {name: "Robert", age: 78, favoriteFoods: ["wine"]}
  ];

  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
