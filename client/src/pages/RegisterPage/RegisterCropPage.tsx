import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Title, Label, Input, Button, Select } from '../../components';
import { useAddCropMutation } from "../../store/states/crop/cropApi";
import { useGetHarvestsQuery } from '../../store/states/harvest/harvestApi';

const CultureForm: React.FC = () => {
  const navigate = useNavigate();
  const [addCrop] = useAddCropMutation();
  const { data: harvests } = useGetHarvestsQuery();
  const [formData, setformData] = useState<{
    name: string;
    harvestId: string;
  }>({
    name: '',
    harvestId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() && !formData.harvestId) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    await addCrop(formData);
    const confirm: any = alert('Cultura cadastrada com sucesso!');
    if (confirm) {
      navigate('/crop');
    }
  };

  return (
    <Container>
      <Title>Cadastro de Cultura Plantada</Title>
      <form onSubmit={handleSubmit}>
        <Label>Tipo da Cultura</Label>
        <Input
          type="text"
          placeholder="Ex: Soja"
          value={formData.name}
          onChange={(e) => setformData((prev) => ({
            ...prev,
            name: e.target.value
          }))}
        />

        <Label>Safra</Label>
        <Select
          value={formData.harvestId}
          onChange={(e) => setformData((prev) => ({
            ...prev,
            harvestId: e.target.value
          }))}
        >
          <option value="">Selecione a safra</option>
          {harvests?.map(({ name, year, id }: { name: string; year: number; id: string}) => (
            <option key={id} value={id}>{`${name} ${year}`}</option>
          ))}
        </Select>

        <Button type="submit">Cadastrar Cultura</Button>
      </form>
    </Container>
  );
};

export default CultureForm;
