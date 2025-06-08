import {
  Container,
  Title,
  Label,
  Input,
  Button,
  RadioButton,
  RadioGroup,
} from "@components/index";
import Popup from "@components/Popup";

const FarmerFormTemplate = ({
  formData,
  fieldErrors,
  setFormData,
  error,
  reset,
  isError,
  handleSubmit,
  isLoading,
  id,
}: any) => {
  return (
    <Container>
      <Title>{id ? "Atualização de Produtor" : "Cadastro de Produtor"}</Title>
      <Label>Nome do Produtor</Label>
      <Input
        type="text"
        placeholder="Digite o nome"
        value={formData.name}
        onChange={(value: any) => setFormData({ ...formData, name: value })}
        error={fieldErrors.name}
      />
      <Label>Tipo de Documento</Label>
      <RadioGroup>
        <RadioButton
          value="CPF"
          checked={formData.documentType === "PF"}
          onChange={() =>
            setFormData({ ...formData, documentType: "PF", document: "" })
          }
        />
        <RadioButton
          value="CNPJ"
          checked={formData.documentType === "PJ"}
          onChange={() =>
            setFormData({ ...formData, documentType: "PJ", document: "" })
          }
        />
      </RadioGroup>

      <Label>CPF ou CNPJ</Label>
      <Input
        type="text"
        placeholder="Digite o CPF ou CNPJ"
        mask={
          formData.documentType === "PF"
            ? "999.999.999-99"
            : "99.999.999/9999-99"
        }
        value={formData.document}
        onChange={(value: any) => setFormData({ ...formData, document: value })}
        error={fieldErrors.document}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        Cadastrar
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

export default FarmerFormTemplate;
