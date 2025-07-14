import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Log } from "../log";

function ShortenerForm() {
  const [urls, setUrls] = useState([{ longUrl: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = field === "validity" ? parseInt(value) : value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "" }]);
  };

  const handleSubmit = () => {
    const results = urls.map((url) => {
      if (!url.longUrl.startsWith("http")) {
        Log("frontend", "error", "component", "Invalid URL format");
        return { ...url, shortUrl: "Invalid URL" };
      }

      const shortcode = url.shortcode || Math.random().toString(36).substring(2, 7);
      const expiry = new Date(Date.now() + (url.validity || 30) * 60000).toISOString();
      const shortUrl = `http://localhost:3000/${shortcode}`;

      Log("frontend", "info", "component", `Shortened ${url.longUrl} to ${shortUrl}`);
      return { ...url, shortUrl, expiry };
    });

    setUrls(results);
    localStorage.setItem("shortLinks", JSON.stringify(results));
  };

  return (
    <Box>
      {urls.map((url, i) => (
        <Box key={i} mb={2}>
          <TextField
            label="Long URL"
            fullWidth
            margin="dense"
            value={url.longUrl}
            onChange={(e) => handleChange(i, "longUrl", e.target.value)}
          />
          <TextField
            label="Validity (minutes)"
            type="number"
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(i, "validity", e.target.value)}
          />
          <TextField
            label="Custom shortcode"
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
          />
          {url.shortUrl && (
            <Box mt={1}>
              <Typography>Short URL: <a href={url.shortUrl}>{url.shortUrl}</a></Typography>
              <Typography>Expires at: {url.expiry}</Typography>
            </Box>
          )}
        </Box>
      ))}
      <Button variant="outlined" onClick={addField}>Add Another URL</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten</Button>
    </Box>
  );
}

export default ShortenerForm;
