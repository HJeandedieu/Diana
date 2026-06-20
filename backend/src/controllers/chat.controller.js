import { fetchChatResponse } from "../services/chat.service.js";

const getMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sessionId, message } = req.body;
    const response = await fetchChatResponse({ userId, sessionId, message });

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

export default getMessage;
