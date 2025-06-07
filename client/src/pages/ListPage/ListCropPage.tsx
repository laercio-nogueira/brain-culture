import { useNavigate } from "react-router";
import { Table } from "../../components";
import {
  useGetCropsQuery,
  useDeleteCropMutation,
} from "../../store/states/crop/cropApi";

const CropList = () => {
  const navigate = useNavigate();
  const { data: crop } = useGetCropsQuery();
  const [deleteCrop] = useDeleteCropMutation();

  return (
    <Table
      title="Culturas Plantadas"
      columns={[{ label: "Tipo", field: "name" }]}
      data={crop || []}
      onEdit={(id: string) => navigate(`/crop/edit/${id}`)}
      onRegister={() => navigate("/crop/register")}
      onDelete={(id: string) => deleteCrop(id)}
    />
  );
};

export default CropList;
