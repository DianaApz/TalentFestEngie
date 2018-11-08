$(function () {
    var violet = '#DF99CA',
        red    = '#F0404C',
        green  = '#7CF29C';
  // Pie Chart
   // ------------------------------------------------------ //
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
