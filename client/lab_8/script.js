function initMap() {
    var map = L.map('map').setView([38.9866, -76.94], 15);
  
    // add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);    

    return map;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
   
  function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = ' ';
      list.forEach((item) => {
        const str = `<li>${item.name}</li>`;
        target.innerHTML += str
    });
  }
  
  function cutRestaurantList(list) {
    console.log('fired cut RestaurantList');
    const range = [...Array(15).keys()];
    return newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length -1);
      return list[index]
    })
  }
  
  /* A quick filter that will return something based on a matching input */
  function filterList(list, query) {
  return list.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }

  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterButton = document.querySelector('#filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector("#resto");

    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
    generateListButton.classList.add('hidden')

    let storedList = [];
    let currentList = []; // this is "scoped" to the main event function

    var map = initMap();

    // wait for the map to load
    await new Promise(resolve => map.on('load', resolve));

    // do something with the map, e.g. add markers, layers, etc.
    L.marker([38.8985, -77.0370]).addTo(map)
      .bindPopup('Washington Monument')
      .openPopup();    
    
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      console.log('loading data'); 
      loadAnimation.style.display = 'inline-block';
      //submitEvent.preventDefault();
  
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      storedList = await results.json();
      //currentList = await results.json();

      if (storedList.length > 0) {
        generateListButton.classList.remove('hidden')
      }

      loadAnimation.style.display = 'none';
      console.table(storedList);
    });
  
    filterButton.addEventListener('click', (event) => {
      console.log('clicked filterButton');

      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);

      console.log(formProps);
      const filteredList = filterList(storedList, formProps.resto);

      console.log(filteredList);
      injectHTML(filteredList);
    });
  
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list')
      currentList = cutRestaurantList(storedList);
    
      console.log(currentList);
      injectHTML(currentList);
    });

    textField.addEventListener('input', (event) => {
      console.log('input', event.target.value);
      const newList = filterList(storedList, event.target.value);
      
      console.log(newList);
      injectHTML(newList);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests