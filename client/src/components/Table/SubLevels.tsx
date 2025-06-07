import React from "react";
import styled from "styled-components";
import ButtonMore from "./ButtonMost";

const levelRules: any = {
  1: {
    padding: "12px 12px 12px 30px",
    backgroundColor: "#d5f5e3",
    borderLeft: "4px solid #27ae60",
  },
  2: {
    padding: "12px 12px 12px 50px",
    backgroundColor: "#e8f8f5",
    borderLeft: "4px solid #1abc9c",
  },
  3: {
    padding: "12px 12px 12px 70px",
    backgroundColor: "#fff",
    borderLeft: "4px solid #ddd",
  },
};

interface SubLevelsProps {
  levels: any;
  level?: number;
  data: any[];
  isExpanded: (type: string, id: string) => boolean;
  toggleExpand: (type: string, id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  renderField?: (field: string, value: any) => React.ReactNode;
}

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;

  &:first-child {
    font-weight: bold;
  }
`;

const SubLevels: React.FC<SubLevelsProps> = ({
  levels,
  level = 1,
  data,
  isExpanded,
  toggleExpand,
  renderField,
}) => {
  return data?.map((item) => {
    const hasSubLevels = levels.subLevels;
    const itemExpanded = isExpanded(levels.label, item.id);
    const currentLevel = levelRules[level];

    return (
      <React.Fragment key={`${levels.label}-${item.id}`}>
        <tr
          style={{
            backgroundColor: currentLevel.backgroundColor,
            borderLeft: currentLevel.borderLeft,
          }}
        >
          <Td
            style={{
              padding: currentLevel.padding,
            }}
          >
            {levels.title}
          </Td>

          {levels?.fields?.map((field: string) => (
            <Td key={field}>
              {renderField
                ? renderField(field, item[field])
                : Array.isArray(item[field])
                ? item[field]?.map((i: any) => i.name || i).join(", ")
                : item[field]}
            </Td>
          ))}

          <Td>
            {levels.subLevels &&
              `${item[levels.subLevels.label]?.length} ${
                levels.subLevels.title
              }(s)`}
          </Td>

          <Td>
            {hasSubLevels && item[levels.subLevels.label]?.length ? (
              <ButtonMore
                onClick={() => toggleExpand(levels.label, item.id)}
                backgroundColor={itemExpanded ? "#e74c3c" : "#2ecc71"}
                text={itemExpanded ? "esconder" : "mostrar"}
              />
            ) : null}
          </Td>
        </tr>

        {hasSubLevels && itemExpanded && (
          <SubLevels
            levels={levels.subLevels}
            level={level + 1}
            data={item[levels.subLevels.label]}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
            renderField={renderField}
          />
        )}
      </React.Fragment>
    );
  });
};

export default SubLevels;
