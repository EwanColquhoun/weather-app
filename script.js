import { API_KEY } from './creds.js'

document.getElementById('submit-wx').addEventListener('click', (e,) => {
clearwx()
getMetar()
getTaf()
});

function getMetar() {
  let icao = document.getElementById('icao').value;
  let wxAddress = 'https://api.checkwx.com/metar/'+`${icao}`;
  var xhttp = new XMLHttpRequest();
  let wxDiv = document.getElementById('wx')
  wxDiv.classList.remove('hidden');
  wxDiv.classList.add('block');
  
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
          let mt = JSON.parse(this.responseText);
          let metar = mt.data
          showMetar(metar)
    }
  };
  
  xhttp.open("GET", wxAddress, true);
  xhttp.setRequestHeader('X-API-Key', API_KEY);
  xhttp.send();
}

function getTaf() {
  let icao = document.getElementById('icao').value;
  let wxAddress = 'https://api.checkwx.com/taf/'+`${icao}`;
  var xhttp = new XMLHttpRequest();
  let tafDiv = document.getElementById('taf')
  tafDiv.classList.remove('hidden');
  tafDiv.classList.add('block');

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          let fc = JSON.parse(this.responseText);
          let taf = fc.data
          showTaf(taf)
    }
  };

  xhttp.open("GET", wxAddress, true);
  xhttp.setRequestHeader('X-API-Key', API_KEY);
  xhttp.send();
}

function clearwx() {
  let content = document.getElementById('wxResults');
  let tafContent = document.getElementById('tafResults')
  tafContent.innerHTML = ''
  content.innerHTML = ''
}

function showMetar(weather) {
    let wx = weather
    // console.log(weather)
    let content = document.getElementById('wxResults');
    for (let metar of wx) {
        content.innerHTML += `<span class='block'>${metar}</span>`;
    };
    
};

function showTaf(weather) {
  let wx = weather
  // console.log(weather)
  let content = document.getElementById('tafResults');
  for (let taf of wx) {
     content.innerHTML += `<span class='block'>${taf}</span><br>`;
  };
};