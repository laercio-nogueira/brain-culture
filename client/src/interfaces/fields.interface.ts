export enum FieldTypes {
  REQUIRED = "REQUIRED",
  EXTENDED_TOTAL_AREA = "EXTENDED_TOTAL_AREA",
  REGISTER_FARM_SUCCESS = "REGISTER_FARM_SUCCESS",
  REGISTER_CROP_SUCCESS = "REGISTER_CROP_SUCCESS",
  REGISTER_FARMER_SUCCESS = "REGISTER_FARMER_SUCCESS",
  REGISTER_HARVEST_SUCCESS = "REGISTER_HARVEST_SUCCESS",
}

export const FieldTypesList = {
  [FieldTypes.REQUIRED]: "Campo Obrigatório",
  [FieldTypes.EXTENDED_TOTAL_AREA]:
    "A soma da vegetacao e area cultivada deve ser menor que a area total",
  [FieldTypes.REGISTER_FARM_SUCCESS]: "Fazenda cadastrada com sucesso!",
  [FieldTypes.REGISTER_CROP_SUCCESS]: "Cultura cadastrada com sucesso!",
  [FieldTypes.REGISTER_FARMER_SUCCESS]: "Proprietário cadastrado com sucesso!",
  [FieldTypes.REGISTER_HARVEST_SUCCESS]: "Safra cadastrada com sucesso!",
};
