import React from "react";
import styled from "styled-components";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import SubLevels from "./SubLevels";
import ButtonMore from "./ButtonMost";
import Td from "./Td";

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;

  button {
    background-color: transparent;
    color: #4caf50;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  .button-plus {
    font-size: 13px;
    padding: 6px 12px;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
  }
`;

const Tbody = ({
  data,
  columns,
  levels,
  onEdit,
  onDelete,
  isExpanded,
  toggleExpand,
}: any) => {
  return (
    <tbody>
      {data.map((item: any) => (
        <React.Fragment key={`${levels?.label}-${item.id}`}>
          <tr
            style={{
              backgroundColor: "#ecf0f1",
              borderBottom: "2px solid #bdc3c7",
            }}
          >
            {levels && (
              <Td>
                {levels?.title}
              </Td>
            )}
            {columns.map((col: any) => (
              <Td key={col.field}>
                {Array.isArray(item[col.field])
                  ? item[col.field].join(", ")
                  : item[col.field] ?? ""}
              </Td>
            ))}
            {levels && (
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                }}
              >
                {`${item[levels?.subLevels?.label]?.length} ${
                  levels?.subLevels?.title
                }(s)`}
              </td>
            )}
            <td
              style={{
                padding: "12px",
                border: "1px solid #ddd",
              }}
            >
              <ActionButtons>
                {levels && (
                  <ButtonMore
                    onClick={() => toggleExpand(levels?.label, item.id)}
                    backgroundColor={isExpanded(levels?.label, item.id) ? "#e74c3c" : "#2ecc71"}
                    text={isExpanded(levels?.label, item.id) ? "esconder" : "mostrar"}
                    disabled={item[levels?.subLevels?.label]?.length === 0}
                  />
                )}
                {(onEdit || onDelete) && (
                  <>
                    {onEdit && (
                      <button onClick={() => onEdit(item.id)}>
                        <FiEdit2 />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(item.id)}>
                        <FiTrash2 />
                      </button>
                    )}
                  </>
                )}
              </ActionButtons>
            </td>
          </tr>
          {isExpanded(levels?.label, item.id) && <SubLevels
            levels={levels?.subLevels}
            data={item[levels?.subLevels?.label]}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
          />}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default Tbody;
