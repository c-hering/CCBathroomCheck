var sqlite3 = require('sqlite3').verbose()
const uuidGen = require('uuid/v4')
var db = new sqlite3.Database('./serverdb.db')


exports.home = (req,res) => {
	console.log("request for null link");
	res.send("<body>CC B-check</body>")
};

exports.ccDorms = (req,res) => {
  console.log("request for CC dorms");
  var results = [];
  db.run('CREATE TABLE IF NOT EXISTS cc_dorms (dorm_name TEXT UNIQUE NOT NULL);');
  db.all('SELECT dorm_name FROM cc_dorms', [], (err,row) => {
    var data = [];
    if(err){
      throw err;
    }
    row.forEach((i) => {
      data.push({"name" : i.dorm_name});
    });
    res.json(data);
  });
};

exports.dormBathrooms = (req,res) => {
  console.log("request for a dorm's bathrooms");
  var dorm = req.params.dorm;

  db.run('CREATE TABLE IF NOT EXISTS ' + dorm + '(bathroom_name TEXT UNIQUE NOT NULL, bathroom_status INTEGER NOT NULL);')
  db.all("SELECT (bathroom_name, bathroom_status) FROM " + dorm, [], (err,row) =>{
    var data = [];
    if(err){
      res.send("Err: " + err);
    }else{
      row.forEach((i) => {
        var status = false;
        if(i.bathroom_status == 1){
          status = true;
        }
        data.push({"name" : i.bathroom_name,
                    "status" : status});
        res.json(data);
      });
    }
  });
};

exports.addDorm = (req,res) => {
  console.log("request to add dorm");
  db.run('CREATE TABLE IF NOT EXISTS cc_dorms (dorm_name TEXT UNIQUE NOT NULL);');
  if(req.body !== {}){
    var dorm_name = req.body.name;
    console.log(req.body.name);
    db.serialize(() => {
      db.run("INSERT INTO cc_dorms(dorm_name) VALUES(?)", [dorm_name], (err) => {
        if(err){
          throw err;
        }
      });
    });
    res.send("Dorm Added");
  }else{
    res.send("Err: no url encoded body");
  };
};
