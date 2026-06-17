import { createNewSession, getUserSessions, getSessionMessages } from "../services/session.service.js";

export const createSession = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const newSession = await createNewSession(userId, req.body);
        return res.status(200).json({success:true, message:"Session created successfully", data: newSession});
    } catch(error){
        next(error)
    }
}

export const getSessions = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const sessions = await getUserSessions(userId);
        return res.status(200).json({success:true, data: sessions})
    } catch(error){
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const messages = await getSessionMessages(userId, req.params.id);

        return res.status(200).json({success:true, data:messages});

    } catch(error){
        next(error)
    }
}