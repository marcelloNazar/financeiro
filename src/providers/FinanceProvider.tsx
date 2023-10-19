"use client";
import { IFinance } from "@/interfaces/Post";
import React, { createContext, ReactNode, useState } from "react";

interface FinanceContextType {
  finance: IFinance | null;
  setFinance: (finance: IFinance | null) => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isLoading: boolean) => void;
  addModalIsOpen: boolean;
  setAddModalIsOpen: (isLoading: boolean) => void;
  updateModalIsOpen: boolean;
  setUpdateModalIsOpen: (isLoading: boolean) => void;
  year: string;
  setYear: (year: string) => void;
  month: string;
  setMonth: (month: string) => void;
  day: string;
  setDay: (day: string) => void;
  category: string;
  setCategory: (day: string) => void;
  tipo: boolean | null;
  setTipo: (day: boolean | null) => void;
  ordenacao: string;
  setOrdenacao: (day: string) => void;
}

interface Props {
  children: ReactNode;
}

export const FinanceContext = createContext<FinanceContextType>({
  finance: null,
  setFinance: () => {},
  loading: false,
  setLoading: () => {},
  isOpen: false,
  setIsOpen: () => {},
  addModalIsOpen: false,
  setAddModalIsOpen: () => {},
  updateModalIsOpen: false,
  setUpdateModalIsOpen: () => {},
  year: "",
  setYear: () => {},
  month: "",
  setMonth: () => {},
  day: "",
  setDay: () => {},
  category: "",
  setCategory: () => {},
  ordenacao: "",
  setOrdenacao: () => {},
  tipo: false,
  setTipo: () => {},
});

export const FinanceProvider: React.FC<Props> = ({ children }) => {
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const [year, setYear] = useState<string>(currentYear);
  const [month, setMonth] = useState<string>(currentMonth);
  const [day, setDay] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tipo, setTipo] = useState<boolean | null>(null);
  const [ordenacao, setOrdenacao] = useState("dataCrescente");

  return (
    <FinanceContext.Provider
      value={{
        finance,
        setFinance,
        loading,
        setLoading,
        isOpen,
        setIsOpen,
        addModalIsOpen,
        setAddModalIsOpen,
        updateModalIsOpen,
        setUpdateModalIsOpen,
        year,
        setYear,
        month,
        setMonth,
        day,
        setDay,
        category,
        setCategory,
        tipo,
        setTipo,
        ordenacao,
        setOrdenacao,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = React.useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useAtendimento must be used within a AtendimentoProvider");
  }
  return context;
};

export default FinanceContext;
