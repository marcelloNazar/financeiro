"use client";
import { BsListUl, BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { salariosOptions, gastosOptions, months } from "@/utils/lists";
import { useFinance } from "@/providers/FinanceProvider";

const FilterPanel: React.FC = ({}) => {
  const {
    tipo,
    month,
    setOrdenacao,
    setMonth,
    setYear,
    setTipo,
    setCategory,
    setFinance,
  } = useFinance();

  function returnCategorys() {
    if (tipo === null) {
      return salariosOptions.concat(gastosOptions);
    }
    if (tipo) {
      return salariosOptions;
    }
    if (tipo === false) {
      return gastosOptions;
    }
    return salariosOptions.concat(gastosOptions);
  }

  return (
    <div
      onClick={() => setFinance(null)}
      className="flex flex-col text-xs justify-start p-2 pt-3 gap-1 items-center w-full lg:w-full bg-gray-800/40 rounded-tr-lg  lg:rounded-tr-lg"
    >
      <p className="font-semibold">ORDEM / FILTRO</p>
      <div className="flex w-full gap-1 my-0.5">
        <button
          className="black-button"
          onClick={() => setOrdenacao("valorDecrescente")}
        >
          Decr.
        </button>
        <button
          className="black-button"
          onClick={() => setOrdenacao("valorCrescente")}
        >
          Cresc.
        </button>
        <button
          className="black-button"
          onClick={() => setOrdenacao("dataCrescente")}
        >
          Data
        </button>
      </div>
      <div className="flex w-full gap-1">
        <select
          className="input"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((month: any) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select className="input" onChange={(e) => setYear(e.target.value)}>
          <option value="2023">2023</option>
        </select>
      </div>
      <div className="flex w-full gap-1 my-0.5">
        <button
          className="black-button text-blue-600 text-xl font-extrabold shadow-[0_0_4px_blue] hover:shadow-[0_0_7px_blue]"
          onClick={() => setTipo(null)}
        >
          <BsListUl />
        </button>
        <button
          className="black-button text-green-600 text-xl font-extrabold shadow-[0_0_4px_green] hover:shadow-[0_0_7px_green]"
          onClick={() => setTipo(true)}
        >
          <BsGraphUpArrow />
        </button>
        <button
          className="black-button flex text-red-600 text-xl font-extrabold shadow-[0_0_4px_red] hover:shadow-[0_0_7px_red]"
          onClick={() => setTipo(false)}
        >
          <BsGraphDownArrow />
        </button>
      </div>
      <div className="w-full hidden lg:block">
        <select className="input" onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categoria</option>
          {returnCategorys()!.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
