import React, { useEffect, useState } from "react";
import { useGetFarmersQuery } from "@store/states/farmer/farmerApi";
import {
  useAddFarmMutation,
  useGetFarmQuery,
  useUpdateFarmMutation,
} from "@store/states/farm/farmApi";
import { ErrorI } from "@interfaces/error.interface";
import RegisterFarmTemplate from "@templates/registerTemplates/RegisterFarmTemplate";
import { FieldTypesList } from "@interfaces/fields.interface";
import { useParams } from "react-router";
import { FarmsResponse, FarmUpdate } from "@interfaces/farm.interface";

const FarmForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [addFarm, addStatus] = useAddFarmMutation<ErrorI>();
  const [updateFarm, updateStatus] = useUpdateFarmMutation();

  const { data: farmers } = useGetFarmersQuery<FarmsResponse>(undefined);
  const { data: farm } = useGetFarmQuery(id!, { skip: !id });

  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [formData, setFormData] = useState<FarmUpdate>({
    name: "",
    city: "",
    state: "",
    totalArea: 0,
    cultivatedArea: 0,
    vegetatedArea: 0,
    farmerId: "",
  });

  useEffect(() => {
    if (farm) setFormData(farm);
  }, [farm]);

  const validateTotalArea = () => {
    const { totalArea, cultivatedArea, vegetatedArea } = formData;
    if (!totalArea) return FieldTypesList.REQUIRED;

    return totalArea < cultivatedArea + vegetatedArea
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

    const result = id ? await updateFarm(formData) : await addFarm(formData);

    if (!result.error) {
      await alert(
        id ? FieldTypesList.UPDATE_SUCCESS : FieldTypesList.REGISTER_SUCCESS
      );
      location.replace("/farm");
    }
  };

  return (
    <RegisterFarmTemplate
      formData={formData}
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      maxValueArea={maxValueArea}
      farmers={farmers?.data || []}
      handleSubmit={handleSubmit}
      isLoading={id ? updateStatus.isLoading : addStatus.isLoading}
      error={id ? updateStatus.error : addStatus.error}
      isError={id ? updateStatus.isError : addStatus.isError}
      reset={id ? updateStatus.reset : addStatus.reset}
      id={id}
    />
  );
};

export default FarmForm;
