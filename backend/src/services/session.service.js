import prisma from "../lib/prisma.js";
import { AppError, NotFoundError } from "../utils/error.js";

export const createNewSession = async ({userId, title}) => {
    // check if user exist
    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!user){
        const error = new NotFoundError("User not found.", 404);
        throw error;
    }

    const newSession = await prisma.session.create({
        data:{
            title:title,
            userId:{
                connect:{
                    id: userId
                }
            }
        },
    })

    return newSession;
}

export const getUserSessions = async ({userId}) => {
    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    });

    if(!user){
        const error = new NotFoundError("User not found", 404);
        throw error;
    }

    const sessions = await prisma.session.findMany({
        where:{
            userId:userId
        }
    })

    return sessions;
}

export const getSessionMessages = async ({userId, sessionId}) => {
    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    });

    if(!user){
        const error = new NotFoundError("User not found", 404);
        throw error;
    }

    const session = await prisma.session.findUnique({
        where:{
            id:sessionId
        }
    })

    const messages = await prisma.message.findMany({
        where: {
            session:{
                userId: userId
            }
        }
    })

    return messages;
}