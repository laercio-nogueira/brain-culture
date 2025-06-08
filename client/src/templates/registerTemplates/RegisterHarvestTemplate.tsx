import {
  Container,
  Title,
  Label,
  Input,
  Button,
  Select,
} from "@components/index";
import Popup from "@components/Popup";

const HarvestFormTemplate = ({
  handleSubmit,
  formData,
  setFormData,
  fieldErrors,
  error,
  isLoading,
  reset,
  maxValueYear,
  farmers,
  isError,
}: any) => {
  return (
    <Container>
      <Title>Cadastro de Safra</Title>
      <form onSubmit={handleSubmit}>
        <Label>Nome da Safra</Label>
        <Input
          type="text"
          placeholder="Ex: Safra, Colheita, etc..."
          value={formData.name}
          onChange={(value: any) => setFormData({ ...formData, name: value })}
          error={fieldErrors.name}
        />

        <Label>Ano da Safra</Label>
        <Input
          type="number"
          placeholder="Ex: 2024, 2025"
          value={formData.year || ""}
          onChange={(value: any) =>
            setFormData({ ...formData, year: maxValueYear(value) })
          }
          error={fieldErrors.year}
        />

        <Label>Relacionar com Fazenda (Opcional)</Label>
        <Select
          value={formData.farmId}
          onChange={(e: any) =>
            setFormData({ ...formData, farmId: e.target.value })
          }
        >
          <option value="">Selecione uma fazenda</option>
          {farmers?.map((farm: any, key: number) => (
            <option key={key} value={farm.id}>
              {farm.name}
            </option>
          ))}
        </Select>

        <Button onClick={handleSubmit} disabled={isLoading}>
          Cadastrar Safra
        </Button>
        {isError && (
          <Popup
            text={error?.data.message.join(", ")}
            onClose={reset}
            type="error"
          />
        )}
      </form>
    </Container>
  );
};

export default HarvestFormTemplate;
