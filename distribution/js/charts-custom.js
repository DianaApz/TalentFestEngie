$(function () {
    var violet = '#DF99CA',
        red    = '#F0404C',
        green  = '#7CF29C';
//   Pie Chart
//    ------------------------------------------------------ //
   var PIECHART = document.querySelectorAll('.pieChart2');
   new Chart(PIECHART, {
       type: 'doughnut',
       options: {
           cutoutPercentage: 50,
           legend: {
               display: false
           }
       },
       data: {
           labels: [
               "First",
               "Second"
           ],
           datasets: [
               {
                   data: [100,10],
                   borderWidth: [0, 0],
                   backgroundColor: [
                       violet,
                       "#eee"
                   ],
                   hoverBackgroundColor: [
                       violet,
                       "#eee"
                   ]
               }]
       }
   });
});

google.load('visualization', '1.0', { 'packages': ['corechart'] });
google.setOnLoadCallback(dibujar);
function dibujar () {
  firebase.database().ref().child('Incidencia').on('value', function (data) {

    const dat = Object.keys(data.val());
    console.log(data.val())
    dat.forEach((e)=>{
      console.log(Object.values(data.val()[e]).length);
    })
  })
  let data = new google.visualization.DataTable();
  data.addColumn('string', 'Pais');
  data.addColumn('number', 'visitas');
  data.addRows(
    [
      ['I1', 452],
      ['I2', 378],
      ['I3', 311],
      ['I4', 200]
    ]
  );
  let opciones = {
    'title': 'visitas',
    'width': 1000,
    'height': 300,
    
  }

  let grafico = new google.visualization.PieChart(document.getElementById('chart'));
  grafico.draw(data, opciones);
}
