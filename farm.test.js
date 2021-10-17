const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop,getRevenueForCrop, getProfitForCrop, getTotalProfitForCrops } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    const corn = {
        costPerSeed: 1,
        totalPlanted: 200
    };

    const input = {
        crop: corn,
        numCrops: 10,
    };

    test("Get cost for crop with no environment factors", () => {
        expect(getCostsForCrop(input)).toBe(2000);
    });
});

describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        sellingPrice: 6
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };

    test("Get revenue for crop with no environment factors", () => {
        expect(getRevenueForCrop(input)).toBe(1800);
    });
});

describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        sellingPrice: 10,
        costPerSeed: 1,
        totalPlanted: 200,
    };

    const input = {
        crop: corn,
        numCrops: 10,
    };

    test("Get profit for crop with no environment factors", () => {
        expect(getProfitForCrop(input)).toBe(1000);
    });
});

describe("getTotalProfitForCrops", () => {
    const corn = {
        name: "corn",
        yield: 3,
        sellingPrice: 10,
        costPerSeed: 1,
        totalPlanted: 200,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 5,
        sellingPrice: 5,
        costPerSeed: 1,
        totalPlanted: 100,
    };
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];

    test("Get total profit for crops with no environment factors", () => {
        expect(getTotalProfitForCrops({ crops })).toBe(-350);
    });
});
