const getYieldForPlant = (plant) => {
    return plant.yield;
};

const getYieldForCrop = (input) => {
    return getYieldForPlant(input.crop) * input.numCrops;
};

const getTotalYield = (input) => {
    let total = 0;

    input.crops.forEach(crop => {
        total += getYieldForCrop(crop); 
    });

    return total;
};

const getCostsForCrop = (input) => {
    return input.crop.costPerSeed * input.crop.totalPlanted * input.numCrops;
}

const getRevenueForCrop = (input) => {
    return input.numCrops * input.crop.sellingPrice * getYieldForCrop(input);
}

const getProfitForCrop = (input) => {
    return getRevenueForCrop(input) - getCostsForCrop(input);
}

const getTotalProfitForCrops = (input) => {
    let total = 0;

    input.crops.forEach(crop => {
        total += getProfitForCrop(crop); 
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