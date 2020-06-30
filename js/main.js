'use strict';

function getStates() {
   return fetch('json/state.json')
      .then(res => res.json())
      .then(data => data);
}

const search = document.querySelector('#search-field');
const statesLengthElement = document.querySelector('#states-length');
const stateList = document.querySelector('#states-list');
let states;

(async function() {
   states = await getStates();
   console.log(states);

   search.addEventListener('keyup', checkSearchText);
}());

function checkSearchText(evt) {
   if(search.value.length >= 1) {
      let inputValue = evt.target.value.toLowerCase();
      let nameRegex = new RegExp(`^${inputValue}`, 'ig');
      let abbrRegex = new RegExp(`^${inputValue}$`, 'ig');
      
      // array that holds the matched states
      let findedStates = states.filter(current => {
         let nameMatched = current.name.match(nameRegex);
         let abbrMatched = current.abbr.match(abbrRegex);         
   
         return (nameMatched || abbrMatched) ? true : false
      });
      
      if(findedStates.length >= 1) { // clean list and create the list items
         stateList.innerHTML = '';
         createListElements(findedStates);
      } else { // clean list
         stateList.innerHTML = '';
         statesLengthElement.textContent = 'States: 0';
      }

   } else {
      stateList.innerHTML = '';
      statesLengthElement.textContent = 'States: 0';
   }
}

function createListElements(listOfStates) {
   listOfStates.forEach(state => {
      stateList.innerHTML += `
         <li class="states-list__li">
            <h2 class="states-list__heading">${state.name} (${state.abbr}) <span class="states-list__heading-capital">${state.capital}</span></h2>
            <p class="states-list__length">Lat: ${state.lat} / Long: ${state.long}</p>
         </li>
      `;
   });

   statesLengthElement.textContent = `States ${listOfStates.length}`;
}