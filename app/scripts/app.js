'use strict';

/**
 * @ngdoc overview
 * @name pimp
 * @description
 * # pimp
 *
 * Main module of the application.
 */


angular
  .module('pimp', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html'
          })
          .state('housing', {
            url: '/housing',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/housing.html',
            controller: ["$scope", function($scope){

              $scope.user={

                housePrice: "",
                tenureYears: "",
                oStandingLoans: "",
                dank: function(){
                  getHouse($scope.user.housePrice, $scope.user.tenureYears, $scope.user.oStandingLoans)
              }}
              ;

            $scope.next = function(){
              $location.path('/dashboard');
            };

            // use factory methods here


            function getHouse(pr, ty, osl){

                    var housePrice=pr; //user input
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

                    console.log("Instant deduction of:"+instantPayment);
                    console.log("By Cash:"+(loan_info.downPaymentCash+houseExtraPrices(housePrice)))
                    console.log("By CPF:"+loan_info.downPaymentCPF)
                    var monthlyDeductions=loan_info.loanAmount*((loan_info.interestRate/1200)/(1-Math.pow((1+loan_info.interestRate/1200),-(loan_info.tenureYears*12))));
                    console.log("Monthly repayment:"+monthlyDeductions)
                    console.log("Total amount paid:"+monthlyDeductions*loan_info.tenureYears*12+instantPayment)

                    $scope.user.dankResult1 = "Instant deduction of: S$"+parseInt(instantPayment);
                    $scope.user.dankResult2 = "By Cash: S$"+parseInt((loan_info.downPaymentCash+houseExtraPrices(housePrice)));
                    $scope.user.dankResult3 =  "By CPF: S$"+parseInt(loan_info.downPaymentCPF);
                    $scope.user.dankResult4 = "Monthly repayment: S$" + parseInt(loan_info.loanAmount*((loan_info.interestRate/1200)/(1-Math.pow((1+loan_info.interestRate/1200),-(loan_info.tenureYears*12)))));
                    $scope.user.dankResult5 = "Total amount paid: S$"+ parseInt(loan_info.loanAmount*((loan_info.interestRate/1200)/(1-Math.pow((1+loan_info.interestRate/1200),-(loan_info.tenureYears*12))))*loan_info.tenureYears*12+instantPayment);




                  }


            ;









          }]
          })

          .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html',
          })
          .state('taxes', {
            url: '/taxes',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/taxes.html',
          })
          .state('marriage', {
            url: '/marriage',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/marriage.html'
          })
          .state('retirement', {
            url: '/retirement',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/retirement.html',
            controller: ["$scope", function($scope){

              $scope.user={

                age: "",
                income: "",
                job: "",
                house: "",
                commit: "",
                getCPF: function(){
                  getCPF($scope.user.age, $scope.user.income, $scope.user.job, $scope.user.house, $scope.user.commit);
              }}
              ;


            function getCPF(age, income, job, house, commit){
            var earn;
            var sum;
            var monthly;
            
            var basic = function(age){
              return 80500 + (55-age) * 2500;
            };
            
            if (age < 55 && job == 2)
            {
              earn == (37/100 * income);
              sum == earn * (55 -age + commit) - basic;
              $scope.user.fiftyfive == sum;
              monthly == (basic + earn)/12;
              $scope.user.retired == monthly;
            }
            else if (age >= 55 && age < 60 && job == 2)
            {
              earn == (26/100 * income);
              sum == earn * (55 - commit) - basic;
              $scope.user.fiftyfive ==sum;
              monthly == (basic + earn)/ 12;
              $scope.user.retired == monthly;
            }
            else if (age >= 60 && age < 65 && job == 2)
            {
              earn == (16.5/100 * income);
              sum == earn * (55-commit) - basic;
              $scope.user.fiftyfive == sum;
              monthly == (basic + earn) / 12;
              $scope.user.retired == monthly;
            }
            else if (age >= 65 && job == 2)
            {
              earn == (12.5/100 * income);
              sum == earn * (55-commit) - basic;
              $scope.user.fiftyfive == sum;
              monthly == (basic + earn * (age - 55)) / 120;
              $scope.user.retired == monthly;
            }
            else if (age < 55 && job == 1)
            {
              earn == (27.75/100 * income);
              sum == earn * (55 -age + commit) - basic;
              $scope.user.fiftyfive == sum;
              monthly == (basic + earn)/12;
              $scope.user.retired == monthly;
            }
            else if (age >= 55 && age < 60 && job == 1)
            {
              earn == (19.5/100 * income);
              sum == earn * (55 - commit) - basic;
              $scope.user.fiftyfive ==sum;
              monthly == (basic + earn)/ 12;
              $scope.user.retired == monthly;
            }
            else if(age >= 60 && age < 65 && job == 1)
            {
              earn == (12.375/100 * income);
              sum == earn * (55-commit) - basic;
              $scope.user.fiftyfive == sum;
              monthly == (basic + earn) / 12;
              $scope.user.retired == monthly;
            }
            else if (age >= 65 && job == 2)
            {
              earn == (9.375/100 * income);
              sum == earn * (55-commit) - basic;
              $scope.user.fiftyfive == sum;
              monthly == (basic + earn * (age - 55)) / 120;
              $scope.user.retired == monthly;
            }
            if (sum > 0 )
            {
              $scope.user.warn == "Good Job, you have more than enough money for retirement!";
            }
            if (sum <= 0 )
            {
              $scope.user.warn == "Using calculations, you will not save enough for retirement. Change a saving plan now or allocate less finance to other resources! \n use our app for more details on where to save!";
            }
          }
          }]
 
      });
  });
