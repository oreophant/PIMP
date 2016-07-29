var housing_info= {
  housePrice:1400000,
  stampDuty:0,
  housesBought:1,
  aBSD:0
}

if (housing_info.housePrice<=180000)housing_info.stampDuty=housing_info.housePrice*0.01;
else if (housing_info.housePrice<=360000)housing_info.stampDuty=1800+(housing_info.housePrice-180000)*0.02;
else housing_info.stampDuty=1800+3600+(housing_info.housePrice-360000)*0.03

if (housing_info.housesBought<1){
  housing_info.aBSD=0;
}
else if (housing_info.housesBought<2){
  housing_info.aBSD=housing_info.housePrice*0.07;
}
else if (housing_info.housesBought>2){
  housing_info.aBSD=housing_info.housePrice*0.10;
}


console.log("stamp duty: $"+housing_info.stampDuty);
console.log("ABSD: $" + parseInt(housing_info.aBSD));
