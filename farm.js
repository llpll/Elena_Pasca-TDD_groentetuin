const getYieldForPlant = (plant, environmentFactors = null) => {
    let modifier = 0;
    if (environmentFactors) {
        for (const factor in environmentFactors) {
            let factorValue = environmentFactors[factor];
            // check if this plant is influenced by this factor
            if (plant['factors'][factor]) {
                modifier += plant['factors'][factor][factorValue];
            }
        }
    }
    
    return plant.yield * ((100 + modifier)/100);
};

const getYieldForCrop = (input,environmentFactors = null) => {
    return getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
};

const getTotalYield = (input, environmentFactors = null) => {
    let total = 0;

    input.crops.forEach(crop => {
        total += getYieldForCrop(crop, environmentFactors); 
    });

    return total;
};

const getCostsForCrop = (input) => {
    return input.crop.costPerSeed * input.crop.totalPlanted * input.numCrops;
}

const getRevenueForCrop = (input, environmentFactors = null) => {
    return input.numCrops * input.crop.sellingPrice * getYieldForCrop(input, environmentFactors);
}

const getProfitForCrop = (input, environmentFactors = null) => {
    return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input,);
}

const getTotalProfitForCrops = (input, environmentFactors = null) => {
    let total = 0;

    input.crops.forEach(crop => {
        total += getProfitForCrop(crop, environmentFactors); 
    });

    return total;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfitForCrops
};