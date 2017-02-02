let app = {
    _histTableElement: document.getElementById('hist-table'),
    _currentResults: document.getElementById('results-body'),
    _popsizeElement: document.getElementById('popsize'),
    _sentenceElement: document.getElementById('sentence'),
    _rateElement: document.getElementById('rate'),
    _searchElement: document.getElementById('search')
}

let alphabet = 'abcdefghijklmnopqrstuvwxyz '.split('');

/**
 * init the app global, which contains the data for the GA
 */
function setup () {
    // target sentence
    app._target = app._sentenceElement.value;
    if(!checkSentence(app._target)) {
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
    app._currentResults.innerHTML +=    '<tr>' +
                                            '<th class="first">' + app._population._generation + '</th>' +
                                            '<td>' + app._population._best +'</td>' +
                                            '<td>' + Math.round(app._population._bestScore * 100) / 100 + '</td>' +
                                        '</tr>';
}

/**
 * Clean the table
 */
function clean () {
    app._currentResults.innerHTML = "";
}

/**
 * check if the sentence contains only 
 * 
 * @param {any} str
 * 
 */
function checkSentence (str) {
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
    // while the sentence is still not found, run the algorithm
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
                                            '<td>' + app._population._sentence + '</td>' + 
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