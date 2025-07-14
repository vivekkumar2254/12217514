import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function StatsTable() {
  const data = JSON.parse(localStorage.getItem("shortLinks") || "[]");

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Short URL</TableCell>
          <TableCell>Expires</TableCell>
          <TableCell>Clicks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
            <TableCell><a href={item.shortUrl}>{item.shortUrl}</a></TableCell>
            <TableCell>{item.expiry}</TableCell>
            <TableCell>{item.clicks?.length || 0}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default StatsTable;
