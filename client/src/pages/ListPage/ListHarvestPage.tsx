import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetHarvestsQuery,
  useDeleteHarvestMutation,
} from "@store/states/harvest/harvestApi";
import Popup from "@components/Popup";
import { ErrorI } from "@interfaces/error.interface";
import { Paginate } from "@components/Paginate";
import { useState } from "react";
import { HarvestsResponse } from "@interfaces/harvest.interface";

const HarvestList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useGetHarvestsQuery<HarvestsResponse>(page);
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
        data={data?.data || []}
        onEdit={(id: string) => navigate(`/harvest/edit/${id}`)}
        onRegister={() => navigate("/harvest/register")}
        onDelete={(id: string) => deleteHarvest(id)}
      />
      {isError && (
        <Popup text={error?.data.message} onClose={reset} type="error" />
      )}

      <Paginate
        currentPage={data?.page | 0}
        totalPages={Math.ceil(data?.total / data?.limit) || 0}
        onPageChange={(page: number) => setPage(page)}
      />
    </>
  );
};

export default HarvestList;
