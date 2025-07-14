import React from "react";
import StatsTable from "../components/StatsTable";
import { Container, Typography } from "@mui/material";

function Stats() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      <StatsTable />
    </Container>
  );
}

export default Stats;
