"use client";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IFinance } from "@/interfaces/Post";
import { converterDataParaDDMMYY, numberToString } from "@/utils/format";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { useFinance } from "@/providers/FinanceProvider";

interface FinanceItemProps {
  teste: IFinance;
  handleDelete: (id: string) => void;
}

const FinanceItem: React.FC<FinanceItemProps> = ({ teste, handleDelete }) => {
  const { setUpdateModalIsOpen, setFinance } = useFinance();

  function handleUpdate(data: IFinance) {
    setFinance(data);
    setUpdateModalIsOpen(true);
  }
  return (
    <div key={teste._id} className="border-b flex border-gray-700">
      <div className="item-data w-full font-medium whitespace-nowrap text-white bg-gray-800/40">
        {teste.title.length > 27
          ? teste.title.substring(0, 27) + "..."
          : teste.title}
      </div>
      <div className="item-data w-20">
        {teste.tipo ? (
          <div className="flex pl-1 w-full font-bold text-xl text-green-600">
            <BsGraphUpArrow />
          </div>
        ) : (
          <div className="flex pl-1 w-full font-bold text-xl text-red-600">
            <BsGraphDownArrow />
          </div>
        )}
      </div>
      <div className="hidden w-32 lg:block item-data bg-gray-800/40">
        {converterDataParaDDMMYY(teste.date)}
      </div>
      <div className="item-data hidden w-56 lg:block">{teste.category}</div>
      <div className="item-data bg-gray-800/40 w-64">
        R$ {numberToString(teste.value)}
      </div>
      <div className="item-data w-24 font-bold text-xl gap-1">
        <button
          className="hover:text-indigo-600 hover:scale-110 duration-200"
          onClick={() => handleUpdate(teste)}
        >
          <AiFillEdit />
        </button>
        <button
          className="hover:text-red-600 hover:scale-110 duration-200"
          onClick={() => handleDelete(teste._id)}
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default FinanceItem;
