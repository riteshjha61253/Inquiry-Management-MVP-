import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import StatusUpdate from "./StatusUpdate";

const formatIndianDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
};

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
            <TableCell>Current Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Action</TableCell> {/* Moved to rightmost */}
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
                <Typography variant="body2" color="text.secondary">
                  {inq.status || "New"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatIndianDate(inq.createdAt)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatIndianDate(inq.updatedAt)}
                </Typography>
              </TableCell>
              <TableCell> {/* Action moved here */}
                <StatusUpdate inquiry={inq} onUpdated={onStatusChange} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}