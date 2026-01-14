import { MenuItem, Select, Button, CircularProgress, Box, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { updateInquiryStatus } from "../utils/api";

export default function StatusUpdate({ inquiry, onUpdated }) {
  const [newStatus, setNewStatus] = useState("Contacted"); // Default to first option
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setUpdating(true);
    setError("");

    const { data, error: apiError } = await updateInquiryStatus(inquiry.id, newStatus);

    if (apiError) {
      setError(apiError);
    } else {
      onUpdated(data);
      setError("");
      // Optionally reset select to current status after success
      setNewStatus(inquiry.status);
    }

    setUpdating(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: 120 }}>
      <Select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        size="small"
        disabled={updating}
        sx={{ minWidth: 120 }}
      >
        {["Contacted", "Closed"].map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="outlined"
        size="small"
        onClick={handleUpdate}
        disabled={updating || newStatus === inquiry.status} // Disable if no change
        sx={{ minWidth: 120, height: 32 }}
      >
        {updating ? <CircularProgress size={16} /> : "Update Status"}
      </Button>
      {error && (
        <Alert severity="error" variant="filled" sx={{ fontSize: "0.75rem", p: 0.5 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}