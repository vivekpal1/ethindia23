import { useAccount } from 'wagmi'

export default function Header() {
    const { address, isConnecting, isDisconnected } = useAccount();

    return (
        <div className="header fixed top-0 left-0 right-0 h-20 border-b border-zinc-800 flex items-center justify-center backdrop-blur-lg">
            <div className="w-[90vw] md:w-[80vw] flex items-center justify-between">
                <h1 className="text-white">Uniboard</h1>
                {/* {address} */}
                <w3m-button size="sm" />
            </div>
        </div>
    );
}