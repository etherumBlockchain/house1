var express = require('express');
var router = express.Router();
var Web3 = require('web3');
//创建web3对象
var web3 = new Web3();
//连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
 var abi = [ { "constant": false, "inputs": [ { "name": "houseid", "type": "string" }, { "name": "name", "type": "string" }, { "name": "id", "type": "string" }, { "name": "number", "type": "string" }, { "name": "password", "type": "string" }, { "name": "repassword", "type": "string" } ], "name": "setHouseInfo", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [ { "name": "houseid", "type": "string" } ], "name": "getHouseInfo", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" } ];
 var addr = '0xDcDb542A183724559DD040AE91c1AD6331746A09';
 var house = web3.eth.contract(abi).at(addr);
 var account_one = web3.eth.accounts[0];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*GET regiter page. */
router.get("/register", function(req,res){
	res.render('register',{title:'房屋产权注册'});
});

router.post("/register1", function(req, res) {
	
	// res.end();
	//console.log(req.body.username);

	//console.log(web3.eth.accounts[0]);
	
	 console.log(house);
	 var houseid = req.body.houseid;
	 console.log(houseid);
	 var username = req.body.username;
	 var idnumber = req.body.idnumber;
	 var contactnumber = req.body.contactnumber;
	 var password = req.body.password;
	 var repassword = req.body.repassword;
	 try {
	 	house.setHouseInfo.sendTransaction(houseid,username,idnumber,contactnumber,password,repassword,{from:account_one,gas:4700000});
	} catch(err) {
		console.error(err);
		res.send({ status: 500, message: err.stack });
		return;
	}
	 
	 //res.send(req.query);
	 //res.send(req.param);
	 res.send({ status: 200, message: "success" });
});  

router.get("/search",function(req,res){
	res.render('search',{title:'房屋产权查询'});
});

router.get("/search1",function(req,res){
 	var houseid = req.query.houseid;
 	 console.log(houseid);
 	var houses;
   try{
   	     houses = house.getHouseInfo.call(houseid);
   	     console.log(houses);
    }catch(err){
    	console.log(err);
    	res.send({status: 500, message: err.stack});
    	return;
    }
     var houseInfo = {username:houses[0],idnumber:houses[1],contactnumber:houses[2]};
      res.send(houseInfo);
      
      
});
  
module.exports = router;
