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

const CultureFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [addCrop] = useAddCropMutation();
  const [updateCrop] = useUpdateCropMutation();
  const { data: harvests } = useGetHarvestsQuery();
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const { data: crop } = useGetCropQuery(id!, {
    skip: !id,
  });
  const [formData, setFormData] = useState<any>({
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
      await alert(FieldTypesList.REGISTER_CROP_SUCCESS);
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
    />
  );
};

export default CultureFormPage;
