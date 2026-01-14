import fs from "fs";
import path from "path";

// Absolute path to storage file
const DATA_FILE = path.resolve("src/storage/inquiries.json");

export function readInquiries() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");

    if (!raw) return [];

    return JSON.parse(raw);
  } catch (error) {
    // If file is corrupted or unreadable, fail loudly
    console.error("Failed to read inquiries:", error);
    return [];
  }
}

export function writeInquiries(inquiries) {
  try {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(inquiries, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Failed to write inquiries:", error);
    throw error;
  }
}
