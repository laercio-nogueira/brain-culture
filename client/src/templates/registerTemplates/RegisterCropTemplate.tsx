import {
  Container,
  Title,
  Label,
  Input,
  Button,
  Select,
} from "../../components";

const CultureFormTemplate = ({
  handleSubmit,
  formData,
  setformData,
  harvests,
  fieldErrors,
}: any) => {
  return (
    <Container>
      <Title>Cadastro de Cultura Plantada</Title>
      <form onSubmit={handleSubmit}>
        <Label>Tipo da Cultura</Label>
        <Input
          type="text"
          placeholder="Ex: Soja"
          value={formData.name}
          onChange={(value: string) =>
            setformData({ ...formData, name: value })
          }
          fieldErrors={fieldErrors.name}
        />

        <Label>Safra</Label>
        <Select
          value={formData.harvestId}
          onChange={(e) =>
            setformData((prev: any) => ({
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

        <Button type="submit">Cadastrar Cultura</Button>
      </form>
    </Container>
  );
};

export default CultureFormTemplate;
