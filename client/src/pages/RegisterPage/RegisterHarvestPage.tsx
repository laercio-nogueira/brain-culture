import React, { useState } from 'react';
import { Container, Title, Label, Input, Button } from '../../components';

const HarvestForm: React.FC = () => {
  const [harvestName, setHarvestName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!harvestName.trim()) {
      alert('Por favor, informe o nome da safra.');
      return;
    }

    const formData = {
      harvestName,
    };

    console.log('📤 Submitting Harvest:', formData);
    alert('Safra cadastrada com sucesso!');
  };

  return (
    <Container>
      <Title>Cadastro de Safra</Title>
      <form onSubmit={handleSubmit}>
        <Label>Nome da Safra</Label>
        <Input
          type="text"
          placeholder="Ex: Safra 2025"
          value={harvestName}
          onChange={(e) => setHarvestName(e.target.value)}
        />

        <Button type="submit">Cadastrar Safra</Button>
      </form>
    </Container>
  );
};

export default HarvestForm;
