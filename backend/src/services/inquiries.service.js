import { readInquiries, writeInquiries } from "../utils/fileStorage.js";
import { v4 as uuidv4 } from "uuid";

const VALID_SOURCES = ["Website", "WhatsApp", "Email", "Referral"];
const VALID_STATUSES = ["New", "Contacted", "Closed"];


export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export function normalizePhone(phone) {
  if (!phone) return null;
  return phone.replace(/[^\d]/g, ""); 
}

export function isValidPhone(phone) {
  const normalized = normalizePhone(phone);
  return /^[0-9]{10,15}$/.test(normalized);
}


export function getAllInquiries(filters = {}) {
  let inquiries = readInquiries();
  if (!Array.isArray(inquiries)) return [];

  if (filters.status) {
    inquiries = inquiries.filter((i) => i.status === filters.status);
  }

  if (filters.source) {
    inquiries = inquiries.filter((i) => i.source === filters.source);
  }

  return inquiries.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}



export function addInquiry({ name, email, phone, source }) {
  if (!name || !name.trim()) {
    throw new Error("Name is required");
  }

  if (!email && !phone) {
    throw new Error("Either email or phone number is required");
  }

  const normEmail = email?.trim().toLowerCase() || null;
  const normPhone = phone ? normalizePhone(phone) : null;

  if (normEmail && !isValidEmail(normEmail)) {
    throw new Error("Invalid email format");
  }

  if (normPhone && !isValidPhone(normPhone)) {
    throw new Error("Invalid phone number");
  }

  if (!VALID_SOURCES.includes(source)) {
    throw new Error("Invalid inquiry source");
  }

  const inquiries = readInquiries();


  const duplicate = inquiries.find((inq) => {
    if (normEmail && inq.email?.toLowerCase() === normEmail) return true;
    if (normPhone && normalizePhone(inq.phone) === normPhone) return true;
    return false;
  });

  if (duplicate) {
    throw new Error("Inquiry with same email or phone already exists");
  }

  const now = new Date().toISOString();

  const newInquiry = {
    id: uuidv4(),
    name: name.trim(),
    email: normEmail,
    phone: normPhone,
    source,
    status: "New",
    createdAt: now,
    updatedAt: now,
  };

  inquiries.push(newInquiry);
  writeInquiries(inquiries);

  return newInquiry;
}


export function updateInquiryStatus(id, status) {
  if (!id) {
    throw new Error("Inquiry ID is required");
  }

  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Invalid status");
  }

  const inquiries = readInquiries();
  const index = inquiries.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new Error("Inquiry not found");
  }

  inquiries[index] = {
    ...inquiries[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  writeInquiries(inquiries);
  return inquiries[index];
}
