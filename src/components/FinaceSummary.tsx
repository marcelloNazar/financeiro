"use client";
import { numberToString } from "@/utils/functions";
interface FinanceSummaryProps {
  totalEntradas: number;
  totalSaidas: number;
}

const FinanceSummary: React.FC<FinanceSummaryProps> = ({
  totalEntradas,
  totalSaidas,
}) => {
  return (
    <div className="flex flex-col h-full w-full lg:h-full">
      <div className="total-card bg-gray-800/40 rounded-tl-lg lg:rounded-none">
        <p className="text-title">RECEITAS:</p>
        <h1 className="ml-4">R$ {numberToString(totalEntradas)}</h1>
      </div>

      <div className="total-card">
        <p className="text-title">DESPESAS:</p>
        <h1 className="ml-4">R$ {numberToString(totalSaidas)}</h1>
      </div>

      <div className="total-card bg-gray-800/40 lg:rounded-br-lg">
        <p className="text-title">SALDO:</p>
        <h1 className="ml-4">
          R$ {numberToString(totalEntradas - totalSaidas)}
        </h1>
      </div>
    </div>
  );
};

export default FinanceSummary;
