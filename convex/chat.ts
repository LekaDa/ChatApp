import { mutation, query, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal, api } from './_generated/api'

export const sendMessage = mutation({
  args: {
    user: v.string(),
    chat_room_id: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      user: args.user,
      chat_room_id: args.chat_room_id,
      body: args.body,
    });
  },
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    // Get most recent messages first
    const messages = await ctx.db.query("messages").order("desc").take(50);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse();
  },
});

export const getMessagesByRoom = query({
  args: { chat_room_id: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chat_room_id"), args.chat_room_id))
      .collect();

    return messages.reverse();
  },
});

export const createChatRoom = mutation({
  args: {
    name: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chat_rooms", {
      name: args.name
    });
  },
});

export const getChatRooms = query({
  args: {},
  handler: async (ctx) => {
    // Get most recent messages first
    const chatRooms = await ctx.db.query("chat_rooms").collect();
    // Reverse the list so that it's in a chronological order.
    return chatRooms;
  },
});