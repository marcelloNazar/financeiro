"use client";
import { useState, useEffect } from "react";
import { IFinance } from "@/interfaces/Post";
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
  formatarData,
} from "@/utils/format";
import Button from "../partials/Button";

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
  const { finance, setFinance, loading, setLoading } = useFinance();

  const formMethods = useForm<IFinance>({ resolver: FinanceResolver as any });
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = formMethods;

  const title = watch("title");
  const category = watch("category");
  const tipo = watch("tipo");
  const date = watch("date");
  const [valor, setValor] = useState(
    data.value ? data.value.toString().replace(".", ",") : ""
  );

  const dataAtual = new Date();

  const handleSetData = (data: IFinance) => {
    setValue("title", data.title || "");
    setValue("category", data.category!);
    setValor(numberToString(data.value) || "");
    setValue("date", data.date || "");
    setValue("tipo", data.tipo || false);
  };
  const handleRemoveData = () => {
    setValue("title", "");
    setValue("category", "");
    setValor("");
    setValue("date", "");
    setValue("tipo", false);
    setFinance(null);
  };

  useEffect(() => {
    setValue("title", letrasMaiusculas(title || ""));
  }, [title]);

  useEffect(() => {
    if (finance) {
      handleSetData(finance);
    }
    if (!finance) {
      handleRemoveData();
    }
  }, [finance]);

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
    return salariosOptions.concat(gastosOptions)
  }

  const submitForm = (values: IFinance) => {
    let finalDate;
    let finalCategory;
    if (!date) {
      finalDate = formatarDataParaString(dataAtual);
    } else {
      finalDate = date;
    }
    if (!category) {
      finalCategory = "-";
    } else {
      finalCategory = category;
    }
    formSubmit({
      title,
      category: finalCategory,
      tipo: values.tipo,
      value: Number(valor.replace(",", ".")),
      date: finalDate,
    });
    handleRemoveData();
  };

  const handleValorChange = (inputValor: string) => {
    const decimalPart = inputValor.split(",")[1];
    if (
      inputValor === "" ||
      (!isNaN(Number(inputValor.replace(",", "."))) &&
        (!decimalPart || decimalPart.length <= 2))
    ) {
      setValor(inputValor);
    }
  };

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
