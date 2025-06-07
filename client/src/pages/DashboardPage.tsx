import React from 'react';
import styled from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  color: #2e7d32;
  text-align: center;
  margin-bottom: 2rem;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
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

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;
`;

const COLORS = ['#4caf50', '#81c784', '#c8e6c9', '#388e3c', '#66bb6a'];

const Dashboard: React.FC = () => {
  const totalFazendas = 12;
  const totalHectares = 3120;

  const porEstado = [
    { name: 'MG', value: 5 },
    { name: 'SP', value: 3 },
    { name: 'GO', value: 2 },
    { name: 'PR', value: 2 },
  ];

  const porCultura = [
    { name: 'Soja', value: 6 },
    { name: 'Milho', value: 4 },
    { name: 'Café', value: 2 },
  ];

  const usoSolo = [
    { name: 'Agricultável', value: 2100 },
    { name: 'Vegetação', value: 1020 },
  ];

  return (
    <Container>
      <Title>Dashboard Agrícola</Title>

      <Stats>
        <StatCard>
          <StatNumber>{totalFazendas}</StatNumber>
          <StatLabel>Total de Fazendas</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>{totalHectares.toLocaleString()} ha</StatNumber>
          <StatLabel>Área Total Registrada</StatLabel>
        </StatCard>
      </Stats>

      <ChartsGrid>
        <div>
          <h3>Distribuição por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={porEstado}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#4caf50"
                label
              >
                {porEstado.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Distribuição por Cultura</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={porCultura}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#4caf50"
                label
              >
                {porCultura.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Uso do Solo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={usoSolo}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#4caf50"
                label
              >
                {usoSolo.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartsGrid>
    </Container>
  );
};

export default Dashboard;
