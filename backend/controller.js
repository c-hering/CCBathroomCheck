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
  db.all("SELECT bathroom_name, bathroom_status FROM " + dorm, [], (err,row) =>{
    var data = [];
    if(err){
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

function getStatus(dorm, bathroom){
  var promise = new Promise( (resolve,reject) => {
    db.get("SELECT bathroom_status status FROM " + dorm + " WHERE bathroom_name = ?", [bathroom], (err,row) => {
      // console.log(row.status);
      let tmp = row.status;
      resolve([err, tmp]);
    });
  });
  return promise;
}

exports.getBathroom = async (req, res) => {
  console.log("request to get specific bathroom");

  var dorm = req.params.dorm;
  var bathroom = req.params.bathroom;

  var result = await getStatus(dorm, bathroom);

  if(result[0]){
    res.send("Err: " + result[0]);
  }else{
    res.json({"name":bathroom, "status":result[1]});
  }
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
          res.send("Err: " + err);
        }else{
          res.send("Dorm Added");
        }
      });
    });
  }else{
    res.send("Err: no url encoded body");
  };
};

//on the app side, mutliple bathrooms to add should be parsed into single requests
exports.addBathrooms = (req,res) => {
  console.log('request to add bathroom');
  var dorm = req.params.dorm;

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
  }else{
    res.send("Err: no url encoded body");
  }
}

exports.setStatus = async (req,res) => {
  console.log('request to change status');
  var dorm = req.params.dorm;
  var bathroom = req.params.bathroom;

  var result = await getStatus(dorm, bathroom);

  if(result[0]){
    res.send("Err: " + result[0]);
  }else{
    db.run("UPDATE " + dorm + " SET bathroom_status = " + Math.abs((result[1] - 1)) + " WHERE bathroom_name = '" + bathroom + "'", (err) => {
      if(err){
        res.send("Err: " + err);
      }else{
        res.send("Status Updated");
      }
    });

  }
}
