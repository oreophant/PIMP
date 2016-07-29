
var loan_info = {
    boolHDBloan:false,
    tenureYears:20,
    buyerAge:20,
    buyingHDB:false,
    outstandingLoans:1,
    percentDownPayment:0.2,
    percentCashPayment:0.1,
    percentCpfPayment:0.1,
    downPaymentCash:0,
    downPaymentCPF:0,
    loanAmount:0
}
var housePrice=1400000;
if (loan_info.boolHDBloan&&loan_info.buyingHDB)loan_info.percentCpfPayment=1;
else if (!loan_info.boolHDBloan&&(loan_info.tenureYears+loan_info.buyerAge)>=65&&loan_info<30){
  if (outstandingLoans==0){
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
  else if (outstandingLoans==1) {
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

console.log("downPayment is : $"+loan_info.downPayment)
console.log("loanAmount is : $"+loan_info.loanAmount)
