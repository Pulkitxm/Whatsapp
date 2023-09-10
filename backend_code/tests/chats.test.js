const chatHelper_dummy = require('../utils/chat_helper').dummy;
const chatHelper_totalChats = require('../utils/chat_helper').totalChats;
const chatHelper_favChat = require('../utils/chat_helper').favChat;

const listWithMultipleChats = [
    {
        id: "64fc481a5e1b9def1fcdc330",
        id2: "64fc088b3d27952f5c394352",
        chats: [
            {
                text: "Hello",
                time: "3:55 PM",
                date: "9/23"
            },
            {
                text: "Hi",
                time: "3:56 PM",
                date: "9/23"
            }
        ]
    },
    // Add more chat objects here
];

test('dummy returns one', () => {
    const chats = [];

    const result = chatHelper_dummy(chats);
    expect(result).toBe(1);
});

describe('total chats', () => {
    test('when the list has no chats, equals to zero', () => {
        const result = chatHelper_totalChats([]);
        expect(result).toBe(0);
    });

    test('of a list with multiple chats, is calculated right', () => {
        const result = chatHelper_totalChats(listWithMultipleChats);
        // Calculate the total number of chats in listWithMultipleChats manually
        let totalChats = 0;
        listWithMultipleChats.forEach((chat) => {
            totalChats += chat.chats.length;
        });
        expect(result).toBe(totalChats);
    });
});

describe('favorite chat', () => {
    // Find the chat object with the most chats manually
    let favChat = listWithMultipleChats[0];
    listWithMultipleChats.forEach((chat) => {
        if (chat.chats.length > favChat.chats.length) {
            favChat = chat;
        }
    });

    const result = chatHelper_favChat(listWithMultipleChats);

    test('favorite chat is the one with the most chats', () => {
        expect(result).toEqual(favChat);
    });
});
