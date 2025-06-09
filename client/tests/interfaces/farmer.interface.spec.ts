import {
  Farmer,
  FarmerState,
  FarmerCreate,
  FarmerUpdate,
} from "@interfaces/farmer.interface";
import { Farm } from "@interfaces/farm.interface";

describe("Farmer interfaces structure", () => {
  const mockFarm: Farm = {
    id: "farm-001",
    name: "Fazenda Esperança",
    city: "Sorriso",
    state: "MT",
    totalArea: 1000,
    vegetatedArea: 300,
    farmerId: "farmer-001",
    createdAt: "2024-01-01",
    harvests: [],
    cultivatedArea: 8,
  };

  test("Farmer should have correct structure", () => {
    const farmer: Farmer = {
      id: "farmer-001",
      name: "João da Silva",
      document: "12345678900",
      documentType: "CPF",
      farms: [mockFarm],
      createdAt: new Date("2024-05-10"),
    };

    expect(farmer.name).toBe("João da Silva");
    expect(farmer.farms[0].name).toBe("Fazenda Esperança");
    expect(farmer.createdAt instanceof Date).toBe(true);
  });

  test("FarmerState should hold a list of farmers", () => {
    const state: FarmerState = {
      farmers: [
        {
          id: "farmer-002",
          name: "Maria Oliveira",
          document: "98765432100",
          documentType: "CPF",
          farms: [],
          createdAt: new Date("2024-01-01"),
        },
      ],
    };

    expect(state.farmers.length).toBe(1);
    expect(state.farmers[0].documentType).toBe("CPF");
  });

  test("FarmerCreate should have required fields", () => {
    const create: FarmerCreate = {
      name: "Pedro Alves",
      document: "11223344556",
      documentType: "CPF",
    };

    expect(create.name).toBe("Pedro Alves");
    expect(create.documentType).toBe("CPF");
  });

  test("FarmerUpdate may include id", () => {
    const update: FarmerUpdate = {
      id: "farmer-003",
      name: "Carlos Lima",
      document: "99887766554",
      documentType: "CNPJ",
    };

    expect(update.id).toBe("farmer-003");
    expect(update.documentType).toBe("CNPJ");
  });
});
