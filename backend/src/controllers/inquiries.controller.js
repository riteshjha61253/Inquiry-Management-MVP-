import {
  getAllInquiries,
  addInquiry,
  updateInquiryStatus
} from "../services/inquiries.service.js";

export function getInquiries(req, res) {
  try {
    const inquiries = getAllInquiries();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export function createInquiry(req, res) {
  try {
    const { name, email, phone, source } = req.body;

    const inquiry = addInquiry({ name, email, phone, source });

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export function changeInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedInquiry = updateInquiryStatus(id, status);

    res.status(200).json(updatedInquiry);
  } catch (error) {
    if (error.message === "Inquiry not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
}
