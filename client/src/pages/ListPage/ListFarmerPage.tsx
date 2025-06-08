import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetFarmersQuery,
  useDeleteFarmerMutation,
} from "@store/states/farmer/farmerApi";
import { ErrorI } from "@interfaces/error.interface";
import Popup from "@components/Popup";

const FarmerList = () => {
  const navigate = useNavigate();
  const { data: farmer } = useGetFarmersQuery();
  const [deleteFarmer, { isError, error, reset }] =
    useDeleteFarmerMutation<ErrorI>();

  return (
    <>
      <Table
        title="Relatório de Produtores Rurais"
        columns={[
          { label: "Nome", field: "name" },
          { label: "CPF/CNPJ", field: "document" },
        ]}
        levels={{
          title: "Produtor",
          label: "farmer",
          subLevels: {
            title: "Fazenda",
            label: "farms",
            fields: ["name", "city"],
            subLevels: {
              title: "Safras",
              label: "harvests",
              fields: ["name", "year"],
              subLevels: {
                title: "Culturas",
                label: "crops",
                fields: ["name", ""],
              },
            },
          },
        }}
        data={farmer || []}
        onEdit={(id: string) => navigate(`/farmer/edit/${id}`)}
        onRegister={() => navigate("/farmer/register")}
        onDelete={(id: string) => deleteFarmer(id)}
      />
      {isError && (
        <Popup text={error?.data.message} onClose={reset} type="error" />
      )}
    </>
  );
};

export default FarmerList;
