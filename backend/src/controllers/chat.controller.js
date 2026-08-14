import { randomUUID } from "crypto";
import { fetchChatResponse } from "../services/chat.service.js";

const getMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sessionId, message } = req.body;
    const response = await fetchChatResponse({ userId, sessionId, message });

    res.status(200).json({
      success: true,
      data: {
        id: randomUUID(),
        role: "assistant",
        content: response,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getMessage;