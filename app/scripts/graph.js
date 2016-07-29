google.charts.load('current', {'packages':['corechart', 'treemap', 'gauge']});


google.charts.setOnLoadCallback(drawLifeChart);
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

        ['House price', 'House Ownership', 500000/3],
        ['Stampduty', 'House Ownership', 3000],
        ['lawyer fee', 'House Ownership', 5000],
        ['Money Money', 'House Ownership', 30000],
        ['Basic needs', 'Retirement', 50000],
        ['History Of King John', 'Retirement', 60000],
        ['Antony And Cleopatra', 'Marriage', 80000],
        ['Coriolanus', 'Marriage', 12313],
        ['Cymbeline', 'Marriage', 12312],
        ['The Tragedy of Hamlet, Prince of Denmark', 'Marriage', 12312],
        ['Julius Caesar', 'Marriage', 12312],
        ['Comedy Of Errors', 'Retirement', 11231],
        ['Merchant Of Venice', 'Retirement', 12312],
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
        useWeightedAverageForAggregation: true
      };

        tree.draw(data, options);

      };


      function drawGaugeChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Goal %', 80],
        ]);

        var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div2'));

        chart.draw(data, options);

      };
