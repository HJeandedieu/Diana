import {
  fetchMemories,
  editMemory,
  removeMemory,
} from "../services/memory.service.js";

export const getMemories = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const memories = await fetchMemories({ userId });
    res.json({ success: true, data: memories });
  } catch (error) {
    next(error);
  }
};

export const updateMemory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const memoryId = req.params.id;
    const { content } = req.body;
    const updated = await editMemory({ userId, memoryId, content });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteMemory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const memoryId = req.params.id;
    await removeMemory({ userId, memoryId });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};