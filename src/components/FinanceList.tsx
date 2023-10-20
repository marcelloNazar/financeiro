"use client";
import { useFinance } from "@/providers/FinanceProvider";
import FinanceItem from "./FinanceItem";
import { IFinance } from "@/interfaces/Finance";

interface FinanceListProps {
  data: IFinance[] | null;
  handleDelete: (id: string) => void;
}

const FinanceList: React.FC<FinanceListProps> = ({ data, handleDelete }) => {
  const { category, tipo, ordenacao } = useFinance();
  return (
    <tbody className="flex flex-col">
      {data
        ?.filter((finance: IFinance) =>
          finance.category.toLowerCase().includes(category.toLowerCase())
        )
        .filter((finance: IFinance) => tipo === null || finance.tipo === tipo)
        .sort((a: IFinance, b: IFinance) => {
          if (ordenacao === "valorCrescente") {
            return a.value - b.value;
          } else if (ordenacao === "valorDecrescente") {
            return b.value - a.value;
          } else {
            return a.date.localeCompare(b.date);
          }
        })
        .map((finance) => (
          <FinanceItem
            key={finance._id}
            data={finance}
            handleDelete={handleDelete}
          />
        ))}
    </tbody>
  );
};

export default FinanceList;
