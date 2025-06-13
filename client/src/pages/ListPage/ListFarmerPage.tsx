import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetFarmersQuery,
  useDeleteFarmerMutation,
} from "@store/states/farmer/farmerApi";
import { ErrorI } from "@interfaces/error.interface";
import Popup from "@components/Popup";
import { FarmersResponse } from "@interfaces/farmer.interface";
import { Paginate } from "@components/Paginate";
import { useState } from "react";

const FarmerList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useGetFarmersQuery<FarmersResponse>(page);
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
        data={data?.data || []}
        onEdit={(id: string) => navigate(`/farmer/edit/${id}`)}
        onRegister={() => navigate("/farmer/register")}
        onDelete={(id: string) => deleteFarmer(id)}
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

export default FarmerList;
