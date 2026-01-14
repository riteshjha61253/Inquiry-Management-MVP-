import { readInquiries, writeInquiries } from "../utils/fileStorage.js";
import { v4 as uuidv4 } from "uuid";

const VALID_SOURCES = ["Website", "WhatsApp", "Email", "Referral"];
const VALID_STATUSES = ["New", "Contacted", "Closed"];

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^[0-9]{10,15}$/.test(phone);
}

export function getAllInquiries() {
  return readInquiries();
}

export function addInquiry({ name, email, phone, source }) {
  // Name validation
  if (!name || !name.trim()) {
    throw new Error("Name is required");
  }

  if (!email && !phone) {
    throw new Error("Either email or phone number is required");
  }


  if (email && !isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (phone && !isValidPhone(phone)) {
    throw new Error("Invalid phone number");
  }

  if (!VALID_SOURCES.includes(source)) {
    throw new Error("Invalid inquiry source");
  }

  const inquiries = readInquiries();
  const now = new Date().toISOString();

  const newInquiry = {
    id: uuidv4(),
    name: name.trim(),
    email: email || null,
    phone: phone || null,
    source,
    status: "New",
    createdAt: now,
    updatedAt: now
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
    updatedAt: new Date().toISOString()
  };

  writeInquiries(inquiries);
  return inquiries[index];
}
