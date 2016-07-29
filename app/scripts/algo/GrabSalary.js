var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


var url = "http://www.payscale.com/research/SG/Job=Information_Systems_(IS)_Manager/Salary";

request(url, function(error, response, html){
    if(!error){
      console.log("yo sup, no errors")
        var $ = cheerio.load(html);

        var median_pay,total_pay_low,total_pay_high;


        $('div.you_label').filter(function(){
           var data = $(this);
           var intermediate_median_pay=data.text();
           median_pay = parseInt(intermediate_median_pay.replace ( /[^\d.]/g, '' ));
        })
        $('td.b').filter(function(){
           var data = $(this);
           var intermediate_total_pay=data.text();
           var tmparray = intermediate_total_pay.split("-");
           total_pay_low= parseInt(tmparray[0].replace ( /[^\d.]/g, '' ));
           total_pay_high= parseInt(tmparray[1].replace ( /[^\d.]/g, '' ));
        })
        console.log("lowest pay:  S$"+total_pay_low)
        console.log("median pay:  S$"+median_pay)
        console.log("highest pay: S$"+total_pay_high)
    };
});

/*
fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

});
*/
