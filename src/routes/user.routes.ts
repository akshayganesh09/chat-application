import { Router } from "express";
import { authenticate } from "../modules/auth/auth.middleware";
import { handleGetConversation } from "../controllers/conversation.controller";

const router = Router();

router.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    message: "Authenticated user",
    userId: (req as any).userId
  });
});

router.post("/conversation", authenticate, handleGetConversation)

export default router;