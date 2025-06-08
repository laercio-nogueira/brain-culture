import styled from "styled-components";

const Td = styled.td`
  text-align: center;
  padding: 1rem;
  font-size: 18px;
  width: 100%;
`;

const NoRegister = ({ columns, onEdit, onDelete, levels }: any) => {
  const countColumns = () => {
    const numberCollumns = columns?.length || 0;
    const isActions = onDelete || onEdit ? 1 : 0;
    const isLevels = levels ? 2 : 0;
    return numberCollumns + isActions + isLevels;
  };
  return (
    <tbody>
      <tr>
        <Td colSpan={countColumns()}>Não há registros</Td>
      </tr>
    </tbody>
  );
};

export default NoRegister;
