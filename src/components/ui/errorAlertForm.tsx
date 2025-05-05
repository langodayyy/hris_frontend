import React from "react";

interface ErrorAlertFormProps {
    errors: { [key: string]: string | string[] };
    fieldName: string;
}

const ErrorAlertForm: React.FC<ErrorAlertFormProps> = ({ errors, fieldName }) => {
    const fieldErrors = errors[fieldName];

    return (
        <div className="text-sm p-[10px] bg-danger-50 rounded-md">
            {Array.isArray(fieldErrors) ? (
                fieldErrors.map((err, idx) => (
                    <div className="flex flex-row items-center gap-2 py-2" key={idx}>
                        <svg
                            width="15"
                            height="16"
                            viewBox="0 0 22 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="11" cy="11.5" r="11" fill="#C11106" />
                            <path
                                d="M7 8L15 16M15 8L7 16"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>

                        <span className="text-danger-700 block">{err}</span>
                    </div>
                ))
            ) : (
                <span className="text-danger-700">{fieldErrors}</span>
            )}
        </div>
    );
};

export default ErrorAlertForm;