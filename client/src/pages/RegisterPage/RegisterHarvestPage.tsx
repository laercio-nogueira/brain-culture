import React, { useState } from "react";
import { useGetFarmsQuery } from "@store/states/farm/farmApi";
import { useAddHarvestMutation } from "@store/states/harvest/harvestApi";
import { ErrorI } from "@interfaces/error.interface";
import { FieldTypesList } from "@interfaces/fields.interface";
import RegisterHarvestTemplate from "@templates/registerTemplates/RegisterHarvestTemplate";

const HarvestForm: React.FC = () => {
  const { data: farmers } = useGetFarmsQuery();
  const [addHarvest, { isLoading, error, isError, reset }] =
    useAddHarvestMutation<ErrorI>();
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    name: "",
    year: 0,
    farmId: "",
  });

  const isErrorFields = () => {
    setFieldErrors({
      name: !formData.name ? FieldTypesList.REQUIRED : null,
      year: !formData.year ? FieldTypesList.REQUIRED : null,
    });

    const { name, year } = formData;

    return !name || !year;
  };

  const handleSubmit = async () => {
    if (isErrorFields()) return;

    const result = await addHarvest(formData);

    if (!result.error) {
      await alert(FieldTypesList.REGISTER_HARVEST_SUCCESS);
      location.replace("/harvest");
    }
  };

  const maxValueYear = (value: number) =>
    Math.min(Number(value), new Date().getFullYear());

  return (
    <RegisterHarvestTemplate
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      error={error}
      isLoading={isLoading}
      reset={reset}
      maxValueYear={maxValueYear}
      farmers={farmers}
      isError={isError}
    />
  );
};

export default HarvestForm;
