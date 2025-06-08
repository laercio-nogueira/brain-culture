import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useAddCropMutation,
  useUpdateCropMutation,
  useGetCropQuery,
} from "@store/states/crop/cropApi";
import { useGetHarvestsQuery } from "@store/states/harvest/harvestApi";
import RegisterCropTemplate from "@templates/registerTemplates/RegisterCropTemplate";
import { FieldTypesList } from "@interfaces/fields.interface";
import { CropUpdate } from "@interfaces/crop.interface";

const CultureFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [addCrop, addStatus] = useAddCropMutation();
  const [updateCrop, updateStatus] = useUpdateCropMutation();

  const { data: crop } = useGetCropQuery(id!, { skip: !id });
  const { data: harvests } = useGetHarvestsQuery();

  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [formData, setFormData] = useState<CropUpdate>({
    name: "",
    harvestId: "",
  });

  useEffect(() => {
    if (crop) setFormData(crop);
  }, [crop]);

  const isErrorFields = () => {
    setFieldErrors({
      name: !formData.name ? FieldTypesList.REQUIRED : null,
    });

    return !formData.name;
  };

  const handleSubmit = async () => {
    if (isErrorFields()) return;

    const result = id ? await updateCrop(formData) : await addCrop(formData);

    if (!result.error) {
      await alert(
        id ? FieldTypesList.UPDATE_SUCCESS : FieldTypesList.REGISTER_SUCCESS
      );
      location.replace("/crop");
    }
  };

  return (
    <RegisterCropTemplate
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      harvests={harvests}
      fieldErrors={fieldErrors}
      isLoading={id ? updateStatus.isLoading : addStatus.isLoading}
      error={id ? updateStatus.error : addStatus.error}
      isError={id ? updateStatus.isError : addStatus.isError}
      reset={id ? updateStatus.reset : addStatus.reset}
      id={id}
    />
  );
};

export default CultureFormPage;
