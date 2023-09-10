// Utility function to return 1 (for dummy test)
const dummy = (chats) => {
  return 1;
};

// Utility function to calculate the total number of chats
const totalChats = (chats) => {
  let total = 0;
  chats.forEach((chat) => {
    total += chat.chats.length;
  });
  return total;
};

// Utility function to find the chat with the most chats
const favChat = (chats) => {
  let maxChats = 0;
  let favoriteChat = null;
  
  chats.forEach((chat) => {
    if (chat.chats.length > maxChats) {
      maxChats = chat.chats.length;
      favoriteChat = chat;
    }
  });

  return favoriteChat;
};

module.exports = {
  dummy,
  totalChats,
  favChat,
};
