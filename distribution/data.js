const select = document.getElementById('select');
const countries = document.getElementById('countries');
const content = document.getElementById('content');
firebase.database().ref().child('Meses').on('value', data => {
  const dataMeses = Object.values(data.val());
  dataMeses.forEach(element => {
    select.innerHTML += `<option>${element}</option>`;
  });
})
const violet = '#DF99CA',
  red = '#F0404C',
  green = '#7CF29C';
const chart = (e) => {
  const chartStatus = parseInt(e.status);
  const idChart = e.id
  content.innerHTML += `
            <div class="col-4 backCard1">
              <div class="card-header">
               <h2 class="h6 text-uppercase mb-0">Porcentaje de Incidendias</h2>
              </div>
             <div class="card-body">
               <div class="chart-holder">
               
                <canvas id="${idChart}"></canvas>
               </div>
              </div>
            </div>
            `
  showData(e);
  setTimeout(() => {
    new Chart(idChart, {
      type: 'doughnut',
      options: {
        cutoutPercentage: 80,
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
            data: [100, 100 - chartStatus],
            borderWidth: [0, 0],
            backgroundColor: [
              violet,
              "#eee"
            ],
            hoverBackgroundColor: [
              violet,
              "#eee"
            ]
          }
        ]
      }
    });
  }, 1000)
}
const showData = (el) => {
  const card = document.createElement('card');
  card.setAttribute('class', 'col-7 backCard');
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
  btnLook.setAttribute('type', 'button');
  btnLook.setAttribute('class', 'btn btn-primary');
  btnLook.setAttribute('data-toggle', 'modal');
  btnLook.setAttribute('data-target', `#mLook${el.id}`);
  btnLook.textContent = 'VER';
  const btnPlan = document.createElement('button');
  btnPlan.setAttribute('type', 'button');
  btnPlan.setAttribute('class', `btn btn-primary`);
  btnPlan.setAttribute('data-toggle', `modal`);
  btnPlan.setAttribute('data-target', `#plan${el.id}`);
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
  modal.setAttribute('id', `plan${el.id}`)
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
  const list = document.createElement('ul');
  Object.values(el.Plan).forEach((act) => {
    const li = document.createElement('li');
    li.textContent = act.Accion;
    const dateSpan = document.createElement('p');
    dateSpan.textContent = `Fecha límite :${act.fecha}`;
    li.appendChild(dateSpan)
    list.appendChild(li)
  })
  const pStatus = document.createElement('p');
  pStatus.textContent = `Estado : ${el.status}`;
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
  modalHeader.appendChild(title);
  btnClose.appendChild(spanClose);
  modalHeader.appendChild(btnClose);
  modalBody.appendChild(pRes);
  modalBody.appendChild(list);
  modalBody.appendChild(pStatus);
  modalFooter.appendChild(btnDetails);
  modalFooter.appendChild(btnCls);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog)
  content.appendChild(modal);
//modal ver
  const modalLook = document.createElement('div');
  modalLook.setAttribute('class', 'modal fade');
  modalLook.setAttribute('id', `mLook${el.id}`)
  modalLook.setAttribute('tabindex', '-1');
  modalLook.setAttribute('role', 'dialog');
  modalLook.setAttribute('aria-hidden', 'true');
  const modalDlg = document.createElement('div');
  modalDlg.setAttribute('class', 'modal-dialog modal-dialog-centered');
  modalDlg.setAttribute('role', 'document');
  const modalCont = document.createElement('div');
  modalCont.setAttribute('class', 'modal-content');
  const modalHead = document.createElement('div');
  modalHead.setAttribute('class', 'modal-header');
  const phrase = document.createElement('h5');
  phrase.setAttribute('class', 'modal-title');
  phrase.setAttribute('id', `m${el.id}`);
  phrase.textContent = 'Revisión de Estado';
  const btnCl = document.createElement('button');
  btnCl.setAttribute('type', 'button');
  btnCl.setAttribute('class', 'close');
  btnCl.setAttribute('data-dismiss', 'modal');
  btnCl.setAttribute('arial-label', 'Close');
  const spanCl = document.createElement('span');
  spanCl.setAttribute('aria-hidden', 'true');
  spanCl.textContent = 'x';
  const modalBo = document.createElement('div');
  modalBo.setAttribute('class', 'modal-body');
  const img = document.createElement('img');
  img.setAttribute('src', 'https://raw.githubusercontent.com/JoselynSilva/TalentFestEngie/practica/distribution/image/reporte.jpg');
  img.setAttribute('alt', 'info');
  modalHead.appendChild(phrase);
  btnCl.appendChild(spanCl);
  modalHead.appendChild(btnCl);
  modalBo.appendChild(img);
  modalCont.appendChild(modalHead);
  modalCont.appendChild(modalBo);
  modalDlg.appendChild(modalCont);
  modalLook.appendChild(modalDlg)
  content.appendChild(modalLook);
}
const selectMonth = (e) => {
  const val = e.target.value;
  firebase.database().ref().child('Incidencia').on('value', function (data) {
    const incident = Object.values(data.val());
    content.innerHTML = '';
    incident.forEach((ele) => {
      Object.values(ele).forEach(el => {
        if (val === el.Mes) {
          chart(el);
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
          chart(e);
        }
      })
    })
  })
}
countries.addEventListener('change', selectCountries);