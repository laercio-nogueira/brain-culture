import {
  Container,
  Title,
  Label,
  Input,
  Button,
  Select,
} from "@components/index";

const CultureFormTemplate = ({
  handleSubmit,
  formData,
  setFormData,
  harvests,
  fieldErrors,
}: any) => {
  return (
    <Container>
      <Title>Cadastro de Cultura Plantada</Title>
      <Label>Tipo da Cultura</Label>
      <Input
        type="text"
        placeholder="Ex: Soja"
        value={formData.name}
        onChange={(value: string) => setFormData({ ...formData, name: value })}
        error={fieldErrors.name}
      />

      <Label>Safra</Label>
      <Select
        value={formData.harvestId}
        onChange={(e) =>
          setFormData((prev: any) => ({
            ...prev,
            harvestId: e.target.value,
          }))
        }
      >
        <option value="">Selecione a safra</option>
        {harvests?.map(({ name, year, id }: any) => (
          <option key={id} value={id}>{`${name} ${year}`}</option>
        ))}
      </Select>

      <Button onClick={handleSubmit}>Cadastrar Cultura</Button>
    </Container>
  );
};

export default CultureFormTemplate;
