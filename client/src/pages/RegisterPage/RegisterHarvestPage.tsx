import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetFarmsQuery } from "@store/states/farm/farmApi";
import {
  useAddHarvestMutation,
  useGetHarvestQuery,
  useUpdateHarvestMutation,
} from "@store/states/harvest/harvestApi";
import { ErrorI } from "@interfaces/error.interface";
import { FieldTypesList } from "@interfaces/fields.interface";
import RegisterHarvestTemplate from "@templates/registerTemplates/RegisterHarvestTemplate";
import { Harvest } from "@store/interfaces/harvest.interface";

const HarvestForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: farmers } = useGetFarmsQuery();
  const [addHarvest, { isLoading, error, isError, reset }] =
    useAddHarvestMutation<ErrorI>();
  const [updateHarvest] = useUpdateHarvestMutation();
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const { data: harvest } = useGetHarvestQuery(id!, {
    skip: !id,
  });
  const [formData, setFormData] = useState<any>({
    name: "",
    year: 0,
    farmId: "",
  });

  useEffect(() => {
    if (harvest) setFormData(harvest);
  }, [harvest]);

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

    const result = id
      ? await updateHarvest(formData)
      : await addHarvest(formData);

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
