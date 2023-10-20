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



export const useFinanceForm=(
    data: Partial<IFinance>,
    formSubmit: (data:Partial<IFinance>) =>void
)=>{
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
      return salariosOptions.concat(gastosOptions);
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
    return {
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
        loading
      };
    
}