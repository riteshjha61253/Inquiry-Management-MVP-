import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { addInquiry } from "../utils/api";

export default function InquiryForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", phone: "", source: "Website" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    const { data, error: apiError } = await addInquiry(formData);

    if (apiError) {
      setError(apiError);
    } else {
      onSuccess(data);
      reset();
      setSuccess("Inquiry added successfully");

      // auto clear success
      setTimeout(() => setSuccess(""), 2000);
    }

    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
      <Typography variant="h6">Add New Inquiry</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", {
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        {...register("phone", {
          pattern: {
            value: /^[0-9]{10,15}$/,
            message: "Invalid phone number",
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        select
        label="Source"
        fullWidth
        margin="normal"
        {...register("source", { required: true })}
      >
        {["Website", "WhatsApp", "Email", "Referral"].map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
        {loading ? <CircularProgress size={20} /> : "Add Inquiry"}
      </Button>
    </Box>
  );
}
