var express = require('express');
var router = express.Router();
const fs = require('fs');
var readline = require('readline');
var path = require('path');


router.post('/', (req,res,next)=>{
  let val = req.body.line
  res.redirect(`/${val}`)
});

/* GET home page. */
router.get('/', renderData);

router.get('/:num/', renderData);

function renderData(req,res,next){
  var val = 10
  if((req.params && req.params.num)){
    var num = +req.params.num;
    val = (num && !isNaN(num)) ? num : val;
    val = (num === 0 ) ? 0 : val

  }

  var rl = readline.createInterface({
		input: fs.createReadStream('text.txt'),
	})
	
	// for Display
	var fileArray = [];
	rl.on('line', (chunk) => {
		fileArray.push(chunk);
  })
  
	rl.on('close', () => {
    let arr = fileArray.slice((fileArray.length - 1) - val);
    res.render('index', { arr: arr,num:val});
	})
}

module.exports = router;
