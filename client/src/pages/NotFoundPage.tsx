import styled from "styled-components";
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #388e3c;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #6c757d;
  margin-bottom: 2rem;
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Página não encontrada</Subtitle>
      <StyledButton onClick={() => navigate("/")}>
        Voltar para a página inicial
      </StyledButton>
    </Container>
  );
};
