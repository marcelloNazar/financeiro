"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { IFinance } from "@/interfaces/Finance";
import { useFinance } from "@/providers/FinanceProvider";
import { redirect } from "next/navigation";

export const useHomePage = () => {
  const {
    finance,
    setFinance,
    setLoading,
    year,
    month,
    day,
    setIsOpen,
    addModalIsOpen,
    setAddModalIsOpen,
    updateModalIsOpen,
    setUpdateModalIsOpen,
  } = useFinance();

  function closeUpdateModal() {
    setUpdateModalIsOpen(false);
    setFinance(null);
  }

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/");
    },
  });

  const username = session.data?.user?.name;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  function apiUrl() {
    let apiUrl = `/api/finances?username=${username}`;
    if (year && year !== "") {
      apiUrl += `&year=${year}`;
    }
    if (month && month !== "") {
      apiUrl += `&month=${month}`;
    }
    if (day && day !== "") {
      apiUrl += `&day=${day}`;
    }
    return apiUrl;
  }

  const { data, mutate, error, isLoading } = useSWR(apiUrl, fetcher);

  const handleSubmit = async (data: Partial<IFinance>) => {
    setLoading(true);
    try {
      await fetch("api/finances", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          value: data.value,
          tipo: data.tipo,
          category: data.category,
          date: data.date,
          username: session.data!.user!.name,
        }),
      });
      setLoading(false);
      setAddModalIsOpen(false);
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (data: Partial<IFinance>) => {
    setLoading(true);
    try {
      await fetch(`/api/finances/${finance!._id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: data.title,
          value: data.value,
          tipo: data.tipo,
          category: data.category,
          date: data.date,
          username: session.data!.user!.name,
        }),
      });
      setLoading(false);
      setUpdateModalIsOpen(false);
      mutate();
    } catch {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    setFinance(null);
    try {
      await fetch(`/api/finances/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch {
      console.log(error);
    }
  };

  function balance() {
    let totalEntradas = 0;
    let totalSaidas = 0;

    data?.forEach((teste: IFinance) => {
      if (teste.tipo) {
        totalEntradas += teste.value;
      } else {
        totalSaidas += teste.value;
      }
    });
    return { totalEntradas, totalSaidas };
  }

  const { totalEntradas, totalSaidas } = balance();
  return {
    session,
    finance,
    data,
    handleSubmit,
    handleUpdate,
    handleDelete,
    totalEntradas,
    totalSaidas,
    setIsOpen,
    addModalIsOpen,
    setAddModalIsOpen,
    updateModalIsOpen,
    closeUpdateModal,
    setUpdateModalIsOpen,
    isLoading,
  };
};
