import data from "../../../data/db.json";

export default function handler(req, res){
    // console.log(req.query)
    const id = req.query.id;
    res.status(200).json(data.filter(obj => obj.id === id))
}
