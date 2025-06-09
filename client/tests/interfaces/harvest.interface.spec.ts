import {
  Harvest,
  HarvestState,
  HarvestCreate,
  HarvestUpdate,
} from "@interfaces/harvest.interface";
import { Crop } from "@interfaces/crop.interface";

describe("Harvest interfaces structure", () => {
  const mockCrop: Crop = {
    id: "crop-001",
    name: "Milho",
    harvestId: "harvest-001",
    createdAt: new Date("2024-01-01"),
  };

  test("Harvest should match structure", () => {
    const harvest: Harvest = {
      id: "harvest-001",
      name: "Safra Verão",
      year: 2024,
      farmId: "farm-001",
      createdAt: new Date("2024-01-01"),
      crops: [mockCrop],
    };

    expect(harvest.name).toBe("Safra Verão");
    expect(harvest.year).toBe(2024);
    expect(harvest.crops[0].name).toBe("Milho");
    expect(harvest.createdAt).toBeInstanceOf(Date);
  });

  test("HarvestState should hold an array of harvests", () => {
    const state: HarvestState = {
      harvests: [
        {
          id: "harvest-002",
          name: "Safra Inverno",
          year: 2023,
          farmId: "farm-002",
          createdAt: new Date("2023-06-01"),
          crops: [],
        },
      ],
    };

    expect(state.harvests).toHaveLength(1);
    expect(state.harvests[0].year).toBe(2023);
  });

  test("HarvestCreate should contain name, year, farmId", () => {
    const create: HarvestCreate = {
      name: "Nova Safra",
      year: 2025,
      farmId: "farm-003",
    };

    expect(create.name).toBe("Nova Safra");
    expect(create.year).toBe(2025);
  });

  test("HarvestUpdate may optionally include id", () => {
    const update: HarvestUpdate = {
      id: "harvest-003",
      name: "Atualização de Safra",
      year: 2022,
      farmId: "farm-004",
    };

    expect(update.id).toBe("harvest-003");
    expect(update.name).toBe("Atualização de Safra");
  });
});
