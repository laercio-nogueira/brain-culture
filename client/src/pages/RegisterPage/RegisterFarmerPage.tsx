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
import { FarmerUpdate } from "@interfaces/farmer.interface";

const FarmerFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [addFarmer, addStatus] = useAddFarmerMutation<ErrorI>();
  const [updateFarmer, updateStatus] = useUpdateFarmerMutation();

  const { data: farmer } = useGetFarmerQuery(id!, { skip: !id });

  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [formData, setFormData] = useState<FarmerUpdate>({
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
      await alert(
        id ? FieldTypesList.UPDATE_SUCCESS : FieldTypesList.REGISTER_SUCCESS
      );
      location.replace("/farmer");
    }
  };

  return (
    <RegisterFarmTemplate
      id={id}
      formData={formData}
      fieldErrors={fieldErrors}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      error={id ? updateStatus.error : addStatus.error}
      reset={id ? updateStatus.reset : addStatus.reset}
      isError={id ? updateStatus.isError : addStatus.isError}
      isLoading={id ? updateStatus.isLoading : addStatus.isLoading}
    />
  );
};

export default FarmerFormPage;
