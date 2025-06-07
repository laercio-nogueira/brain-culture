import { useState } from "react";
import styled from "styled-components";
import Title from "../Typograph";
import Thead from "./Thead";
import Tbody from "./Tbody";

const Container = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  font-family: "Segoe UI", sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #eee;
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
  width = "960px",
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
    <Container style={{ maxWidth: width }}>
      <Title>{title}</Title>
      {onRegister && <AddButton onClick={onRegister}>+ Novo</AddButton>}
      <Table>
        <Thead
          levels={levels}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <Tbody
          columns={columns}
          data={data}
          onEdit={onEdit}
          onDelete={onDelete}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
          levels={levels}
        />
      </Table>
    </Container>
  );
}

export default CrudListPage;

// import styled from 'styled-components';
// import { FiEdit2, FiTrash2 } from 'react-icons/fi';
// import Title from './Typograph';

// const Container = styled.div`
//   max-width: 960px;
//   margin: 2rem auto;
//   padding: 2rem;
//   background: #fff;
//   border-radius: 10px;
//   /* box-shadow: 0 4px 12px rgba(0,0,0,0.1); */
//   font-family: 'Segoe UI', sans-serif;
// `;

// const AddButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   padding: 0.6rem 1.2rem;
//   border: none;
//   border-radius: 6px;
//   font-weight: bold;
//   cursor: pointer;
//   margin-bottom: 1.5rem;
//   float: right;

//   &:hover {
//     background-color: #388e3c;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const Th = styled.th`
//   text-align: left;
//   padding: 0.75rem;
//   background-color: #f1f8e9;
//   color: #2e7d32;
//   border-bottom: 2px solid #c5e1a5;

//   &:last-child {
//     text-align: center;
//   }
// `;

// const Td = styled.td`
//   padding: 0.75rem;
//   border-bottom: 1px solid #e0e0e0;
//   vertical-align: top;

//   &:last-child {
//     width: 30px;
//     white-space: nowrap;
//   }
// `;

// const ActionButtons = styled.div`
//   display: flex;
//   gap: 0.5rem;

//   button {
//     background-color: transparent;
//     color: #4caf50;
//     border: none;
//     font-size: 18px;
//     font-weight: bold;
//     cursor: pointer;
//   }
// `;

// interface Column {
//   label: string;
//   field: string;
// }

// interface CrudListPageProps<T> {
//   title: string;
//   columns: Column[];
//   data: T[];
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
//   onRegister?: () => void;
// }

// function CrudListPage<T extends { id: number | string }>({
//   title,
//   columns,
//   data,
//   onEdit,
//   onDelete,
//   onRegister
// }: CrudListPageProps<T>) {

//   return (
//     <Container>
//       <Title>{title}</Title>
//       { onRegister && <AddButton onClick={onRegister}>+ Novo</AddButton> }
//       <Table>
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <Th key={col.field}>{col.label}</Th>
//             ))}
//             { (onEdit || onDelete) && <Th>Ações</Th> }
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row: any) => (
//             <tr key={row.id}>
//               {columns.map((col) => (
//                 <Td key={col.field}>
//                   {Array.isArray(row[col.field])
//                     ? row[col.field].join(', ')
//                     : row[col.field] ?? ''}
//                 </Td>
//               ))}
//               {(onEdit || onDelete) && (
//                 <Td>
//                   <ActionButtons>
//                     { onEdit && <button onClick={() => onEdit(row.id)}><FiEdit2 /></button> }
//                     { onDelete && <button onClick={() =>onDelete(row.id)}><FiTrash2 /></button> }
//                   </ActionButtons>
//                 </Td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default CrudListPage;
