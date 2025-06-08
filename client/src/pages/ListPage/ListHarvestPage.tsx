import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetHarvestsQuery,
  useDeleteHarvestMutation,
} from "@store/states/harvest/harvestApi";

const HarvestList = () => {
  const navigate = useNavigate();
  const { data: harvest } = useGetHarvestsQuery();
  const [deleteHarvest] = useDeleteHarvestMutation();

  return (
    <Table
      title="Relatório de Safras"
      columns={[
        { label: "Nome", field: "name" },
        { label: "Ano", field: "year" },
      ]}
      levels={{
        title: "Safras",
        label: "harvests",
        fields: ["name", "year", "", "", "", ""],
        subLevels: {
          title: "Culturas",
          label: "crops",
          fields: ["name", ""],
        },
      }}
      data={harvest || []}
      onEdit={(id: string) => navigate(`/harvest/edit/${id}`)}
      onRegister={() => navigate("/harvest/register")}
      onDelete={(id: string) => deleteHarvest(id)}
    />
  );
};

export default HarvestList;
