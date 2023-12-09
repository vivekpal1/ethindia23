const wakuSetup = require('./wakuSetup');

let rooms = {};

const RoomService = {
    /**
     * Creates a new room.
     * @param {string} roomName - The name of the room.
     * @returns {Promise<string>} - The topic of the created room.
     */
    createRoom: async (roomName) => {
        const roomTopic = `uniboardRoom:${roomName}`;
        rooms[roomTopic] = {
            name: roomName,
            users: []
        };

        // You should replace the above with a database insert operation

        // Optional: Broadcast room creation over Waku (if necessary)
        // const waku = wakuSetup.getWakuNode();
        // Broadcast room creation logic using waku.relay.send...

        return roomTopic;
    },

    /**
     * Adds a user to a room.
     * @param {string} userId - The ID of the user.
     * @param {string} roomTopic - The topic of the room to join.
     * @returns {Promise<void>}
     */
    addUserToRoom: async (userId, roomTopic) => {
        const room = rooms[roomTopic];
        if (room) {
            room.users.push(userId);
            // Replace with a database update operation
        } else {
            throw new Error(`Room with topic ${roomTopic} does not exist.`);
        }
    },

    /**
     * Removes a user from a room.
     * @param {string} userId - The ID of the user.
     * @param {string} roomTopic - The topic of the room to leave.
     * @returns {Promise<void>}
     */
    removeUserFromRoom: async (userId, roomTopic) => {
        const room = rooms[roomTopic];
        if (room) {
            room.users = room.users.filter(user => user !== userId);
            // Replace with a database update operation
        } else {
            throw new Error(`Room with topic ${roomTopic} does not exist.`);
        }
    },

    /**
     * Retrieves details for a specific room.
     * @param {string} roomTopic - The topic of the room.
     * @returns {Promise<Object>} - The details of the room.
     */
    getRoomDetails: async (roomTopic) => {
        const room = rooms[roomTopic];
        if (room) {
            return room;
            // Replace with a database query operation
        } else {
            throw new Error(`Room with topic ${roomTopic} does not exist.`);
        }
    }

    // Additional functionalities like listing all rooms, broadcasting room details, etc. can be added here
};

module.exports = RoomService;
