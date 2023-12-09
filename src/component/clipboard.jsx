import { useState } from "react";
import addIcon from '../assets/add.svg';
import Modal from "./modal";
import closeIcon from '../assets/close.svg';
import deleteIcon from '../assets/delete.svg';

export default function Clipboard() {
    // Initial data for the clipboard
    const initialClipboards = [
        {
            id: 1,
            type: 'local',
            name: 'My Clipboard',
            data: [
                { id: 1, type: 'text', value: 'Hello World!' },
                { id: 2, type: 'text', value: 'gm' },
                { id: 3, type: 'text', value: 'waku lessgo' },
            ],
        },
        // More initial clipboards can be added here if needed
    ];

    const [clipboardData, setClipboardData] = useState(initialClipboards);
    const [currentTab, setCurrentTab] = useState(initialClipboards[0]);
    const [showModal, setShowModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showCopiedId, setShowCopiedId] = useState(null);

    const onJoinRoom = () => {
        const roomKey = document.getElementById('room_key').value;
        if (roomKey === '') return;
        const newRoom = {
            id: clipboardData.length + 1,
            type: 'room',
            name: roomKey,
            data: [],
        };
        setClipboardData([...clipboardData, newRoom]);
        setShowModal(false);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            console.log("Pasted text:", text);

            // Only proceed if there's text and the current tab is a room
            if (text && currentTab.type === 'room') {
                const newItem = {
                    id: Date.now(), // Unique identifier for the new item
                    type: 'text',
                    value: text
                };

                // Add the new item to the current room's data
                const updatedData = [...currentTab.data, newItem];
                const updatedTab = { ...currentTab, data: updatedData };

                // Update the overall clipboardData with the new item in the current room
                const updatedClipboardData = clipboardData.map(tab => 
                    tab.id === currentTab.id ? updatedTab : tab
                );

                setClipboardData(updatedClipboardData);
                setCurrentTab(updatedTab);
            }
        } catch (err) {
            console.error("Error pasting text:", err);
        }
    };

    const onLeaveRoom = () => {
        const newClipboardData = clipboardData.filter(clipboard => clipboard.id !== currentTab.id);
        setClipboardData(newClipboardData);
        setCurrentTab(newClipboardData[0]);
        setShowLeaveModal(false);
    };

    const toggleCopiedVisibility = (id) => {
        setShowCopiedId(id);
        setTimeout(() => setShowCopiedId(null), 500);
    };

    const removeTextItem = (itemId) => {
        const updatedTabData = currentTab.data.filter(item => item.id !== itemId);
        
        const updatedCurrentTab = { ...currentTab, data: updatedTabData };

        const updatedClipboardData = clipboardData.map(tab => 
            tab.id === currentTab.id ? updatedCurrentTab : tab
        );

        setClipboardData(updatedClipboardData);
        setCurrentTab(updatedCurrentTab);
    };

    return (
        <div className="mt-20 w-[90vw] md:w-[70vw]">
            <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={onJoinRoom} callToAction="Add">
                <p className="text-base font-medium mt-2 mb-5">Add new room</p>
                <div>
                    <label htmlFor="room_key" className="block mb-2 text-xs font-medium text-start">Room Key</label>
                    <input type="text" id="room_key" className="border bg-transparent border-zinc-800 focus:outline-none focus:border-white text-sm rounded-lg block w-full p-2 px-3" required />
                </div>
            </Modal>

            <Modal show={showLeaveModal} onClose={() => setShowLeaveModal(false)} onSubmit={onLeaveRoom} callToAction="Leave">
                <p className="text-base font-medium mt-2 text-start ml-1">Are you sure you want to remove this room?</p>
            </Modal>

            <div className="flex items-end justify-between ml-2">
                <div className="flex items-center">
                    {clipboardData.map(tab => (
                        <div key={tab.id} className={`flex items-center gap-3 text-sm font-medium p-2 px-5 rounded-t-lg cursor-pointer border border-b-0 transition-all ease-in-out duration-200 ${currentTab.id === tab.id ? 'bg-zinc-900 border-zinc-800' : 'border-transparent hover:border-zinc-900'}`} onClick={() => setCurrentTab(tab)}>
                            {tab.name}
                            {currentTab.id === tab.id && currentTab.type === 'room' && (
                                <div onClick={() => setShowLeaveModal(true)} className="p-1 rounded-full hover:bg-zinc-800 transition-all ease-in-out duration-200">
                                    <img src={closeIcon} alt="Close" className="h-3 w-3 select-none" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={handlePaste} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Paste Text
                </button>
                <div onClick={() => setShowModal(true)} className="flex items-center gap-1 my-1 border border-zinc-800 bg-zinc-900 p-1 px-2 rounded-lg cursor-pointer hover:scale-95 transition-all ease-in-out duration-200">
                    <img src={addIcon} alt="Add" className="h-4 w-4 select-none" />
                    <p className="text-sm font-medium">Add Room</p>
                </div>
            </div>

            <div className="border border-zinc-800 rounded-xl p-2 flex flex-col h-[45vh] overflow-y-auto">
                {currentTab.data.map(item => (
                    <div key={item.id} className="relative p-3 px-4 text-sm font-medium hover:bg-zinc-900 rounded-lg transition-all ease-in-out duration-200 text-start cursor-pointer">
                        {item.value}
                        <span onClick={() => { navigator.clipboard.writeText(item.value); toggleCopiedVisibility(item.id); }} className={`absolute top-1/2 -translate-y-1/2 right-10 text-xs font-medium text-green-500 flex items-center gap-1 ${showCopiedId === item.id ? 'visible' : 'invisible'} transition-all ease-in-out duration-500`}>
                            <span className="relative h-1 w-1">
                                <span className="absolute h-1 w-1 rounded-full bg-green-500"></span>
                                <span className="absolute h-1 w-1 rounded-full bg-green-500 blur-sm"></span>
                            </span>
                            Copied!
                        </span>
                        <img src={deleteIcon} alt="Delete" className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 cursor-pointer" onClick={() => removeTextItem(item.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
