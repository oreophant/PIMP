google.charts.load('current', {'packages':['corechart', 'treemap', 'gauge']});


google.charts.setOnLoadCallback(drawLifeChart);
      google.charts.setOnLoadCallback(drawPieChart);
      google.charts.setOnLoadCallback(drawGaugeChart);


      function drawLifeChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'ID');
        data.addColumn('string', 'Parent');
        data.addColumn('number', 'Number Of Lines');
        data.addRows([
          ['Life Planner', null, 0],

          ['House Ownership', 'Life Planner', null],
          ['Marriage', 'Life Planner', null],
          ['Retirement', 'Life Planner', null],

          ['House price', 'House Ownership', 100000],
          ['Stampduty', 'House Ownership', 30000],
          ['Estate Agent', 'House Ownership', 50000],
          ['Additional Stamp duty', 'House Ownership', 30000],
          ['Insurance', 'House Ownership', 30000],
          ['Wedding outfit', 'Marriage', 5000],
          ['Location Booking', 'Marriage', 10000],
          ['Gifts', 'Marriage', 7000],
          ['Wedding Banquet', 'Marriage', 20000],
          ['Honey Moon', 'Marriage', 30000],
          ['Basic needs', 'Retirement', 50000],
          ['Healthcare', 'Retirement', 60000],
          ['Other factors1', 'Retirement', 11231],
          ['Other factors2', 'Retirement', 12312],
        ]);
        var tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

        var options = {
          highlightOnMouseOver: true,
          maxDepth: 1,
          maxPostDepth: 2,
          /*
          minHighlightColor: '#8c6bb1',
          midHighlightColor: '#9ebcda',
          maxHighlightColor: '#edf8fb',
          minColor: '#145ECC',
          midColor: '#B22411',
          maxColor: '#C8FF19',
          */
          headerHeight: 30,
          showScale: false,
          height: 500,
          useWeightedAverageForAggregation: true,
          generateTooltip: showFullTooltip
        };

          tree.draw(data, options);

          function showFullTooltip(row, size, value) {
                                  var currentOver=data.getValue(row,0);
                                  var displayTxt="Displaying annotation for "+currentOver;


                                  function camelize(str) {
                          return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                            return index == 0 ? match.toLowerCase() : match.toUpperCase();
                          });
                        };

                                  var descriptions={
                                    lifePlanner: "Left click to view in depth, right click to go back.",
                                    houseOwnership : "Owning a property is an expensive option</br> in Singapore.Proceed with caution.",
                                    marriage:"",
                                    retirement:"",
                                    housePrice:"",
                                    stampduty:"",
                                    estateAgent:"Payment to the Estate Agent",
                                    additionalStampDuty:"",
                                    insurance:"",
                                    weddingOutfit:"Getting dressed for wedding",
                                    locationBooking:"",
                                    gifts:"",
                                    weddingBanquet:"Invite all your friends",
                                    honeyMoon:"",
                                    basicNeeds:"",
                                    healthcare:"",
                                    otherFactors1:"",
                                    otherFactors2:"",
                                  };

                                  var currtext = camelize(currentOver);

                                  displayTxt = descriptions[currtext];

                                  return '<div style="background:#fd9; padding:10px; border-style:solid">' +
                                         '<span style="font-family:Arial">' + displayTxt+
                                         '</span>'+
                                         '</div>';
            };

      };


      function drawPieChart() {
        data=new google.visualization.DataTable();
        data.addColumn('string','Task')
        data.addColumn('number','Hours')
        data.addColumn({type:'string',role:'tooltip'})

        data.addRows([
          ['Work',     11,'work tooltip'],
          ['Eat',      2, 'tooltip'],
          ['Commute',  2, 'this is a tooltip'],
          ['Watch TV', 2, 'this is a tooltip'],
          ['Sleep',    7, 'this is a tooltip']
        ])
        var options = {
          title: 'My Daily Activities',
          is3D: true,
          tooltip:{isHtml:true}
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      };




      function drawGaugeChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Goal %', 80],
        ]);

        var options = {
          width: 700, height: 400,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div2'));

        chart.draw(data, options);

      };
