"use client";
import OutsideClickHandler from "react-outside-click-handler";

const PopConfirm = ({ question, setConfirm, sendRequest, addClass }) => {

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setConfirm(false);
            }}
        >
            <div className={`absolute w-52 h-18 -bottom-10 left-20 rounded-lg bg-red-600 p-1 z-50 ${addClass}`}>
                <p className="text-sm mb-2">{question}</p>
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
    );
};

export default PopConfirm;
