import React, { useEffect, useState } from "react";
import {
  useAddFarmerMutation,
  useGetFarmerQuery,
  useUpdateFarmerMutation,
} from "@store/states/farmer/farmerApi";
import { ErrorI } from "@interfaces/error.interface";
import RegisterFarmTemplate from "@templates/registerTemplates/RegisterFarmerTemplate";
import { FieldTypesList } from "@interfaces/fields.interface";
import { useParams } from "react-router";

const FarmerFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [addFarmer, { isLoading, error, isError, reset }] =
    useAddFarmerMutation<ErrorI>();
  const [updateFarmer] = useUpdateFarmerMutation();
  const { data: farmer } = useGetFarmerQuery(id!, {
    skip: !id,
  });
  const [formData, setFormData] = useState<any>({
    document: "",
    documentType: "PF",
    name: "",
  });

  useEffect(() => {
    if (farmer) setFormData(farmer);
  }, [farmer]);

  const isErrorFields = () => {
    setFieldErrors({
      name: !formData.name ? FieldTypesList.REQUIRED : null,
      document: !formData.document ? FieldTypesList.REQUIRED : null,
    });
    return !formData.name || !formData.document;
  };

  const handleSubmit = async () => {
    if (isErrorFields()) return;

    const formatDocument = formData.document.replace(/\D/g, "");

    const result = id
      ? await updateFarmer({
          ...formData,
          document: formatDocument,
        })
      : await addFarmer({
          ...formData,
          document: formatDocument,
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
