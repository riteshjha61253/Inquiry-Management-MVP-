import { Router } from "express";
import {
  getInquiries,
  createInquiry,
  changeInquiryStatus
} from "../controllers/inquiries.controller.js";

const router = Router();

router.get("/", getInquiries);
router.post("/", createInquiry);
router.patch("/:id/status", changeInquiryStatus);

export default router;
