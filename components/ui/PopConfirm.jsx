"use client"
import OutsideClickHandler from "react-outside-click-handler";


const PopConfirm = ({ question, setConfirm, addClass }) => {
    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setConfirm(false);
            }}
        >
            <div className={`absolute w-52 h-18 -bottom-20 left-48 rounded-lg bg-orange-500 p-1 z-20 ${addClass}`}>
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
                    <button className="btn text-sm" onClick={() => setConfirm(false)} type="button">
                        NO
                    </button>
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default PopConfirm;
