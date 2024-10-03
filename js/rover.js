// toggle switch
let oppToggle = document.getElementById('opportunity');
// get node in DOM
let oppNode = document.getElementById('opportunityForm');

oppToggle.addEventListener('click', () => {
    if (oppNode.getAttribute('data-visible') === 'false') {
        oppNode.setAttribute('data-visible', 'true');
        oppNode.style.display = 'block';
    } else {
        oppNode.setAttribute('data-visible', 'false');
        oppNode.style.display = 'none'
    }

});

// toggle switch
let spiritToggle = document.getElementById('spirit');
// get node in DOM
let spiritNode = document.getElementById('spiritForm');

spiritToggle.addEventListener('click', () => {
    if (spiritNode.getAttribute('data-visible') === 'false') {
        spiritNode.setAttribute('data-visible', 'true');
        spiritNode.style.display = 'block';
    } else {
        spiritNode.setAttribute('data-visible', 'false');
        spiritNode.style.display = 'none'
    }

});

// toggle switch
let curiosityToggle = document.getElementById('curiosity');
// get node in DOM
let curiosityNode = document.getElementById('curiosityForm');

curiosityToggle.addEventListener('click', () => {
    if (curiosityNode.getAttribute('data-visible') === 'false') {
        curiosityNode.setAttribute('data-visible', 'true');
        curiosityNode.style.display = 'block';
    } else {
        curiosityNode.setAttribute('data-visible', 'false');
        curiosityNode.style.display = 'none'
    }

});

// toggle switch
let perseveranceToggle = document.getElementById('perseverance');
// get node in DOM
let perseveranceNode = document.getElementById('perseveranceForm');

perseveranceToggle.addEventListener('click', () => {
    if (perseveranceNode.getAttribute('data-visible') === 'false') {
        perseveranceNode.setAttribute('data-visible', 'true');
        perseveranceNode.style.display = 'block';
    } else {
        perseveranceNode.setAttribute('data-visible', 'false');
        perseveranceNode.style.display = 'none'
    }

});