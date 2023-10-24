"use client";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IFinance } from "@/interfaces/Finance";
import { converterDataParaDDMMYY, numberToString } from "@/utils/functions";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { useFinance } from "@/providers/FinanceProvider";
interface FinanceItemProps {
  data: IFinance;
  handleDelete: (id: string) => void;
}

const FinanceItem: React.FC<FinanceItemProps> = ({ data, handleDelete }) => {
  const { setUpdateModalIsOpen, setFinance } = useFinance();

  function handleUpdate(data: IFinance) {
    setFinance(data);
    setUpdateModalIsOpen(true);
  }
  return (
    <tr key={data._id} className="border-b flex border-gray-700">
      <th className="item-data w-full font-medium whitespace-nowrap text-white bg-gray-800/40">
        {data.title.length > 27
          ? data.title.substring(0, 27) + "..."
          : data.title}
      </th>
      <td className="item-data w-24">
        {data.tipo ? (
          <div className="flex w-full font-bold text-xl text-green-600">
            <BsGraphUpArrow />
          </div>
        ) : (
          <div className="flex w-full font-bold text-xl text-red-600">
            <BsGraphDownArrow />
          </div>
        )}
      </td>
      <td className="hidden w-32 lg:block item-data bg-gray-800/40">
        {converterDataParaDDMMYY(data.date)}
      </td>
      <td className="item-data hidden w-56 lg:block">{data.category}</td>
      <td className="item-data bg-gray-800/40 w-64">
        R$ {numberToString(data.value)}
      </td>
      <td className="item-data w-24 text-xl">
        <button
          className="hover:text-indigo-600 mr-[2px] w-full hover:scale-110 duration-200"
          onClick={() => handleUpdate(data)}
        >
          <AiFillEdit />
        </button>
        <button
          className="hover:text-red-600 w-full mr-[1px] hover:scale-110 duration-200"
          onClick={() => handleDelete(data._id)}
        >
          <AiFillDelete />
        </button>
      </td>
    </tr>
  );
};

export default FinanceItem;
