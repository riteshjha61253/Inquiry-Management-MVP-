import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import StatusUpdate from "./StatusUpdate";

export default function InquiryList({ inquiries = [], onStatusChange }) {
  if (!inquiries.length) {
    return (
      <Paper sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          No inquiries found.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((inq) => (
            <TableRow key={inq.id}>
              <TableCell>{inq.name}</TableCell>
              <TableCell>{inq.email}</TableCell>
              <TableCell>{inq.phone}</TableCell>
              <TableCell>{inq.source}</TableCell>
              <TableCell>
                <StatusUpdate inquiry={inq} onUpdated={onStatusChange} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
