import React, { useState } from "react";
import { useAddFarmerMutation } from "@store/states/farmer/farmerApi";
import { ErrorI } from "@interfaces/error.interface";
import RegisterFarmTemplate from "@templates/registerTemplates/RegisterFarmerTemplate";
import { FieldTypesList } from "@interfaces/fields.interface";

const FarmerFormPage: React.FC = () => {
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [addFarmer, { isLoading, error, isError, reset }] =
    useAddFarmerMutation<ErrorI>();
  const [formData, setFormData] = useState({
    document: "",
    documentType: "PF",
    name: "",
  });

  const isErrorFields = () => {
    setFieldErrors({
      name: !formData.name ? FieldTypesList.REQUIRED : null,
      document: !formData.document ? FieldTypesList.REQUIRED : null,
    });
    return !formData.name || !formData.document;
  };

  const handleSubmit = async () => {
    if (isErrorFields()) return;

    const result = await addFarmer({
      ...formData,
      document: formData.document.replace(/\D/g, ""),
    });

    if (!result.error) {
      await alert(FieldTypesList.REGISTER_FARMER_SUCCESS);
      location.replace("/farmer");
    }
  };

  return (
    <RegisterFarmTemplate
      formData={formData}
      fieldErrors={fieldErrors}
      setFormData={setFormData}
      error={error}
      reset={reset}
      isError={isError}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default FarmerFormPage;
