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
import { HarvestsResponse, HarvestUpdate } from "@interfaces/harvest.interface";

const HarvestForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [addHarvest, addStatus] = useAddHarvestMutation<ErrorI>();
  const [updateHarvest, updateStatus] = useUpdateHarvestMutation<ErrorI>();

  const { data: farmers } = useGetFarmsQuery<HarvestsResponse>(undefined);
  const { data: harvest } = useGetHarvestQuery(id!, { skip: !id });

  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [formData, setFormData] = useState<HarvestUpdate>({
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
      await alert(
        id ? FieldTypesList.UPDATE_SUCCESS : FieldTypesList.REGISTER_SUCCESS
      );
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
      maxValueYear={maxValueYear}
      farmers={farmers?.data ?? []}
      error={id ? updateStatus.error : addStatus.error}
      isLoading={id ? updateStatus.isLoading : addStatus.isLoading}
      reset={id ? updateStatus.reset : addStatus.reset}
      isError={id ? updateStatus.isError : addStatus.isError}
      id={id}
    />
  );
};

export default HarvestForm;
