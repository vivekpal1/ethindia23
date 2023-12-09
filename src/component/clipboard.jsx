import { useEffect, useState } from "react"
import addIcon from '../assets/add.svg';
import Modal from "./modal";
import closeIcon from '../assets/close.svg';

export default function Clipboard() {
    const clipboards = [
        {
            id: 1,
            type: 'local',
            name: 'My Clipboard',
            data: [
                {
                    id: 1,
                    type: 'text',
                    value: 'Hello World!'
                },
                {
                    id: 2,
                    type: 'text',
                    value: 'gm'
                },
                {
                    id: 3,
                    type: 'text',
                    value: 'waku lessgo'
                }
            ]
        },
        {
            id: 2,
            type: 'room',
            name: 'ETHIndia',
            data: [
                {
                    id: 1,
                    type: 'text',
                    value: 'Hello from ETH'
                },
                {
                    id: 2,
                    type: 'text',
                    value: 'gm from ETH'
                },
                {
                    id: 3,
                    type: 'text',
                    value: 'waku from ETH lessgo'
                }
            ]
        }
    ]

    const [ clipboardData, setClipboardData ] = useState(clipboards);
    const [ currentTab, setCurrentTab ] = useState(clipboards[0]);
    const [ showModal, setShowModal ] = useState(false);
    const [ showLeaveModal, setShowLeaveModal ] = useState(false);
    const [ showCopiedId, setShowCopiedId ] = useState(null);

    const onJoinRoom = () => {
        const roomKey = document.getElementById('room_key').value;
        if(roomKey==='') return;
        setClipboardData([...clipboardData, {
            id: clipboardData.length + 1,
            type: 'room',
            name: roomKey,
            data: []
        }]);
        setShowModal(false);
        console.log(roomKey);
    }

    const onLeaveRoom = () => {
        const newClipboardData = clipboardData.filter((clipboard) => clipboard.id !== currentTab.id);
        setClipboardData(newClipboardData);
        setCurrentTab(newClipboardData[0]);
        setShowLeaveModal(false);
    }

    const toggleCopiedVisibility = (id) => {
        if(showCopiedId!==id) setShowCopiedId(id);
        setTimeout(() => {
            setShowCopiedId(null)
        }, 500);
    }

    return (
        <div className="mt-20 w-[90vw] md:w-[70vw]">
            <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={onJoinRoom} callToAction="Add">
                <p className="text-base font-medium mt-2 mb-5">Add new room</p>
                <div>
                    <label for="room_key" class="block mb-2 text-xs font-medium text-start">Room Key</label>
                    <input type="text" id="room_key" class="border bg-transparent border-zinc-800 focus:outline-none focus:border-white text-sm rounded-lg block w-full p-2 px-3" required />
                </div>
            </Modal>

            <Modal show={showLeaveModal} onClose={() => setShowLeaveModal(false)} onSubmit={onLeaveRoom} callToAction="Leave">
                <p className="text-base font-medium mt-2 text-start ml-1">Are you sure you want to remove this room?</p>
            </Modal>


            <div className="flex items-end justify-between ml-2">
                <div className="flex items-center">
                    {clipboardData.map((tab) => (
                        <div key={tab.id} className={`flex items-center gap-3 text-sm font-medium p-2 px-5 rounded-t-lg cursor-pointer border border-b-0 transition-all ease-in-out duration-200 ${currentTab.id===tab.id ? 'bg-zinc-900 border-zinc-800':'border-transparent hover:border-zinc-900'} ${currentTab.id===tab.id && currentTab.type==='room' ? 'pr-2':''}`} onClick={() => setCurrentTab(tab)}>
                            {tab.name}
                            { currentTab.id===tab.id && currentTab.type==='room' && <div onClick={() => setShowLeaveModal(true)} className="p-1 rounded-full hover:bg-zinc-800 transition-all ease-in-out duration-200">
                                <img src={closeIcon} alt="" className="h-3 w-3 select-none" />
                            </div>}
                        </div>
                    ))}
                </div>
                <div onClick={() => setShowModal(true)} className="flex items-center gap-1 my-1 border border-zinc-800 bg-zinc-900 p-1 px-2 rounded-lg cursor-pointer hover:scale-95 transition-all ease-in-out duration-200">
                    <img src={addIcon} alt="" className="h-4 w-4 select-none" />
                    <p className="text-sm font-medium">Add Room</p>
                </div>
            </div>

            <div className="border border-zinc-800 rounded-xl p-2 flex flex-col h-[45vh] overflow-y-auto">
                { currentTab.data.map((item) => {
                    return (
                        <p className="relative p-3 px-4 text-sm font-medium hover:bg-zinc-900 rounded-lg transition-all ease-in-out duration-200 text-start cursor-pointer" onClick={() => {navigator.clipboard.writeText(item.value); toggleCopiedVisibility(item.id)}}>
                            {item.value}
                            <span className={`absolute top-1/2 -translate-y-1/2 right-3 text-xs font-medium text-green-500 flex items-center gap-1 ${showCopiedId===item.id ? 'visible':'invisible'} transition-all ease-in-out duration-500`}>
                                <span className="relative h-1 w-1">
                                    <span className="absolute h-1 w-1 rounded-full bg-green-500"></span>
                                    <span className="absolute h-1 w-1 rounded-full bg-green-500 blur-sm"></span>
                                </span>
                                copied!
                            </span>
                        </p>
                    )
                })}
            </div>
        </div>
    );
}