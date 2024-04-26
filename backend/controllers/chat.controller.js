import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Retrieve conversations where the user is a participant
    const conversations = await Conversation.find({ participants: { $in: [userId] } }).populate("participants messages");
    res.status(200).json({ conversations });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
