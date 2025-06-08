import styled from "styled-components";

const StatCardItem = styled.div`
  background-color: #f1f8e9;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  flex: 1 1 250px;
  margin: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  color: #4caf50;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #555;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

export const StatCard = ({
  value,
  label,
  sulfix,
}: {
  value: number | string | undefined;
  label: string;
  sulfix?: string;
}) => {
  return (
    <StatCardItem>
      <StatNumber>{`${value || 0} ${sulfix || ""}`}</StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCardItem>
  );
};
