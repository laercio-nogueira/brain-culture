import { FieldTypes, FieldTypesList } from "@interfaces/fields.interface";

describe("FieldTypes enum", () => {
  test("should contain all expected keys and values", () => {
    expect(FieldTypes.REQUIRED).toBe("REQUIRED");
    expect(FieldTypes.EXTENDED_TOTAL_AREA).toBe("EXTENDED_TOTAL_AREA");
    expect(FieldTypes.REGISTER_SUCCESS).toBe("REGISTER_SUCCESS");
    expect(FieldTypes.UPDATE_SUCCESS).toBe("UPDATE_SUCCESS");
  });
});

describe("FieldTypesList mapping", () => {
  test("should map FieldTypes to correct messages", () => {
    expect(FieldTypesList[FieldTypes.REQUIRED]).toBe("Campo Obrigatório");
    expect(FieldTypesList[FieldTypes.EXTENDED_TOTAL_AREA]).toBe(
      "A soma da vegetacao e area cultivada deve ser menor que a area total"
    );
    expect(FieldTypesList[FieldTypes.REGISTER_SUCCESS]).toBe(
      "Cadastrada com sucesso!"
    );
    expect(FieldTypesList[FieldTypes.UPDATE_SUCCESS]).toBe(
      "Atualizada com sucesso!"
    );
  });
});
