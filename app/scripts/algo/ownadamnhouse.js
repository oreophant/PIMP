function getHouse(pr, ty, osl){
        var housePrice=pr //user input
        var loan_info = {
            boolHDBloan:false,
            tenureYears:ty, //user input
            buyerAge:20,
            buyingHDB:false,
            outstandingLoans:osl,//user input
            percentDownPayment:0.2,
            percentCashPayment:0.1,
            percentCpfPayment:0.1,
            downPaymentCash:0,
            downPaymentCPF:0,
            loanAmount:0,
            interestRate:2.1//user input
        }
        var instantPayment=0;
        var monthlyDeductions=0;

        function houseExtraPrices(price){
          var housing_info= {
            housePrice:price,
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


          //console.log("stamp duty: $"+housing_info.stampDuty);
          //console.log("ABSD: $" + parseInt(housing_info.aBSD));

          return housing_info.stampDuty+housing_info.aBSD+price*0.013;
        }

        function loaning(){
          if (loan_info.boolHDBloan&&loan_info.buyingHDB)loan_info.percentCpfPayment=1;
          else if (!(loan_info.boolHDBloan)&&(loan_info.tenureYears+loan_info.buyerAge)<=65&&loan_info.tenureYears<=30){
            if (loan_info.outstandingLoans==0){
              //choose between downpayment 20% or 40%
              loan_info.percentDownPayment=0.2;

              if(loan_info.percentDownPayment==0.2){
                loan_info.percentCashPayment=0.05;
                loan_info.percentCpfPayment=0.15;
              }
              else if (loan_info.percentDownPayment==0.4){
                loan_info.percentCashPayment=0.1;
                loan_info.percentCpfPayment=0.3;
              }
              else{
                console.log('Not legit input')
              }
            }
            else if (loan_info.outstandingLoans==1) {
              //choose between downpayment 50% or 70%
              loan_info.percentDownPayment=0.5;

              if(loan_info.percentDownPayment==0.5){
                loan_info.percentCashPayment=0.25;
                loan_info.percentCpfPayment=0.25;
              }
              else if (loan_info.percentDownPayment==0.7){
                loan_info.percentCashPayment=0.25;
                loan_info.percentCpfPayment=0.45;
              }
              else{
                console.log('Not legit input')
              }
            }
            else {
              //choose between downpayment 60% or 80%
              loan_info.percentDownPayment=0.6;

              if(loan_info.percentDownPayment==0.6){
                loan_info.percentCashPayment=0.25;
                loan_info.percentCpfPayment=0.35;
              }
              else if (loan_info.percentDownPayment==0.8){
                loan_info.percentCashPayment=0.25;
                loan_info.percentCpfPayment=0.55;
              }
              else{
                console.log('Not legit input')
              }
            }
          }

          loan_info.downPaymentCPF=housePrice*loan_info.percentCpfPayment;
          loan_info.downPaymentCash=housePrice*loan_info.percentCashPayment;
          loan_info.downPayment=loan_info.downPaymentCash+loan_info.downPaymentCPF;
          loan_info.loanAmount=housePrice-loan_info.downPayment;

        // console.log("downPayment is : $"+loan_info.downPayment)
        // console.log("loanAmount is : $"+loan_info.loanAmount)
        }

        loaning();
        instantPayment=houseExtraPrices(housePrice)+loan_info.downPayment;
/*
        console.log("Instant deduction of:"+instantPayment);
        console.log("By Cash:"+(loan_info.downPaymentCash+houseExtraPrices(housePrice)))
        console.log("By CPF:"+loan_info.downPaymentCPF)
        var monthlyDeductions=loan_info.loanAmount*((loan_info.interestRate/1200)/(1-Math.pow((1+loan_info.interestRate/1200),-(loan_info.tenureYears*12))));
        console.log("Monthly repayment:"+monthlyDeductions)
        console.log("Total amount paid:"+monthlyDeductions*loan_info.tenureYears*12+instantPayment)
*/
        return "Instant deduction of: "+instantPayment+"\n By Cash:"+(loan_info.downPaymentCash+houseExtraPrices(housePrice))+"\n By CPF:"+loan_info.downPaymentCPF+
        "Monthly repayment:" + loan_info.loanAmount*((loan_info.interestRate/1200)/(1-Math.pow((1+loan_info.interestRate/1200),-(loan_info.tenureYears*12))) +
        "Total amount paid:"+ loan_info.loanAmount*((loan_info.interestRate/1200)/(1-Math.pow((1+loan_info.interestRate/1200),-(loan_info.tenureYears*12)))*loan_info.tenureYears*12+instantPayment;


}
