import {
  getAllInquiries,
  addInquiry,
  updateInquiryStatus
} from "../services/inquiries.service.js";


export function getInquiries(req, res) {
  try {
    const { status, source } = req.query;

    const inquiries = getAllInquiries({ status, source });

    return res.status(200).json({
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch inquiries",
      error: error.message
    });
  }
}

export function createInquiry(req, res) {
  try {
    const { name, email, phone, source } = req.body;

    if (!name || (!email && !phone) || !source) {
  throw new Error("Name and at least one contact (email or phone) plus source are required");
}


    const inquiry = addInquiry({ name, email, phone, source });

    return res.status(201).json({
      message: "Inquiry created successfully",
      data: inquiry
    });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(409).json({ message: error.message });
    }

    return res.status(400).json({ message: error.message });
  }
}

export function changeInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new Error("Status is required");
    }

    const updatedInquiry = updateInquiryStatus(id, status);

    return res.status(200).json({
      message: "Inquiry status updated",
      data: updatedInquiry
    });
  } catch (error) {
    if (error.message === "Inquiry not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(400).json({ message: error.message });
  }
}
