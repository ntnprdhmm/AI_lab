let app = {
    _histTableElement: document.getElementById('hist-table'),
    _currentlistElement: document.getElementById('current'),
    _popsizeElement: document.getElementById('popsize'),
    _phraseElement: document.getElementById('phrase'),
    _rateElement: document.getElementById('rate'),
    _searchElement: document.getElementById('search')
}

let alphabet = 'abcdefghijklmnopqrstuvwxyz '.split('');

/**
 * init the app global, which contains the data for the GA
 */
function setup () {
    // target phrase
    app._target = app._phraseElement.value;
    if(!checkPhrase(app._target)) {
        app._target = "hello world abc";
    }
    // population size
    app._popsize = app._popsizeElement.value;
    if (isNaN(app._popsize)) {
        app._popsize = 1000;
    }
    // mutation rate
    app._mutation = app._rateElement.value;
    if (isNaN(app._mutation)) {
        app._mutation = 0.02;
    }
    // create the population
    app._population = new Population(app._target, app._popsize, app._mutation);
};

/**
 * Update the data on the screen
 */
function draw () {
    app._currentlistElement.innerHTML +=    '<tr>' +
                                                '<td>' + app._population._generation + '</td>' +
                                                '<td>' + app._population._best +'</td>' +
                                                '<td>' + app._population._bestScore + '</td>' +
                                            '</tr>';
}

/**
 * Clean the table
 */
function clean () {
    for (let i = 0; i < app._population._generation; i++) {
        app._currentlistElement.deleteRow(1);
    }
}

/**
 * check if the phrase contains only 
 * 
 * @param {any} str
 * 
 */
function checkPhrase (str) {
    for (let i = 0; i < str.length; i++) {
        if (alphabet.indexOf(str[i]) == -1) {
            return false;
        }
    }
    return true;
}

/**
 * Run the algorithm
 */
function run () {
    // while the phrase is still not found, run the algorithm
    while (!app._population._finished) {
        // generate the mating pool
        app._population.naturalSelection();
        // create the next generation
        app._population.generate();
        // calcultate the fitness
        app._population.calcFitness();
        // evaluate
        app._population.evaluate();
        draw();
    }
    // write the result in the hist
    app._histTableElement.innerHTML += '<tr>' +
                                            '<td>' + app._histTableElement.getElementsByTagName("tr").length + '</td>' +
                                            '<td>' + app._population._phrase + '</td>' + 
                                            '<td>' + app._population._generation + '</td>' + 
                                            '<td>' + app._population._population.length + '</td>' +
                                            '<td>' + app._population._mutation + '</td>' +
                                        '</tr>';
}

// add listener on search button
app._searchElement.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('ok');
    if (app._population) {
        clean();
    }
    setup();
    run();
    return false;
});