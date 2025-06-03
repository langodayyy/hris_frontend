"use client";

import React, { createContext, useContext, useState } from "react";

type EditContextProps = {
  selectedRow: any | null;
  setSelectedRow: (row: any | null) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  workType: "WFO" | "WFA";
  setWorkType: (type: "WFO" | "WFA") => void;
  errors: Record<string, string[]>;
  setErrors: (errors: Record<string, string[]>) => void;
};

const EditContext = createContext<EditContextProps | undefined>(undefined);

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [workType, setWorkType] = useState<"WFO" | "WFA">("WFO");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  return (
    <EditContext.Provider 
      value={{ 
        selectedRow, 
        setSelectedRow, 
        isOpen, 
        setIsOpen,
        workType,
        setWorkType,
        errors, 
        setErrors 
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEdit must be used within an EditProvider");
  }
  return context;
}