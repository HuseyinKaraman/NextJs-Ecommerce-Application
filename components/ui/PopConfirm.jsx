"use client";
import OutsideClickHandler from "react-outside-click-handler";

const PopConfirm = ({ question, setConfirm, sendRequest,}) => {
    return (
        <div className="flex justify-center items-end pb-20 fixed inset-0 z-10 w-full h-screen bg-slate-300 bg-opacity-60">
            <OutsideClickHandler
                onOutsideClick={() => {
                    setConfirm(false);
                }}
            >
                {/* w-52 h-18 -bottom-10 left-20  */}
                <div className={`rounded-lg flex flex-col justify-around bg-red-700 gap-2 p-1 !z-50 w-72 h-32`}> 
                    <p className="text-sm">{question}</p>
                    <div className="flex justify-between">
                        <button
                            className="btn text-sm"
                            onClick={() => {
                                setConfirm(false);
                                sendRequest();
                            }}
                            type="button"
                        >
                            Yes
                        </button>
                        <button
                            className="btn text-sm"
                            onClick={() => {
                                setConfirm(false);
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
