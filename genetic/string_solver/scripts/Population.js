class Population {

    /**
     * Creates an instance of Population.
     * 
     * @param {any} phrase      => the target
     * @param {any} len         => the populationLength
     * @param {any} mutation    => the mutation rate
     * 
     */
    constructor (phrase, len, mutation) {
        this._phrase = phrase;          // the phrase to search
        this._population = [];          // Array of DNA (the current generation)
        this._mutation = mutation;      // mutation rate
        this._generation = 0;           // number of generation 
        this._matingPool = [];          // the next generation of DNA
        this._best = "";                // store the best phrase found in the last generation
        this._bestScore = 0;            // fitness of the best phrase
        this._finished = false;         // true when the phrase has been found

        this.initPopulation(len, phrase.length);
    }

    /**
     * Init the population of DNA
     * 
     * @param {any} populationLength
     * @param {any} phraseLength
     * 
     */
    initPopulation (populationLength, phraseLength) {
        for (let i = 0; i < populationLength; i++) {
            this._population[i] = new DNA(phraseLength);
        }
        this.calcFitness();
    }

    /**
     * Calculate the fitness of each DNA of this population on this.phrase
     * 
     */
    calcFitness () {
        for (let i = 0; i < this._population.length; i++) {
            this._population[i].calcFitness(this._phrase);
        }
    }

    /**
     * Create a mating pool
     * 
     */
    naturalSelection () {
        // clear the next population
        this._matingPool = []; 
        // get the max fitness of the current population
        let maxFitness = 0;
        for (let i = 0; i < this._population.length; i++) {
            if (this._population[i]._fitness > maxFitness) {
                maxFitness = this._population[i]._fitness;
            }
        }
        // selection by probability based on DNA fitness
        for (let i = 0; i < this._population.length; i++) {
            let n = Math.floor((this._population[i]._fitness / maxFitness) * 100);  
            for (let j = 0; j < n; j++) {              
                this._matingPool.push(this._population[i]);
            }
        }
    }

    /**
     * Create the new generation from the mating pool
     * 
     */
    generate () {
        // Refill the population with DNA selected in the mating pool
        for (let i = 0; i < this._population.length; i++) {
            // choose 2 DNA in the mating pool randomly
            let dna_a = this._matingPool[Math.floor(Math.random() * this._matingPool.length)];
            let dna_b = this._matingPool[Math.floor(Math.random() * this._matingPool.length)];
            // cross the 2 DNA and call mutation function on it
            let child = dna_a.crossover(dna_b);
            child.mutate(this._mutation);
            this._population[i] = child;
        }
        this._generation++;
    }

    /**
     * Search the best phrase in the population and check if it's the target phrase
     * 
     */
    evaluate () {
        let score = 0;
        let index = 0;

        for (let i = 0; i < this._population.length; i++) {
            if (this._population[i]._fitness > score) {
                index = i;
                score = this._population[i]._fitness;
            }
        }

        this._best = this._population[index].phrase;
        this._bestScore = score;
        // check if the best phrase is the right
        if (score == 1) {
            this._finished = true;
        }
    }

}