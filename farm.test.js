const { 
    getYieldForPlant, getYieldForCrop, getTotalYield, 
    getCostsForCrop,getRevenueForCrop, getProfitForCrop, getTotalProfitForCrops
} = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factors: {
          sun: {
            low: -50,
            medium: 0,
            high: 50,
          },
          wind: {
            low: 0,
            medium: -50,
            high: -70,
          },
          rain: {
            low: -30,
            medium: 50,
            high: -20,
          },
        },
      };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with environment factor", () => {
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test("Get yield for plant with environment factors", () => {
        const environmentFactors = {
            sun: "high",
            rain: "medium",
            wind: "low"
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(60);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                  low: -50,
                  medium: 0,
                  high: 50,
                },
            }
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(15);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                  low: -50,
                  medium: 0,
                  high: 50,
                },
                wind: {
                    low: 0,
                    medium: -50,
                    high: -70,
                },
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                  low: -50,
                  medium: 0,
                  high: 50,
                },
                rain: {
                    low: -30,
                    medium: 20,
                    high: 30,
                },
            }
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];

        const environmentFactors = {
            sun: "high",
            rain: "medium",
            wind: "low"
        };
        expect(getTotalYield({ crops }, environmentFactors)).toBe(36.1);
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

    test("Get cost for crop", () => {
        expect(getCostsForCrop(input)).toBe(2000);
    });
});

describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        sellingPrice: 6,
        factors: {
            sun: {
              low: -50,
              medium: 0,
              high: 50,
            },
            wind: {
                low: 0,
                medium: -50,
                high: -70,
            },
        }
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    
    test("Get revenue for crop with no environment factors", () => {
        expect(getRevenueForCrop(input)).toBe(1800);
    });

    test("Get revenue for crop with environment factors", () => {
        const environmentFactors = {
            sun: "high",
            rain: "medium",
            wind: "low"
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(2700);
    });
});

describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        sellingPrice: 10,
        costPerSeed: 1,
        totalPlanted: 200,
        factors: {
            sun: {
              low: -50,
              medium: 0,
              high: 50,
            },
            wind: {
                low: 0,
                medium: -50,
                high: -70,
            },
        }
    };

    const input = {
        crop: corn,
        numCrops: 10,
    };

    test("Get profit for crop with no environment factors", () => {
        expect(getProfitForCrop(input)).toBe(1000);
    });
    test("Get profit for crop with environment factors", () => {
        const environmentFactors = {
            sun: "high",
            rain: "medium",
            wind: "low"
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(2500);
    });
    
});

describe("getTotalProfitForCrops", () => {
    const corn = {
        name: "corn",
        yield: 3,
        sellingPrice: 10,
        costPerSeed: 1,
        totalPlanted: 200,
        factors: {
            sun: {
              low: -50,
              medium: 0,
              high: 50,
            },
            wind: {
                low: 0,
                medium: -50,
                high: -70,
            },
        }
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 5,
        sellingPrice: 5,
        costPerSeed: 1,
        totalPlanted: 100,
        factors: {
            sun: {
              low: -50,
              medium: 0,
              high: 50,
            },
            rain: {
                low: -30,
                medium: 20,
                high: 30,
            },
        }
    };
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];

    test("Get total profit for crops with no environment factors", () => {
        expect(getTotalProfitForCrops({ crops })).toBe(-350);
    });

    test("Get total profit for crops with environment factors", () => {
        const environmentFactors = {
            sun: "high",
            rain: "medium",
            wind: "low"
        };
        expect(getTotalProfitForCrops({ crops }, environmentFactors )).toBe(95);
    });
});



