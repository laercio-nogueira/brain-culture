import { useNavigate } from 'react-router';
import { Table } from '../../components';
import { useGetFarmersQuery, useDeleteFarmerMutation } from '../../store/states/farmer/farmerApi';

const FarmerList = () => {
  const navigate = useNavigate();
  const { data: farmer } = useGetFarmersQuery();
  const [deleteFarmer] = useDeleteFarmerMutation();
  
  return (
    <Table
      title="Relatorio de Produtores Rurais"
      columns={[
        { label: 'Nome', field: 'name' },
        { label: 'CPF/CNPJ', field: 'document' },
      ]}
      levels={{
        title: 'Produtor',
        label: 'farmer',
        subLevels: {
          title: 'Fazenda',
          label: 'farms',
          fields: ['name', "city"],
          subLevels: {
            title: 'Safras',
            label: 'harvests',
            fields: ['name', 'year'],
            subLevels: {
              title: 'Culturas', label: 'crops',
              fields: ['name', ''],
            }
          }
        }
      }}
      data={farmer || []}
      onEdit={(id: string) => navigate(`/farmer/edit/${id}`)}
      onRegister={() => navigate('/farmer/register')}
      onDelete={(id: string) => deleteFarmer(id)}
    />
  )
};

export default FarmerList;
