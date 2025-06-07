import React, { useState } from 'react';
import { Container, Title, Label, Input, Button } from '../../components';

const FarmForm: React.FC = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [agricultureArea, setAgricultureArea] = useState('');
  const [vegetationArea, setVegetationArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      city,
      state,
      totalArea: parseFloat(totalArea),
      agricultureArea: parseFloat(agricultureArea),
      vegetationArea: parseFloat(vegetationArea),
    };

    console.log('📤 Submitting Farm:', formData);
    alert('Fazenda cadastrada com sucesso!');
  };

  return (
    <Container>
      <Title>Cadastro de Fazenda</Title>
      <form onSubmit={handleSubmit}>
        <Label>Nome da Fazenda (Propriedade)</Label>
        <Input
          type="text"
          placeholder="Ex: Fazenda Santa Rosa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Label>Cidade</Label>
        <Input
          type="text"
          placeholder="Ex: Uberaba"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Label>Estado</Label>
        <Input
          type="text"
          placeholder="Ex: MG"
          maxLength={2}
          value={state}
          onChange={(e) => setState(e.target.value.toUpperCase())}
        />

        <Label>Área Total (ha)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 1000"
          value={totalArea}
          onChange={(e) => setTotalArea(e.target.value)}
        />

        <Label>Área Agricultável (ha)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 600"
          value={agricultureArea}
          onChange={(e) => setAgricultureArea(e.target.value)}
        />

        <Label>Área de Vegetação (ha)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 300"
          value={vegetationArea}
          onChange={(e) => setVegetationArea(e.target.value)}
        />

        <Button type="submit">Cadastrar Fazenda</Button>
      </form>
    </Container>
  );
};

export default FarmForm;
