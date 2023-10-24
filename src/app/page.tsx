"use client";
import FinanceForm from "@/components/forms/FinanceForm";
import Spinner from "@/components/partials/Spinner";
import FilterPanel from "@/components/FilterPanel";
import FinanceList from "@/components/FinanceList";
import FinanceSummary from "@/components/FinaceSummary";
import Button from "@/components/partials/Button";
import Modal from "@/components/partials/Modal";
import TableHeader from "@/components/TableHeader";
import { useHomePage } from "@/components/hooks/useHomePage";

export default function Home() {
  const {
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
    isLoading,
  } = useHomePage();

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
