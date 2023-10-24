"use client"
import React from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { UseFormRegister } from "react-hook-form";
interface ToggleSwitchProps {
  tipo: boolean;
  register: UseFormRegister<any>; 
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ tipo, register }) => {
  return (
    <div className="flex w-full p-1 justify-center gap-4 items-center">
      <div className="flex justify-end items-end w-full font-bold text-3xl text-red-600">
        {!tipo ? <BsGraphDownArrow /> : <></>}
      </div>

      <label
        htmlFor="toggle-switch"
        className="flex items-center justify-center"
      >
        <input
          type="checkbox"
          id="toggle-switch"
          {...register("tipo")} // Use o registro diretamente aqui
          defaultChecked={tipo} // Defina o estado inicial com base em 'tipo'
          className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-white bg-opacity-5 shadow-[0_0_7px_red] hover:shadow-[0_0_11px_red] checked:shadow-[0_0_7px_green] checked:hover:hover:shadow-[0_0_11px_green] checked:bg-gray-800/40 transition duration-200 relative"
        />
      </label>

      <div className="flex justify-start items-center w-full font-bold text-3xl text-green-600">
        {tipo ? <BsGraphUpArrow /> : <></>}
      </div>
    </div>
  );
};

export default ToggleSwitch;
