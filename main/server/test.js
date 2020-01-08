document.getElementById("connection_status").innerHTML = "WEBSOCKET DISCONNECTED";

var chartV = new Highcharts.Chart({
  chart:{ renderTo : 'chart-voltage' },
  title: { text: 'ADC Voltage' },
  series: [{
    showInLegend: false,
    data: []
  }],
  plotOptions: {
    line: { animation: false,
      dataLabels: { enabled: false }
    },
    series: { color: '#059e8a' }
  },
  xAxis: { type: 'datetime',
    dateTimeLabelFormats: { second: '%S' }
  },
  yAxis: {
    title: { text: 'Voltage (mV)' }
  },
  credits: { enabled: false }
});

var websocket = new WebSocket('ws://'+location.hostname+'/');

websocket.onopen = function(evt) {
  console.log('WebSocket connection opened');
  websocket.send("It's open! Hooray!!!");
  document.getElementById("connection_status").innerHTML = "WEBSOCKET CONNECTED";
}

websocket.onmessage = function(evt) {
    var msg = evt.data;

    var x = (new Date()).getTime(), y = parseFloat(msg);

    //console.log(this.responseText);
    if(chartV.series[0].data.length > 40) 
    {
        chartV.series[0].addPoint([x, y]);
    } 
    else 
    {
        chartV.series[0].addPoint([x, y]);
    }

//    document.getElementById("adc").innerHTML = evt.data;
}

websocket.onclose = function(evt) {
  console.log('Websocket connection closed');
  document.getElementById("test").innerHTML = "WebSocket closed";
}

websocket.onerror = function(evt) {
  console.log('Websocket error: ' + evt);
  document.getElementById("test").innerHTML = "WebSocket error????!!!1!!";
}
