"use client";
import { useState, useEffect } from "react";
import { IFinance } from "@/interfaces/Finance";
import { FinanceResolver } from "@/utils/validators";
import { useForm } from "react-hook-form";
import Input from "../partials/Input";
import ToggleSwitch from "../partials/ToggleSwitch";
import { useFinance } from "@/providers/FinanceProvider";
import { salariosOptions, gastosOptions } from "@/utils/lists";
import {
  numberToString,
  letrasMaiusculas,
  formatarDataParaString,
} from "@/utils/format";
import Button from "../partials/Button";
import { useFinanceForm } from "./useFinanceForm";

type FinanceFormProps = {
  data?: Partial<IFinance>;
  formSubmit: (data: Partial<IFinance>) => void;
  nameButton: string;
};
const FinanceForm: React.FC<FinanceFormProps> = ({
  data = {},
  formSubmit,
  nameButton,
}) => {
  const {
    submitForm,
    errors,
    register,
    handleSubmit,
    valor,
    handleValorChange,
    category,
    tipo,
    returnCategorys,
    date,
    loading,
  } = useFinanceForm(data, formSubmit);
  return (
    <div className="flex w-full px-2">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-2"
      >
        <Input
          type="text"
          {...register("title")}
          placeholder="Titulo"
          error={errors?.title?.message}
        />

        <Input
          type="text"
          {...register("value")}
          inputMode="decimal"
          placeholder="Valor"
          value={valor}
          onChange={(e) => handleValorChange(e.target.value)}
          error={errors?.value?.message}
        />

        <ToggleSwitch register={register} tipo={tipo} />

        <div className="w-full">
          <select className="input" {...register("category")} value={category}>
            <option value="" className="dark:text-gray-600">
              Categoria
            </option>
            {returnCategorys()!.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors?.category?.message && (
            <p className="text-xs text-red-600">{errors?.category?.message}</p>
          )}
        </div>

        <Input
          type="date"
          value={date}
          placeholder="Data"
          {...register("date")}
        />

        <Button
          onClick={handleSubmit(submitForm)}
          text={nameButton}
          isLoading={loading}
        />
      </form>
    </div>
  );
};

export default FinanceForm;
