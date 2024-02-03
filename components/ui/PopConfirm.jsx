"use client";
import OutsideClickHandler from "react-outside-click-handler";

const PopConfirm = ({ message, setConfirm, sendRequest, addClass }) => {
    return (
        <div className="flex justify-center items-end pb-20 fixed inset-0 z-10 w-full h-screen bg-slate-300 bg-opacity-25">
            <OutsideClickHandler
                onOutsideClick={() => {
                    setConfirm(false);
                }}
            >
                {/* w-52 h-18 -bottom-10 left-20  */}
                <div
                    className={`rounded-lg flex flex-col justify-around bg-red-700 gap-2 p-1 !z-50 w-72 h-32
                ${addClass}
                `}
                >
                    <p className="text-sm">{message}</p>
                    <div className="flex justify-between">
                        <button
                            className="btn text-sm cursor-pointer"
                            onClick={() => {
                                setConfirm(prev => !prev);
                                sendRequest();
                            }}
                            type="button"
                        >
                            Yes
                        </button>
                        <button
                            className="btn text-sm cursor-pointer"
                            onClick={() => {
                                console.log("no");
                                setConfirm(prev => !prev);
                            }}
                            type="button"
                        >
                            NO
                        </button>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default PopConfirm;
