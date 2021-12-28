const app= require('express')();
const  mongoose = require("mongoose");
require('dotenv').config()
const PORT=8080;
var Data = require("./models/Data");
//add/import  the jsondata.json to your mongodb db
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {

    console.log('Connected to DB');

}).catch(err => {
    console.log('ERROR :', err.message);

});
var cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.get("/all",(req,res)=>{
	Data.find().exec(function(err, all) {
        if (err) {
            res.send(err);
        } else {
			res.set('Access-Control-Allow-Origin', '*');
			res.status(200).json(all);
        }
    });
})
//////filter/:id?sort=1&limit=10&q=Energy//////
app.get("/filter/:id",(req,res)=>{
	if (req.query.limit===undefined){req.query.limit=1000;}
	if (req.query.sort===undefined){req.query.sort=1;}
	var sort={[req.params.id] : parseInt(req.query.sort)}
	const agg = [
		 {
		  '$sort': sort
		}, {
		  '$limit': parseInt(req.query.limit)
		}
	  ];
	Data.aggregate(agg, (err,all)=>{
		if (err) {
            res.send(err);
        } else {
			res.set('Access-Control-Allow-Origin', '*');
			res.status(200).json(all);
        }
	});
});
////////sortbycount/////////////////
app.get("/count/:id",cors(),(req,res)=>{

	const agg = [
		{
			'$sortByCount': '$'+req.params.id
		}
	  ];
	Data.aggregate(agg, (err,all)=>{
		if (err) {
            res.send(err);
        } else {
			res.set('Access-Control-Allow-Origin', '*');
			res.status(200).json(all);
        }
	});
});
app.get("*", function(req, res) {
    res.send("Error 404 page not found ")
})

app.listen(PORT,()=>{
	console.log("Started");
})