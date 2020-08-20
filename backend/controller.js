var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./serverdb.db');

const uuidGen = require('uuid/v4');
const md5 = require('md5');
const bcrypt = require('../bcrypt');

function verify(recievedHash, rawPassword){



}

exports.home = (req,res) => {

	console.log("GET request for /CC/ \n");

	res.send("<body>CC B-check</body>");
};

exports.ccDorms = (req,res) => {

  console.log("GET request for /CC/dorms \n");

  db.run('CREATE TABLE IF NOT EXISTS cc_dorms (dorm_name TEXT UNIQUE NOT NULL);');
  db.all('SELECT dorm_name FROM cc_dorms', [], (err,row) => {
    var data = [];
    if(err){
      res.send(err);
    }else{
      row.forEach((i) => {
        data.push({"name" : i.dorm_name});
      });
      res.json(data);
    }
  });
};

exports.dormBathrooms = (req,res) => {
  console.log("GET request for /CC/{dorm} \n");

  var dorm = req.params.dorm;
  // var hash = req.query.hash;

  db.all("SELECT bathroom_name, bathroom_status FROM " + dorm, [], (err,row) =>{
    var data = [];
    if(err){
      console.log("Err:" + err)
      res.send("Err: " + err);
    }else{
      row.forEach((i) => {
        data.push({"name" : i.bathroom_name,
                  "status" : i.bathroom_status});
      });
      res.json(data);
    }
  });
};

exports.addDorm = (req,res) => {

  console.log("POST request for /CC/{dorm} for new dorm \n");

  db.run('CREATE TABLE IF NOT EXISTS cc_dorms (dorm_name TEXT UNIQUE NOT NULL);');

  if(req.body !== {}){

    var dorm_name = req.body.name;

    db.serialize(() => {
      db.run("INSERT INTO cc_dorms(dorm_name) VALUES(?)", [dorm_name], (err) => {
        if(err){
          res.send("Err: " + err);
        }else{
          res.send("Dorm Added \n");
        }
      });
    });
  }else{
    res.send("Err: no url encoded body");
  };
};

exports.addBathrooms = (req,res) => {

  console.log('POST request to /CC/{dorm} for new bathroom \n');

  var dorm = req.params.dorm;
  // var hash = req.query.hash;

  db.run('CREATE TABLE IF NOT EXISTS ' + dorm + '(bathroom_name TEXT UNIQUE NOT NULL, bathroom_status INTEGER NOT NULL);')

  if(req.body !== {}){
    db.serialize(() => {
      db.run("INSERT INTO " + dorm + "(bathroom_name,bathroom_status) VALUES(?,?)", [req.body.name, 1], (err) => {
        if(err){
          res.send("Err: " + err);
        }else{
          res.send("Bathroom Added");
        }
      });
    });
  }
}

exports.setStatus = (req,res) => {
  console.log('POST request to change status \n');

  var dorm = req.params.dorm;
  var bathroom = req.params.bathroom;

  // var hash = req.query.hash;

  // db.get("SELECT password pass FROM passwords WHERE level = 1", (err, ))

  db.run("UPDATE " + dorm + " SET bathroom_status = ABS(bathroom_status - 1) WHERE bathroom_name = '" + bathroom + "'", (err) => {
    if(err){
      res.send("Err: " + err);
    }else{
      res.send("Status Updated");
    }
  });
}
