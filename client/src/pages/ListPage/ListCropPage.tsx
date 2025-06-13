import { useNavigate } from "react-router";
import { Table } from "@components/index";
import {
  useGetCropsQuery,
  useDeleteCropMutation,
} from "@store/states/crop/cropApi";
import { Paginate } from "@components/Paginate";
import { useState } from "react";
import { CropsResponse } from "@interfaces/crop.interface";

const CropList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useGetCropsQuery<CropsResponse>(page);
  const [deleteCrop] = useDeleteCropMutation();

  return (
    <>
      <Table
        title="Relatório de Culturas Plantadas"
        columns={[{ label: "Tipo", field: "name" }]}
        data={data?.data || []}
        onEdit={(id: string) => navigate(`/crop/edit/${id}`)}
        onRegister={() => navigate("/crop/register")}
        onDelete={(id: string) => deleteCrop(id)}
      />

      <Paginate
        currentPage={data?.page | 0}
        totalPages={Math.ceil(data?.total / data?.limit) || 0}
        onPageChange={(page: number) => setPage(page)}
      />
    </>
  );
};

export default CropList;
