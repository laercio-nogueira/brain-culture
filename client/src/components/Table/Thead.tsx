import styled from "styled-components";

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border: 1px solid;
  background-color: #388e3c;
  color: #fff;

  &:last-child {
    text-align: center;
    width: 150px;
  }
`;

const Thread = ({ levels, columns, onEdit, onDelete }: any) => {
  return (
    <thead>
      <tr>
        {levels && <Th>Nível</Th>}
        {columns.map((col: any) => (
          <Th key={col.field}>{col.label}</Th>
        ))}
        {levels && <Th>Total</Th>}
        {(onEdit || onDelete) && <Th>Ações</Th>}
      </tr>
    </thead>
  );
};

export default Thread;
