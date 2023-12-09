export default function Modal({ show, onClose, onSubmit, callToAction, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop grid place-content-center fixed inset-0 z-20 backdrop-blur-sm bg-zinc-900 bg-opacity-30">
            <div className="modal p-6 border border-zinc-800 bg-black w-full max-w-md rounded-2xl flex flex-col justify-between transition-all ease-in-out duration-300 mx-4">
                {children}
                <div className="flex items-center justify-end gap-4 mt-4">
                    <button
                        className="text-sm font-medium py-2 px-4 bg-red-600 hover:bg-red-700 text-white transition-all ease-in-out duration-200 rounded-md"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="text-sm font-medium py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white transition-all ease-in-out duration-200 rounded-md"
                        onClick={onSubmit}
                    >
                        {callToAction}
                    </button>
                </div>
            </div>
        </div>
    );
}
