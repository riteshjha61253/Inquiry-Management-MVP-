import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Generic wrapper for error handling
const request = async (fn) => {
  try {
    const res = await fn();
    return { data: res.data, error: null };
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const getInquiries = (filters = {}) =>
  request(() => API.get("/inquiries", { params: filters }));

export const addInquiry = (data) =>
  request(() => API.post("/inquiries", data));

export const updateInquiryStatus = (id, status) =>
  request(() => API.patch(`/inquiries/${id}/status`, { status }));
