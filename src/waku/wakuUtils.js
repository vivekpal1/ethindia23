const { Waku, WakuMessage } = require('js-waku');
const { decrypt, encrypt } = require('../encryption/encryptDecrypt'); // Assuming you have encryption utilities

let waku;

const WakuUtils = {
    /**
     * Initializes the Waku node.
     */
    initializeWaku: async () => {
        waku = await Waku.create();
        console.log('Waku node initialized');
        return waku;
    },

    /**
     * Sends a message to a given room.
     * @param {string} roomTopic - The topic of the room.
     * @param {string} message - The message to be sent.
     */
    sendMessage: async (roomTopic, message) => {
        if (!waku) {
            console.log('Waku node is not initialized');
            return;
        }

        try {
            const encryptedMessage = encrypt(message);
            const wakuMessage = await WakuMessage.fromUtf8String(encryptedMessage, roomTopic);
            await waku.relay.send(wakuMessage);
            console.log('Message sent');
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },

    /**
     * Subscribes to a room to receive messages.
     * @param {string} roomTopic - The topic of the room.
     * @param {function} messageHandler - Callback function to handle incoming messages.
     */
    subscribeToRoom: async (roomTopic, messageHandler) => {
        if (!waku) {
            console.log('Waku node is not initialized');
            return;
        }

        try {
            await waku.relay.addObserver(message => {
                if (message.contentTopic === roomTopic) {
                    const decryptedMessage = decrypt(message.payloadAsUtf8);
                    messageHandler(decryptedMessage);
                }
            }, [roomTopic]);
            console.log(`Subscribed to room: ${roomTopic}`);
        } catch (error) {
            console.error('Error subscribing to room:', error);
            throw error;
        }
    },

    /**
     * Unsubscribes from a room.
     * @param {string} roomTopic - The topic of the room.
     */
    unsubscribeFromRoom: async (roomTopic) => {
        if (!waku) {
            console.log('Waku node is not initialized');
            return;
        }

        try {
            // Waku unsubscribe logic here (if applicable)
            console.log(`Unsubscribed from room: ${roomTopic}`);
        } catch (error) {
            console.error('Error unsubscribing from room:', error);
            throw error;
        }
    }

    // Additional Waku-related functionalities can be added here
};

module.exports = WakuUtils;
