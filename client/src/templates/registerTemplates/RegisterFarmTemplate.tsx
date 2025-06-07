import React from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Button,
  Select,
} from "../../components";
import Popup from "../../components/Popup";

const FarmFormTemplate = ({
  formData,
  setFormData,
  fieldErrors,
  maxValueArea,
  farmers,
  handleSubmit,
  isLoading,
  error,
  isError,
  reset,
}: any) => {
  return (
    <Container>
      <Title>Cadastro de Fazenda</Title>
      <Label>Nome da Fazenda (Propriedade)</Label>
      <Input
        type="text"
        placeholder="Ex: Fazenda Santa Rosa"
        value={formData.name}
        onChange={(value: any) => setFormData({ ...formData, name: value })}
        error={fieldErrors.name}
      />

      <Label>Cidade</Label>
      <Input
        type="text"
        placeholder="Ex: Uberaba"
        value={formData.city}
        onChange={(value: any) => setFormData({ ...formData, city: value })}
        error={fieldErrors.city}
      />

      <Label>Estado (Sigla)</Label>
      <Input
        type="text"
        placeholder="Ex: MG"
        maxLength={2}
        value={formData.state.toLocaleUpperCase()}
        onChange={(value: any) => setFormData({ ...formData, state: value })}
        error={fieldErrors.state}
      />

      <Label>Área Total (ha)</Label>
      <Input
        type="number"
        step="1"
        placeholder="Ex: 1000"
        value={formData.totalArea || ""}
        onChange={(value: any) =>
          setFormData({ ...formData, totalArea: maxValueArea(value) })
        }
        error={fieldErrors.totalArea}
      />

      <Label>Área Agricultável (ha)</Label>
      <Input
        type="number"
        step="1"
        placeholder="Ex: 600"
        maxLength={10}
        value={formData.cultivatedArea || ""}
        onChange={(value: any) =>
          setFormData({ ...formData, cultivatedArea: maxValueArea(value) })
        }
        error={fieldErrors.cultivatedArea}
      />

      <Label>Área de Vegetação (ha)</Label>
      <Input
        type="number"
        step="1"
        placeholder="Ex: 300"
        maxLength={10}
        value={formData.vegetatedArea || ""}
        onChange={(value: any) =>
          setFormData({ ...formData, vegetatedArea: maxValueArea(value) })
        }
        error={fieldErrors.vegetatedArea}
      />

      <Label>Relacionar com Fazendeiro (Opcional)</Label>
      <Select
        value={formData.farmerId}
        onChange={(e) => {
          setFormData({ ...formData, farmerId: e.target.value });
        }}
      >
        <option value="">Selecione uma fazenda</option>
        {farmers?.map((farm: any, key: number) => (
          <option key={key} value={farm.id}>
            {farm.name}
          </option>
        ))}
      </Select>

      <Button onClick={handleSubmit} disabled={isLoading}>
        Cadastrar Fazenda
      </Button>
      {isError && (
        <Popup
          text={error?.data.message.join(", ")}
          onClose={reset}
          type="error"
        />
      )}
    </Container>
  );
};

export default FarmFormTemplate;
