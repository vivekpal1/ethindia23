import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './modal';

const ContextMenu = ({ position, clipboardData, setClipboardData, currentRoom, setCurrentRoom }) => {
  const [showModal, setShowModal] = useState(false);
  const [roomKey, setRoomKey] = useState('');

  const handleCopy = () => {
    if (clipboardData && clipboardData.value) {
      navigator.clipboard.writeText(clipboardData.value)
        .then(() => console.log("Copied to clipboard:", clipboardData.value))
        .catch(err => console.error("Error copying text:", err));
    }
  };

  const handlePaste = () => {
    navigator.clipboard.readText()
      .then(text => {
        console.log("Pasted from clipboard:", text);
      })
      .catch(err => console.error("Error pasting text:", err));
  };

  const handleCreateRoom = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowModal(true);
  };

  const handleRoomKeyChange = (e) => {
    setRoomKey(e.target.value);
  };

  const handleRoomCreation = () => {
    if (roomKey.trim() === '') {
      alert('Please enter a room key.');
      return;
    }
    const newRoom = {
      id: clipboardData.length + 1,
      type: 'room',
      name: roomKey,
      data: [],
    };
    clipboardData(prevData => [...prevData, newRoom]);
    setShowModal(false);
    setRoomKey('');
    console.log('Room created:', roomKey);
  };

  const handleDelete = () => {
    // Implement logic to delete the selected text/item
    // This might involve identifying which item is currently selected or in focus
  };

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleRoomCreation}
          callToAction="Add"
        >
          <p className="text-base font-medium mt-2 mb-5">Add new room</p>
          <div>
            <label htmlFor="room_key" className="block mb-2 text-xs font-medium text-start">Room Key</label>
            <input
              type="text"
              id="room_key"
              value={roomKey}
              onChange={handleRoomKeyChange}
              className="border bg-transparent border-zinc-800 focus:outline-none focus:border-white text-sm rounded-lg block w-full p-2 px-3"
              required
            />
            <button onClick={handleRoomCreation} className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Add Room
            </button>
          </div>
        </Modal>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="absolute bg-gray-800 text-gray-300 border border-gray-600 shadow-lg rounded-md overflow-hidden z-50"
        style={{ top: position.y, left: position.x }}
      >
        <ul className="text-xs space-y-1">
          <li
            className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out"
            onClick={handleCopy}
          >
            <span>Copy</span>
            <kbd className="font-sans bg-gray-700 rounded px-1">Ctrl+C</kbd>
          </li>
          <li
            className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out"
            onClick={handlePaste}
          >
            <span>Paste</span>
            <kbd className="font-sans bg-gray-700 rounded px-1">Ctrl+V</kbd>
          </li>
          <li
            className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out"
            onClick={handleCreateRoom}
          >
            <span>Create Room</span>
            <kbd className="font-sans bg-gray-700 rounded px-1">Ctrl+N</kbd>
          </li>
          <li className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out" onClick={handleDelete}>
          <span>Delete</span>
          <kbd className="font-sans bg-gray-700 rounded px-1">Del</kbd>
        </li>
        </ul>
      </motion.div>
    </>
  );
};

export default ContextMenu;
