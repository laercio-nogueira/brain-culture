import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetHarvestsQuery,
  useDeleteHarvestMutation,
} from "@store/states/harvest/harvestApi";
import Popup from "@components/Popup";
import { ErrorI } from "@interfaces/error.interface";

const HarvestList = () => {
  const navigate = useNavigate();
  const { data: harvest } = useGetHarvestsQuery();
  const [deleteHarvest, { isError, error, reset }] =
    useDeleteHarvestMutation<ErrorI>();

  return (
    <>
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
      {isError && (
        <Popup text={error?.data.message} onClose={reset} type="error" />
      )}
    </>
  );
};

export default HarvestList;
