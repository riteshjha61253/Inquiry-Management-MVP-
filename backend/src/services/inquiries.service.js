import { readInquiries, writeInquiries } from "../utils/fileStorage.js";
import { v4 as uuidv4 } from "uuid";

const VALID_SOURCES = ["Website", "WhatsApp", "Email", "Referral"];
const VALID_STATUSES = ["New", "Contacted", "Closed"];


export function getAllInquiries() {
  return readInquiries();
}

export function addInquiry({ name, contact, source }) {
  // Basic validation (intentionally minimal)
  if (!name || !name.trim()) {
    throw new Error("Name is required");
  }

  if (!contact || !contact.trim()) {
    throw new Error("Contact is required");
  }

  if (!VALID_SOURCES.includes(source)) {
    throw new Error("Invalid source");
  }

  const inquiries = readInquiries();
  const now = new Date().toISOString();

  const newInquiry = {
    id: uuidv4(),
    name: name.trim(),
    contact: contact.trim(),
    source,
    status: "New",
    createdAt: now,
    updatedAt: now
  };

  inquiries.unshift(newInquiry); // newest first
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
