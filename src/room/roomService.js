const rooms = new Map(); // In-memory storage for rooms

const RoomService = {
    /**
     * Saves room details.
     * @param {string} roomName - Name of the room.
     * @param {string} roomTopic - Topic associated with the room in Waku.
     */
    saveRoomDetails: (roomName, roomTopic) => {
        if (rooms.has(roomTopic)) {
            throw new Error('Room already exists.');
        }

        const newRoom = {
            name: roomName,
            topic: roomTopic,
            users: []
        };

        rooms.set(roomTopic, newRoom);
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

        if (room.users.includes(userId)) {
            throw new Error('User already in the room.');
        }

        room.users.push(userId);
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

        room.users = room.users.filter(user => user !== userId);
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

        return room;
    },

    // Additional room management functions can be added here
};

module.exports = RoomService;
