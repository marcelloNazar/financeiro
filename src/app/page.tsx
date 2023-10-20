"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { IFinance } from "@/interfaces/Finance";
import { useRouter } from "next/navigation";
import FinanceForm from "@/components/FinanceForm/FinanceForm";
import Spinner from "@/components/partials/Spinner";
import { useFinance } from "@/providers/FinanceProvider";
import FilterPanel from "@/components/FilterPanel";
import FinanceList from "@/components/FinanceList";
import FinanceSummary from "@/components/FinaceSummary";
import Button from "@/components/partials/Button";
import Modal from "@/components/partials/Modal";
import TableHeader from "@/components/TableHeader";
import { redirect } from "next/navigation";

export default function Home({ params }: any) {
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
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/");
    },
  });
  console.log(session);

  const username = session.data?.user?.name;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
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

  const { data, mutate, error, isLoading } = useSWR(apiUrl, fetcher);

  const router = useRouter();

  function closeUpdateModal() {
    setUpdateModalIsOpen(false);
    setFinance(null);
  }

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

  let totalEntradas = 0;
  let totalSaidas = 0;

  data?.forEach((teste: IFinance) => {
    if (teste.tipo) {
      totalEntradas += teste.value;
    } else {
      totalSaidas += teste.value;
    }
  });

  if (session.status === "loading") {
    return <Spinner />;
  }

  return (
    <section onClick={() => setIsOpen(false)} className="page-container">
      <table className="table-container rounded-b-lg lg:rounded-tl-lg lg:rounded-br-none">
        <TableHeader
          title="Titulo"
          type="Tipo"
          date="Data"
          category="Categoria"
          value="Valor"
          edit="Editar"
        />
        {data?.length === 0 ? (
          <p className="flex w-full justify-center mt-2">
            Adicione uma finança!
          </p>
        ) : (
          <FinanceList data={data} handleDelete={handleDelete} />
        )}
      </table>
      <div className="flex flex-row-reverse w-full lg:flex-col lg:h-full lg:w-96">
        {" "}
        <div className="flex flex-col w-[480px] lg:w-full">
          <FilterPanel />
          <div className="flex h-full pb-2 lg:hidden px-2 bg-gray-800/40">
            <Button
              onClick={() => setAddModalIsOpen(true)}
              text="Adicionar"
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="hidden lg:flex w-full my-2">
          <FinanceForm formSubmit={handleSubmit} nameButton="Adicionar" />
        </div>
        <div className="flex flex-col w-full h-full">
          <FinanceSummary
            totalEntradas={totalEntradas}
            totalSaidas={totalSaidas}
          />
        </div>
      </div>
      <Modal
        title="Salvar"
        isOpen={addModalIsOpen}
        onClose={() => setAddModalIsOpen(false)}
      >
        <FinanceForm formSubmit={handleSubmit} nameButton="Adicionar" />
      </Modal>
      <Modal
        title="Atualizar"
        isOpen={updateModalIsOpen}
        onClose={closeUpdateModal}
      >
        <FinanceForm
          formSubmit={handleUpdate}
          data={finance ? finance : {}}
          nameButton="Salvar"
        />
      </Modal>
    </section>
  );
}
