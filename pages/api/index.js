let fs = require("fs");
let db = require("data/db.json");

export default function handler(req, res){

  const {method, body} = req;

  
  const dataGet = async () => {
    try{
      res.status(200).json(db)
    } catch (err) {
      res.send(err)
    }
  }
  
  switch(method){
    case "GET" : dataGet(); break;
  }
  
}
