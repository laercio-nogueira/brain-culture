import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetFarmsQuery,
  useDeleteFarmMutation,
} from "@store/states/farm/farmApi";
import Popup from "@components/Popup";
import { ErrorI } from "@interfaces/error.interface";
import { useState } from "react";
import { FarmsResponse } from "@interfaces/farm.interface";
import { Paginate } from "@components/Paginate";

const FarmList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useGetFarmsQuery<FarmsResponse>(page);
  const [deleteFarm, { isError, error, reset }] =
    useDeleteFarmMutation<ErrorI>();

  return (
    <>
      <Table
        title="Relatório de Fazendas"
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
        data={data?.data || []}
        onEdit={(id: string) => navigate(`/farm/edit/${id}`)}
        onRegister={() => navigate("/farm/register")}
        onDelete={(id: string) => deleteFarm(id)}
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

export default FarmList;
