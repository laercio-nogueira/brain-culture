import { useState } from "react";
import styled from "styled-components";
import Title from "../Typograph";
import Thead from "./Thead";
import Tbody from "./Tbody";
import NoRegister from "./NoRegister";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-family: "Segoe UI", sans-serif;
  margin-top: 5rem;
`;

const Box = styled.div`
  border-radius: 10px;
  font-family: "Segoe UI", sans-serif;
`;

const Table = styled.table`
  border-collapse: collapse;
  background: #eee;
  margin: 0 auto;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1.5rem;
  float: right;

  &:hover {
    background-color: #388e3c;
  }
`;

interface Column {
  label: string;
  field: string;
}

interface CrudListPageProps {
  title: string;
  width?: string | number;
  columns: Column[];
  data: any;
  levels?: any;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRegister?: () => void;
}

function CrudListPage({
  title = "",
  width = "1200px",
  columns,
  data,
  onEdit,
  onDelete,
  onRegister,
  levels,
}: CrudListPageProps) {
  const [expanded, setExpanded] = useState<any>({});

  const toggleExpand = (type: any, id: any) => {
    if (!expanded[type]) {
      setExpanded((prevState: any) => ({
        ...prevState,
        [type]: [],
      }));
    }

    setExpanded((prev: any) => ({
      ...prev,
      [type]: prev[type]?.includes(id)
        ? prev[type].filter((item: any) => item !== id)
        : [...prev[type], id],
    }));
  };

  const isExpanded = (type: any, id: any) => {
    return expanded[type]?.includes(id);
  };

  return (
    <Container>
      <Box style={{ maxWidth: width, minWidth: width }}>
        <Title>{title}</Title>
        {onRegister && <AddButton onClick={onRegister}>+ Novo</AddButton>}
      </Box>
      <Table style={{ maxWidth: width, minWidth: width }}>
        <Thead
          levels={levels}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        {data.length ? (
          <Tbody
            columns={columns}
            data={data}
            onEdit={onEdit}
            onDelete={onDelete}
            toggleExpand={toggleExpand}
            isExpanded={isExpanded}
            levels={levels}
          />
        ) : (
          <NoRegister
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
            levels={levels}
          />
        )}
      </Table>
    </Container>
  );
}

export default CrudListPage;
