import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const financeValidator = Yup.object({
  title: Yup.string().required("Obrigado informar o Titulo"),
  value: Yup.string().required("Obrigado informar o Preço"),
  category: Yup.string(),
  date: Yup.string(),
  tipo: Yup.boolean().required("Obrigado informar o Tipo"),
});

export const FinanceResolver = yupResolver(financeValidator);
