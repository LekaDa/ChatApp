import { v } from "convex/values";
import { defineTable, defineSchema } from "convex/server";

export const Messages = {
    body: v.string(),
    chat_room_id: v.optional(v.string()),
    user: v.string()
}

export const ChatRooms = {
    name: v.string()
}

export default defineSchema({
    messages: defineTable(Messages),
    chat_rooms: defineTable(ChatRooms)
})