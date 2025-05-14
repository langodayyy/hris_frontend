"use client";

import React, {createContext, useContext, useState} from "react";

// interface FormContextProps {
//     errors: string[];
//     setErrors: (errors: string[]) => void;
// }

type FormContextProps = {
    errors: string[]
    setErrors: (errors: string[]) => void
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export function FormProvider({children}: { children: React.ReactNode }) {
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <FormContext.Provider value={{ errors, setErrors }}>
            {children}
        </FormContext.Provider>
    );
};

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}