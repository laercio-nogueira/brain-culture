import React, { useState } from "react";
import { useAddCropMutation } from "../../store/states/crop/cropApi";
import { useGetHarvestsQuery } from "../../store/states/harvest/harvestApi";
import RegisterCropTemplate from "../../templates/registerTemplates/RegisterCropTemplate";
import { FieldTypesList } from "../../interfaces/fields.interface";

const CultureFormPage: React.FC = () => {
  const [addCrop] = useAddCropMutation();
  const { data: harvests } = useGetHarvestsQuery();
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [formData, setformData] = useState<any>({
    name: "",
    harvestId: "",
  });

  const isErrorFields = () => {
    setFieldErrors({
      name: !formData.name ? FieldTypesList.REQUIRED : null,
    });

    return !formData.name;
  };

  const handleSubmit = async () => {
    if (isErrorFields()) return;

    const result = await addCrop(formData);

    if (!result.error) {
      await alert(FieldTypesList.REGISTER_CROP_SUCCESS);
      location.replace("/crop");
    }
  };

  return (
    <RegisterCropTemplate
      handleSubmit={handleSubmit}
      formData={formData}
      setformData={setformData}
      harvests={harvests}
      fieldErrors={fieldErrors}
    />
  );
};

export default CultureFormPage;
