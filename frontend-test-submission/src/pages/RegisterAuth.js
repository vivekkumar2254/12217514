import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from "@mui/material";

function RegisterAuth() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    mobileNo: "",
    githubUsername: "",
    rollNo: "",
    accessCode: ""
  });

  const [clientID, setClientID] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const register = async () => {
    try {
      const res = await fetch("http://20.244.56.144/evaluation-service/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      setClientID(data.clientID);
      setClientSecret(data.clientSecret);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const authenticate = async () => {
    try {
      const res = await fetch("http://20.244.56.144/evaluation-service/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          clientID,
          clientSecret
        })
      });

      if (!res.ok) throw new Error("Authentication failed");

      const data = await res.json();
      setAccessToken(data.access_token);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Register & Authenticate with Affordmed Test Server
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
        <TextField label="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
        <TextField label="Mobile No" value={form.mobileNo} onChange={(e) => handleChange("mobileNo", e.target.value)} />
        <TextField label="GitHub Username" value={form.githubUsername} onChange={(e) => handleChange("githubUsername", e.target.value)} />
        <TextField label="Roll Number" value={form.rollNo} onChange={(e) => handleChange("rollNo", e.target.value)} />
        <TextField label="Access Code" value={form.accessCode} onChange={(e) => handleChange("accessCode", e.target.value)} />

        <Button variant="contained" onClick={register}>Register</Button>

        {clientID && clientSecret && (
          <>
            <Typography>Client ID: {clientID}</Typography>
            <Typography>Client Secret: {clientSecret}</Typography>
            <Button variant="outlined" onClick={authenticate}>Get Access Token</Button>
          </>
        )}

        {accessToken && (
          <Alert severity="success">Access Token: {accessToken}</Alert>
        )}

        {error && (
          <Alert severity="error">{error}</Alert>
        )}
      </Box>
    </Container>
  );
}

export default RegisterAuth;
