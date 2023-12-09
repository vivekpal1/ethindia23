const rooms = new Map();

const RoomService = {
    /**
     * Creates a new room.
     * @param {string} roomName - Name of the room.
     * @param {string} roomTopic - Topic associated with the room in Waku.
     */
    createRoom: (roomName, roomTopic) => {
        if (rooms.has(roomTopic)) {
            throw new Error('Room already exists with this topic.');
        }

        const newRoom = {
            name: roomName,
            topic: roomTopic,
            messages: [],
            users: new Set()
        };

        rooms.set(roomTopic, newRoom);
    },

    /**
     * Adds a message to a room.
     * @param {string} roomTopic - Topic of the room.
     * @param {object} message - The message object to add.
     */
    addMessageToRoom: (roomTopic, message) => {
        const room = rooms.get(roomTopic);
        if (!room) {
            throw new Error('Room does not exist.');
        }

        room.messages.push(message);
    },

    /**
     * Adds a user to a room.
     * @param {string} userId - ID of the user to add.
     * @param {string} roomTopic - Topic of the room to join.
     */
    addUserToRoom: (userId, roomTopic) => {
        const room = rooms.get(roomTopic);
        if (!room) {
            throw new Error('Room does not exist.');
        }

        room.users.add(userId);
    },

    /**
     * Removes a user from a room.
     * @param {string} userId - ID of the user to remove.
     * @param {string} roomTopic - Topic of the room to leave.
     */
    removeUserFromRoom: (userId, roomTopic) => {
        const room = rooms.get(roomTopic);
        if (!room) {
            throw new Error('Room does not exist.');
        }

        room.users.delete(userId);
    },

    /**
     * Retrieves details of a room.
     * @param {string} roomTopic - Topic of the room.
     * @returns {Object} - Room details.
     */
    getRoomDetails: (roomTopic) => {
        const room = rooms.get(roomTopic);
        if (!room) {
            throw new Error('Room does not exist.');
        }

        return { ...room, users: Array.from(room.users) }; // Convert Set to Array for user list
    },

    /**
     * Retrieves all rooms.
     * @returns {Array} - An array of all room details.
     */
    getAllRooms: () => {
        return Array.from(rooms.values());
    }
};

module.exports = RoomService;
