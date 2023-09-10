const chatHelper = require('../utils/chat_helper');

test('dummy returns one', () => {
    const chats = [];

    const result = chatHelper.dummy(chats);
    expect(result).toBe(1);
});

test('total chats returns the correct count', () => {
    const chats = [
        { chats: [{ text: 'Hi' }, { text: 'Hello' }] },
        { chats: [{ text: 'How are you?' }] },
    ];

    const result = chatHelper.totalChats(chats);
    expect(result).toBe(3);
});

test('favChat returns the chat with the most chats', () => {
    const chats = [
        { chats: [{ text: 'Hi' }, { text: 'Hello' }] },
        { chats: [{ text: 'How are you?' }] },
        { chats: [] },
    ];

    const result = chatHelper.favChat(chats);
    expect(result).toEqual({ chats: [{ text: 'Hi' }, { text: 'Hello' }] });
});
