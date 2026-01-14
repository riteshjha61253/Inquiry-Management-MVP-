import { useEffect, useState } from "react";
import InquiryForm from "./components/InquiryForm";
import InquiryList from "./components/InquiryList";
import { getInquiries } from "./utils/api";
import { Container, Typography, CircularProgress, Alert, Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export default function App() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filterSource, setFilterSource] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const VALID_SOURCES = ["Website", "WhatsApp", "Email", "Referral"];
  const VALID_STATUSES = ["New", "Contacted", "Closed"];

  const fetchAll = async (filters = {}) => {
    setLoading(true);
    setError("");

    const { data, error: apiError } = await getInquiries(filters);

    if (apiError) setError(apiError);
    else setInquiries(Array.isArray(data) ? data : data?.data || []);

    setLoading(false);
  };

  
  const handleNewInquiry = () => {
    fetchAll({ source: filterSource, status: filterStatus });
  };

  const handleStatusUpdate = (updated) =>
    setInquiries(inquiries.map((i) => (i.id === updated.id ? updated : i)));

  const handleApplyFilters = () => {
    const filters = {};
    if (filterSource) filters.source = filterSource;
    if (filterStatus) filters.status = filterStatus;
    fetchAll(filters);
  };


  const handleResetFilters = () => {
    setFilterSource("");
    setFilterStatus("");
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Inquiries Dashboard
      </Typography>

      <InquiryForm onSuccess={handleNewInquiry} />

      <Box sx={{ display: "flex", gap: 2, mb: 2, mt: 2, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Source</InputLabel>
          <Select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            label="Source"
          >
            <MenuItem value="">
              <em>All Sources</em>
            </MenuItem>
            {VALID_SOURCES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">
              <em>All Statuses</em>
            </MenuItem>
            {VALID_STATUSES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={handleApplyFilters} size="small">
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={handleResetFilters} size="small">
            Reset
          </Button>
        </Box>
      </Box>

      {loading && (
        <CircularProgress
          size={30}
          sx={{ display: "block", mt: 2, mb: 2, mx: "auto" }}
        />
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <InquiryList inquiries={inquiries || []} onStatusChange={handleStatusUpdate} />
      )}
    </Container>
  );
}