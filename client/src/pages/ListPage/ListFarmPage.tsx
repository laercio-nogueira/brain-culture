import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetFarmsQuery,
  useDeleteFarmMutation,
} from "@store/states/farm/farmApi";

const FarmList = () => {
  const navigate = useNavigate();
  const { data: farm } = useGetFarmsQuery();
  const [deleteFarm] = useDeleteFarmMutation();

  return (
    <Table
      title="Relatorio de Fazendas"
      width={1200}
      columns={[
        { label: "Nome", field: "name" },
        { label: "Cidade", field: "city" },
        { label: "Estado", field: "state" },
        { label: "Área Total", field: "totalArea" },
        { label: "Área Agricultiva", field: "cultivatedArea" },
        { label: "Área Vegetal", field: "vegetatedArea" },
      ]}
      levels={{
        title: "Fazenda",
        label: "farms",
        fields: ["name", "city"],
        subLevels: {
          title: "Safras",
          label: "harvests",
          fields: ["name", "year", "", "", "", ""],
          subLevels: {
            title: "Culturas",
            label: "crops",
            fields: ["name", "", "", "", "", ""],
          },
        },
      }}
      data={farm || []}
      onEdit={(id: string) => navigate(`/farm/edit/${id}`)}
      onRegister={() => navigate("/farm/register")}
      onDelete={(id: string) => deleteFarm(id)}
    />
  );
};

export default FarmList;
