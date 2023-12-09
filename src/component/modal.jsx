export default function Modal({ show, onClose, onSubmit, callToAction, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop grid place-content-center fixed z-20 h-screen w-screen top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-zinc-900 bg-opacity-30">
            <div className="modal p-3 border border-zinc-900 bg-black w-96 rounded-2xl flex flex-col justify-between transition-all ease-in-out duration-300">
                {/* <p className="text-base font-medium mt-2 mb-5">Add new room</p> */}
                {children}
                <div className="flex items-center gap-2 mt-7">
                    <button className="text-sm font-medium py-1 px-3 border border-zinc-800 bg-[#5F9FF8] hover:scale-95 transition-all ease-in-out duration-200 rounded-md w-20" onClick={onSubmit}>{callToAction}</button>
                    <button className="text-sm font-medium py-1 px-3 border border-zinc-800 hover:scale-95 transition-all ease-in-out duration-200 rounded-md w-20" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};