import {
  Crop,
  CropState,
  CropCreate,
  CropUpdate,
} from "@interfaces/crop.interface";

describe("Crop interfaces structure", () => {
  test("Crop object should match interface structure", () => {
    const crop: Crop = {
      createdAt: new Date(),
      harvestId: "harvest-123",
      id: "crop-456",
      name: "Soja",
    };

    expect(crop.name).toBe("Soja");
    expect(crop.harvestId).toMatch(/harvest/);
  });

  test("CropState should hold an array of crops", () => {
    const cropState: CropState = {
      crops: [
        {
          createdAt: new Date(),
          harvestId: "harvest-001",
          id: "crop-001",
          name: "Milho",
        },
      ],
    };

    expect(cropState.crops).toHaveLength(1);
    expect(cropState.crops[0].name).toBe("Milho");
  });

  test("CropCreate should contain only name and harvestId", () => {
    const newCrop: CropCreate = {
      name: "Arroz",
      harvestId: "harvest-999",
    };

    expect(newCrop.name).toBe("Arroz");
  });

  test("CropUpdate should optionally contain id", () => {
    const updatedCrop: CropUpdate = {
      name: "Trigo",
      harvestId: "harvest-888",
      id: "crop-888",
    };

    expect(updatedCrop.id).toBeDefined();
  });
});
