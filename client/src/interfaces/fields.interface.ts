export enum FieldTypes {
  REQUIRED = "REQUIRED",
  EXTENDED_TOTAL_AREA = "EXTENDED_TOTAL_AREA",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  UPDATE_SUCCESS = "UPDATE_SUCCESS",
}

export const FieldTypesList = {
  [FieldTypes.REQUIRED]: "Campo Obrigatório",
  [FieldTypes.EXTENDED_TOTAL_AREA]:
    "A soma da vegetacao e area cultivada deve ser menor que a area total",
  [FieldTypes.REGISTER_SUCCESS]: "Cadastrada com sucesso!",
  [FieldTypes.UPDATE_SUCCESS]: "Atualizada com sucesso!",
};
