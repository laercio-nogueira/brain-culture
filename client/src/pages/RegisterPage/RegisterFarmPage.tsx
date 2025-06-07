import React, { useState } from "react";
import { useGetFarmersQuery } from "../../store/states/farmer/farmerApi";
import { useAddFarmMutation } from "../../store/states/farm/farmApi";
import { ErrorI } from "../../interfaces/error.interface";
import RegisterFarmTemplate from "../../templates/registerTemplates/RegisterFarmTemplate";
import { FieldTypesList } from "../../interfaces/fields.interface";

const FarmForm: React.FC = () => {
  const [addFarm, { isLoading, error, isError, reset }] =
    useAddFarmMutation<ErrorI>();

  const { data: farmers } = useGetFarmersQuery();
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    totalArea: 0,
    cultivatedArea: 0,
    vegetatedArea: 0,
    farmerId: "",
  });

  const validateTotalArea = () => {
    const { totalArea, cultivatedArea, vegetatedArea } = formData;
    if (!totalArea) return FieldTypesList.REQUIRED;
    return totalArea <= cultivatedArea + vegetatedArea
      ? FieldTypesList.EXTENDED_TOTAL_AREA
      : null;
  };

  const isErrorFields = () => {
    setFieldErrors({
      name: !formData.name ? FieldTypesList.REQUIRED : null,
      city: !formData.city ? FieldTypesList.REQUIRED : null,
      state: !formData.state ? FieldTypesList.REQUIRED : null,
      totalArea: validateTotalArea(),
      cultivatedArea: !formData.cultivatedArea ? FieldTypesList.REQUIRED : null,
      vegetatedArea: !formData.vegetatedArea ? FieldTypesList.REQUIRED : null,
    });

    const { name, city, state, totalArea, cultivatedArea, vegetatedArea } =
      formData;

    return (
      !name ||
      !city ||
      !state ||
      !totalArea ||
      validateTotalArea() ||
      !cultivatedArea ||
      !vegetatedArea
    );
  };

  const maxValueArea = (value: number) => Math.min(Number(value), 9999999);

  const handleSubmit = async () => {
    if (isErrorFields()) return;

    const result = await addFarm(formData);

    if (!result.error) {
      await alert(FieldTypesList.REGISTER_FARM_SUCCESS);
      location.replace("/farm");
    }
  };

  return (
    <RegisterFarmTemplate
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      maxValueArea={maxValueArea}
      farmers={farmers}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      isError={isError}
      reset={reset}
    />
  );
};

export default FarmForm;
