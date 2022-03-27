const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB', {
    useNewUrlParser: true
  });

  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "name is must to identify"]
    },
    rating: {
      type: Number,
      min: [1],
      max: [10]
    },
    review: String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);

//  await Fruit.deleteOne({name : "Mango"});

  // await Fruit.updateOne({_id : "61cd907e57d51deaf1d94874" }, {review : "Looks great with that crown."}, function(err){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log("successfully updated");
  //   }
  // });

  // const fruit = new Fruit({
  //   name : "Apple",
  //   rating : 9,
  //   review : "An apple a day keeps the doctor away."
  // });

  const mango = new Fruit({
    name: "Mango",
    rating: 10,
    review: "King of fruits."
  });

  //await mango.save();

  // await Fruit.insertMany([pineapple], function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("success");
  //   }
  // });

  // fruit.save(function(err){
  //   if(err){
  //      console.log(err);
  //    }
  //    else{
  //      console.log("success");
  //    }
  // });

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit : fruitSchema
  });

  const Person = mongoose.model("Person", personSchema);

  // const person = new Person({
  //   name: "John",
  //   age: 37
  // });

  await Person.updateOne({name : "John" }, {favouriteFruit : Fruit.findOne({name : "Kiwi"})[0] }, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("successfully updated");
    }
  });

  //person.save();

  // const kiwi = new Fruit({
  //   name : "Kiwi",
  //   rating : 7,
  //   review : "Kinda sour."
  // });
  //
  // const orange = new Fruit({
  //   name : "Orange",
  //   rating : 10,
  //   review : "Soury sweet."
  // });
  //
  // const banana = new Fruit({
  //   name : "Banana",
  //   rating : 10,
  //   review : "Great for my sweet tooth."
  // });
  //
  // const dragon = new Fruit({
  //   name : "Dragon Fruit",
  //   rating : 3,
  //   review : "Wierd taste."
  // });

  //
  // Fruit.insertMany([orange, banana,dragon], function(err){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log("success");
  //   }
  // });

  Fruit.find(function(err, fruits) {
    if (err) {
      return handleError(err);
    } else {
      mongoose.connection.close();
      fruits.forEach(function(fruit) {
        console.log(fruit.name);
      });

    }
  });

}
