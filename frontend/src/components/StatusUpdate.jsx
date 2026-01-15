import { MenuItem, Select, Button, CircularProgress, Box, Typography, Alert } from "@mui/material";
import { useState, useEffect } from "react"; 
import { updateInquiryStatus } from "../utils/api";

export default function StatusUpdate({ inquiry, onUpdated }) {
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const availableStatuses = ["Contacted", "Closed"].filter(
    (s) => s !== inquiry.status 
  );

  useEffect(() => {
    if (availableStatuses.length > 0) {
      setNewStatus(availableStatuses[0]);
    }
  }, [inquiry.status, availableStatuses]);

  const handleUpdate = async () => {
    if (!newStatus) return; 

    setUpdating(true);
    setError("");

    const { data, error: apiError } = await updateInquiryStatus(inquiry.id, newStatus);

    if (apiError) {
      setError(apiError);
    } else {
      setError("");
      onUpdated(data);

      if (availableStatuses.length > 0) {
        setNewStatus(availableStatuses[0]);
      }
    }

    setUpdating(false);
  };

  if (availableStatuses.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No updates available
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: 120 }}>
      <Select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        size="small"
        disabled={updating}
        sx={{ minWidth: 120 }}
      >
        {availableStatuses.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="outlined"
        size="small"
        onClick={handleUpdate}
        disabled={updating || newStatus === inquiry.status} 
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