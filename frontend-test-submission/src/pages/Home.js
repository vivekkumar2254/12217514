import React from "react";
import ShortenerForm from "../components/ShortenerForm";
import { Container, Typography } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <ShortenerForm />
    </Container>
  );
}

export default Home;
