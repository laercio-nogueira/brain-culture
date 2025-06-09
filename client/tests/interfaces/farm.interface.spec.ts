import {
  Farm,
  FarmState,
  FarmCreate,
  FarmUpdate,
} from "@interfaces/farm.interface";
import { Harvest } from "@interfaces/harvest.interface";

describe("Farm interfaces structure", () => {
  const mockHarvest: Harvest = {
    id: "harvest-1",
    name: "Safra 2024",
    year: 2024,
    createdAt: new Date("2024-05-01"),
    crops: [],
    farmId: "",
  };

  test("Farm object should match interface", () => {
    const farm: Farm = {
      id: "farm-123",
      name: "Fazenda Sol",
      city: "Cuiabá",
      state: "MT",
      totalArea: 1000,
      vegetatedArea: 500,
      farmerId: "farmer-1",
      createdAt: "2024-05-01",
      harvests: [mockHarvest],
      cultivatedArea: 8,
    };

    expect(farm.name).toBe("Fazenda Sol");
    expect(farm.harvests[0].name).toBe("Safra 2024");
  });

  test("FarmState should contain array of farms", () => {
    const farmState: FarmState = {
      farms: [
        {
          id: "farm-001",
          name: "Fazenda Lua",
          city: "Rondonópolis",
          state: "MT",
          totalArea: 800,
          vegetatedArea: 400,
          cultivatedArea: 8,
          farmerId: "farmer-2",
          createdAt: "2023-12-12",
          harvests: [],
        },
      ],
    };

    expect(farmState.farms.length).toBe(1);
    expect(farmState.farms[0].city).toBe("Rondonópolis");
  });

  test("FarmCreate should allow creating a farm without id", () => {
    const farmCreate: FarmCreate = {
      name: "Nova Fazenda",
      city: "Sinop",
      state: "MT",
      totalArea: 1200,
      cultivatedArea: 700,
      vegetatedArea: 300,
      farmerId: "farmer-3",
    };

    expect(farmCreate.name).toBe("Nova Fazenda");
  });

  test("FarmUpdate may optionally include id", () => {
    const farmUpdate: FarmUpdate = {
      id: "farm-999",
      name: "Fazenda Atualizada",
      city: "Lucas do Rio Verde",
      state: "MT",
      totalArea: 1100,
      cultivatedArea: 600,
      vegetatedArea: 400,
      farmerId: "farmer-4",
    };

    expect(farmUpdate.id).toBe("farm-999");
  });
});
