const loadDataButton = document.getElementById('load-data');
const regionSelect = document.getElementById('select-regioes');
const municipiosSelect = document.getElementById('select-municipios');

function cleanTag(element) {
  element.innerHTML = null;
}

async function fetchData() {
  try {
    if (regionSelect.hasChildNodes()) {
      cleanTag(regionSelect);
    }
    const response = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/regioes',
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    data.forEach((region) => {
      const option = document.createElement('option');
      option.value = region.id;
      option.innerHTML = region.nome;
      regionSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMunicipios() {
  const regiaoId = document.getElementById('select-regioes').value;
  cleanTag(municipiosSelect);
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiaoId}/municipios`
    );
    const data = await response.json();
    data.forEach((region) => {
      const option = document.createElement('option');
      option.value = region.id;
      option.innerHTML = region.nome;
      municipiosSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

loadDataButton.addEventListener('click', fetchData);
regionSelect.addEventListener('change', getMunicipios);
