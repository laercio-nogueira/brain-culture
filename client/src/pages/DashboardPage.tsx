import React from "react";
import styled from "styled-components";
import { useGetDashboardQuery } from "@store/states/dashboard/dashboardApi";
import GraphicPizza from "@components/GraphicPizza";
import { Title } from "@components/index";
import { StatCard, Stats } from "@components/Stat";

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;
`;

const Dashboard: React.FC = () => {
  const { data: dashboard } = useGetDashboardQuery();

  return (
    <Container>
      <Title>Dashboard Agrícola</Title>

      <Stats>
        <StatCard value={dashboard?.totalfarms} label="Total de Fazendas" />
        <StatCard
          value={dashboard?.totalarea}
          sulfix="ha"
          label="Área Total Registrada"
        />
      </Stats>

      <ChartsGrid>
        <GraphicPizza
          data={dashboard?.farmByState}
          dataKey="count"
          nameKey="state"
          title="Distribuição por Estado"
        />

        <GraphicPizza
          data={dashboard?.cropByFarm || []}
          dataKey="farmCount"
          nameKey="cropName"
          title="Distribuição por Cultura"
        />

        <GraphicPizza
          data={
            dashboard?.totalcultivatedarea && dashboard?.totalvegetatedarea
              ? [
                  {
                    name: "Agricultável",
                    value: Number(dashboard?.totalcultivatedarea) || 0,
                  },
                  {
                    name: "Vegetação",
                    value: Number(dashboard?.totalvegetatedarea) || 0,
                  },
                ]
              : []
          }
          dataKey="value"
          nameKey="name"
          title="Uso do Solo"
        />
      </ChartsGrid>
    </Container>
  );
};

export default Dashboard;
