

const Input = (props) => {
    const { type, errorMessage, touched,placeholder, ...inputProps } = props;

    return (
        <div className="w-full">
            <label className="relative block cursor-text w-full">
                <input
                    className={`h-14 w-full border-[3px] outline-none px-4 peer 
                    ${type !== "datetime-local" && "pt-2"} 
                    ${touched && errorMessage ? "border-danger" : "border-primary"  }`}
                    type={type}
                    {...inputProps}
                />
                {type !== "datetime-local" && (
                    <span className="absolute top-0 left-0 px-4 h-full flex items-center text-sm peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
                        {placeholder}
                    </span>
                )}
            </label>
                {touched && <span className="text-xs text-danger">{errorMessage}</span>}
        </div>
    );
};

export default Input;
