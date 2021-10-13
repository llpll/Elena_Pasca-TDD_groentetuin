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

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield
};