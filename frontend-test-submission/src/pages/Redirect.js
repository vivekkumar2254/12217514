import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Log } from "../log";

function Redirect() {
  const { shortcode } = useParams();
  const data = JSON.parse(localStorage.getItem("shortLinks") || "[]");

  useEffect(() => {
    const match = data.find((d) => d.shortUrl.endsWith(shortcode));
    if (match) {
      Log("frontend", "info", "page", `Redirecting to ${match.longUrl}`);
      window.location.href = match.longUrl;
    } else {
      Log("frontend", "error", "page", `Shortcode ${shortcode} not found`);
    }
  },  [shortcode, data]);

  return <p>Redirecting...</p>;
}

export default Redirect;
