const {Pool} = require("pg");
const settings = require("./settings"); // settings.json

const pool = new Pool(settings);

var input = process.argv[2]

pool.connect((err, client, done) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name=$1 OR first_name=$1", [input], (err, result) => {
    done();
    if (err) {
      return console.error("error running query", err);
    }
    //console.log(result.rows);
    var final = result.rows
    var count = (result.rows).length
    final.forEach(function(element) {
      console.log("found " + count + " person by the name of " + element.first_name + " " + element.last_name)
      console.log(element.id+": " + element.first_name + " " + element.last_name + ", " + "born '" + element.birthdate + "'");
    })
  //  console.log(result)

  });
});

// console.log(client.connect(input))
//WHERE ARGV[2[]