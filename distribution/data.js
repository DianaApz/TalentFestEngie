const select = document.getElementById('select');
const countries = document.getElementById('countries');
const content = document.getElementById('content');
firebase.database().ref().child('Meses').on('value', function (data) {
  const dataMeses = Object.values(data.val());
  dataMeses.forEach(element => {
    select.innerHTML += `<option>${element}</option>`;
  });
})
const showData = (el) => {
  const card = document.createElement('card');
  card.setAttribute('class', 'card');
  const cardBody = document.createElement('div');
  const cardContainer = document.createElement('div');
  const nro = document.createElement('p');
  nro.textContent = `Nro de reporte : ${el.nro}`;
  const description = document.createElement('p');
  description.textContent = `${el.Description}`
  const service = document.createElement('p');
  
  service.textContent = `Sede : ${el.Sector}`;
  const sect = document.createElement('span');
  sect.textContent = `Sector : ${el.Sede}`;
  sect.setAttribute('class', 'colorSect');

  const boxBtn = document.createElement('div');
  const btnLook = document.createElement('button');
  btnLook.textContent = 'VER';
  const btnPlan = document.createElement('button');
  btnPlan.setAttribute('type', 'button');
  btnPlan.setAttribute('class', `btn btn-primary`);
  btnPlan.setAttribute('data-toggle', `modal`);
  btnPlan.setAttribute('data-target', `#${el.id}`);
  btnPlan.textContent = 'PLAN';
  cardBody.appendChild(cardContainer);
  cardBody.appendChild(sect);
  cardBody.appendChild(service);
  cardBody.appendChild(description);
  boxBtn.appendChild(btnPlan);
  boxBtn.appendChild(btnLook);
  cardBody.appendChild(boxBtn);
  cardContainer.appendChild(nro);
  card.appendChild(cardBody);
  content.appendChild(card);
  //modal plan
  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal fade');
  modal.setAttribute('id', `${el.id}`)
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', `m${el.id}`);
  modal.setAttribute('aria-hidden', 'true');
  const modalDialog = document.createElement('div');
  modalDialog.setAttribute('class', 'modal-dialog modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  const modalContent = document.createElement('div');
  modalContent.setAttribute('class', 'modal-content');
  const modalHeader = document.createElement('div');
  modalHeader.setAttribute('class', 'modal-header');
  const title = document.createElement('h5');
  title.setAttribute('class', 'modal-title');
  title.setAttribute('id', `m${el.id}`);
  title.textContent = 'Revisión de Estado';
  const btnClose = document.createElement('button');
  btnClose.setAttribute('type', 'button');
  btnClose.setAttribute('class', 'close');
  btnClose.setAttribute('data-dismiss', 'modal');
  btnClose.setAttribute('arial-label', 'Close');
  const spanClose = document.createElement('span');
  spanClose.setAttribute('aria-hidden', 'true');
  spanClose.textContent = 'x';
  const modalBody = document.createElement('div');
  modalBody.setAttribute('class', 'modal-body');
  const pRes = document.createElement('p');
  pRes.textContent = `Responsable : ${el.Responsable}`;
  const pDate = document.createElement('p');
  pDate.textContent = `Fecha límite : ${el.deadline}`;
  const pStatus = document.createElement('p');
  pStatus.textContent = `Estado : ${el.status}`;


  // MODAL CHART
  const modalChart = document.createElement('div');
  modalChart.setAttribute('class', 'card')
  // const modalCardChart = document.createElement('div');
  // modalCardChart.setAttribute('class', 'card-header')
  // const modalH2 = document.createElement('h2');
  // modalH2.setAttribute('class', 'h6 text-uppercase mb-0');
  // modalH2.textContent='chart';
  // const modalCardBody = document.createElement('div');
  // modalCardBody.setAttribute('class', 'card-body')
  // const modalChartHolder = document.createElement('div');
  // modalChartHolder.setAttribute('class', 'chart-holder')
  const modalCanva= document.createElement('canvas');
  modalCanva.setAttribute('class', 'pieChart2');
  modalCanva.setAttribute('width', '400px');


//   <div class="card mb-4">
//   <div class="card-header">
//     <h2 class="h6 text-uppercase mb-0">Pie chart Example</h2>
//   </div>
//   <div class="card-body">
//     <div class="chart-holder">
//       <canvas id="pieChart2"></canvas>
//     </div>
//   </div>
// </div>
  const modalFooter = document.createElement('div');
  modalFooter.setAttribute('class', 'modal-footer');
  const btnDetails = document.createElement('button');
  btnDetails.setAttribute('type', 'button');
  btnDetails.setAttribute('class', 'btn btn-primary');
  btnDetails.textContent = 'Agregar detalles';
  const btnCls = document.createElement('button');
  btnCls.setAttribute('type', 'button');
  btnCls.setAttribute('class', 'btn btn-secondary');
  btnCls.setAttribute('data-dismiss', 'modal')
  btnCls.textContent = 'Declinar';  

  // modalCardChart.appendChild(modalH2);
  // modalChartHolder.appendChild(modalCanva);
  // modalCardBody.appendChild(modalChartHolder);

  // modalChart.appendChild(modalCardChart);
  // modalChart.appendChild(modalCardBody);
  

  modalHeader.appendChild(title);
  btnClose.appendChild(spanClose);
  modalHeader.appendChild(btnClose);
  modalChart.appendChild(modalCanva);
  modalBody.appendChild(modalChart);
  modalBody.appendChild(pRes);
  modalBody.appendChild(pDate);
  modalBody.appendChild(pStatus);
  


  





  modalFooter.appendChild(btnDetails);
  modalFooter.appendChild(btnCls);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog)
  content.appendChild(modal);
}
const selectMonth = (e) => {
  const val = e.target.value;
  firebase.database().ref().child('Incidencia').on('value', function (data) {
    const incident = Object.values(data.val());
    content.innerHTML = '';
    incident.forEach((ele) => {
      Object.values(ele).forEach(el => {
        if (val === el.Mes) {
          showData(el);
        }
      })
    })
  })
}
select.addEventListener('change', selectMonth);
firebase.database().ref().child('Paises').on('value', function (data) {
  const dataPaises = Object.keys(data.val());
  dataPaises.forEach(el => {
    countries.innerHTML += `<option>${el}</option>`;
  });
})
const selectCountries = (e) => {
  const value = e.target.value;
  firebase.database().ref().child('Incidencia').on('value', function (data) {
    const incidents = Object.values(data.val());
    content.innerHTML = '';
    incidents.forEach((element) => {
      Object.values(element).forEach((e) => {
        if (value === e.Region) {
          showData(e);
        }
      })
    })
  })
}
countries.addEventListener('change', selectCountries);