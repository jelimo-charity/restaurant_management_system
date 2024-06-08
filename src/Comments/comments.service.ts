import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIcomments, TScomments, commentsTable } from "../drizzle/schema";

export const CommentsService = async (limit?: number): Promise<TScomments[] | null> => {
    if (limit) {
        return await db.query.commentsTable.findMany({
            limit: limit
        });
    }
    return await db.query.commentsTable.findMany();
}

export const getCommentService = async (id: number): Promise<TIcomments | undefined> => {
    return await db.query.commentsTable.findFirst({
        where: eq(commentsTable.id, id)
    })
}

export const createCommentService = async (Comment: TIcomments) => {
    await db.insert(commentsTable).values(Comment)
    return "Comment created successfully";
}

export const updateCommentService = async (id: number, Comment: TIcomments) => {
    await db.update(commentsTable).set(Comment).where(eq(commentsTable.id, id))
    return "Comment updated successfully";
}

export const deleteCommentService = async (id: number) => {
    await db.delete(commentsTable).where(eq(commentsTable.id, id))
    return "Comment deleted successfully";
}