"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { IFinance } from "@/interfaces/Post";
import { useRouter } from "next/navigation";
import FinanceForm from "@/components/forms/FinanceForm";
import Spinner from "@/components/partials/Spinner";
import { useFinance } from "@/providers/FinanceProvider";
import FilterPanel from "@/components/FilterPanel";
import FinanceList from "@/components/FinanceList";
import FinanceSummary from "@/components/FinaceSummary";
import Button from "@/components/partials/Button";
import Modal from "@/components/partials/Modal";

export default function Home({ params }: any) {
  const {
    finance,
    setFinance,
    setLoading,
    year,
    setYear,
    month,
    setMonth,
    day,
    setCategory,
    setTipo,
    setOrdenacao,
    setIsOpen,
    addModalIsOpen,
    setAddModalIsOpen,
    updateModalIsOpen,
    setUpdateModalIsOpen,
  } = useFinance();
  const session = useSession();

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
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  return (
    <section
      onClick={() => setIsOpen(false)}
      className="flex flex-col-reverse lg:flex-row  w-full h-full max-w-6xl mx-auto p-2  rounded-lg "
    >
      <div className="flex flex-col w-full h-full bg-gray-800/40 overflow-scroll scrollbar scrollbar-thumb-gray-800/40 flex-grow rounded-b-lg lg:rounded-tl-lg lg:rounded-br-none">
        <div className="flex text-xs uppercase">
          <div className="item-data w-full bg-gray-800/50 lg:rounded-tl-lg">
            Titulo
          </div>
          <div className="item-data dark:bg-gray-900/20 w-20">Tipo</div>
          <div className="hidden lg:block item-data w-32 bg-gray-800/50">
            Data
          </div>
          <div className="item-data hidden lg:block  w-56 dark:bg-gray-900/20">
            Categoria
          </div>
          <div className="item-data bg-gray-800/50 w-64">Valor</div>
          <div className="item-data  w-24">Editar</div>
        </div>
        <FinanceList data={data} handleDelete={handleDelete} />
      </div>
      <div className="flex flex-row-reverse h-72 w-full lg:flex-col lg:h-full lg:w-96">
        {" "}
        <FilterPanel
          setOrdenacao={setOrdenacao}
          setMonth={setMonth}
          setYear={setYear}
          setTipo={setTipo}
          setCategory={setCategory}
          setFinance={setFinance}
        />
        <div className="hidden lg:flex w-full my-2">
          <FinanceForm formSubmit={handleSubmit} nameButton="Adicionar" />
        </div>
        <div className="flex flex-col w-full h-full gap-2 pb-2 lg:pb-0">
          <FinanceSummary
            totalEntradas={totalEntradas}
            totalSaidas={totalSaidas}
          />
          <div className="flex w-full px-2 lg:hidden">
            <Button
              onClick={() => setAddModalIsOpen(true)}
              text="Adicionar"
              isLoading={isLoading}
            />
          </div>
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
