import React, { useState } from 'react';
import { Container, Title, Label, Input, Button, Select } from '../../components';

const FarmerForm: React.FC = () => {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [producerName, setProducerName] = useState('');
  const [selectedFarm, setSelectedFarm] = useState('');
  const [farms, setFarms] = useState(['Fazenda Boa Esperança', 'Fazenda Santa Luzia']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      cpfCnpj,
      producerName,
      selectedFarm,
    };
    console.log('📤 Submitting Farmer:', formData);
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <Container>
      <Title>Cadastro de Fazendeiro</Title>
      <form onSubmit={handleSubmit}>
        <Label>CPF ou CNPJ</Label>
        <Input
          type="text"
          placeholder="Digite o CPF ou CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
        />

        <Label>Nome do Produtor</Label>
        <Input
          type="text"
          placeholder="Digite o nome"
          value={producerName}
          onChange={(e) => setProducerName(e.target.value)}
        />

        <Label>Nome da Fazenda</Label>
        <Select
          value={selectedFarm}
          onChange={(e) => {
            setSelectedFarm(e.target.value);
          }}
        >
          <option value="">Selecione uma fazenda</option>
          {farms.map((farm, idx) => (
            <option key={idx} value={farm}>{farm}</option>
          ))}
        </Select>

        <Button type="submit">Cadastrar</Button>
      </form>
    </Container>
  );
};

export default FarmerForm;
