import { Router } from "express";
import { authenticate } from "../modules/auth/auth.middleware";

const router = Router();

router.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    message: "Authenticated user",
    userId: (req as any).userId
  });
});

export default router;