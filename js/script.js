window.onload = function init() {
  const today = getCurrentDate();
  const day = today.getDate();

  getHaiku(day)
    .then(haiku => {
      document.getElementById('haiku').innerHTML = haiku;
    })
    .catch(error => {
      console.error(error);
    });

  displayCurrentDate(today);
};

function getCurrentDate() {
  const today = new Date();
  return today;
}

function getHaiku(day) {
  return new Promise((resolve, reject) => {
    fetch('haikus/haikus.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        const haiku = data.haikus[day];
        resolve(haiku);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function displayCurrentDate(today) {
  const year = today.getFullYear();
  const day = today.getDate();
  const weekday = weekDays[today.getDay()];
  const month = months[today.getMonth()];

  document.getElementById('current_date_time').innerHTML = (
    weekday + ', ' + day + ' de ' + month + ' de ' + year
  );
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const weekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado'
];