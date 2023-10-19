"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useFinance } from "@/providers/FinanceProvider";

export default function Header() {
  const { isOpen, setIsOpen } = useFinance();
  const links = [
    {
      id: 1,
      title: "",
      url: "/",
    },
  ];
  const session = useSession();
  const username = session.data?.user?.name;
  const firstName = username?.split(" ")[0];
  const imageUrl = session.data?.user?.image;

  return (
    <section className="flex flex-1 max-w-6xl mx-auto px-2 justify-between items-center ">
      <h1>Controle Finaceiro</h1>
      <div className="flex items-center gap-4 ">
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="">
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <div className="flex flex-col items-center">
            <button
              className="flex items-center rounded-full border border-transparent focus:shadow-[0_0_7px_indigo] hover:shadow-[0_0_4px_indigo] duration-200 hover:text-gray-200 hover:scale-110 "
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                className="rounded-full"
                src={imageUrl!}
                alt="Descrição da imagem"
                width={36} 
                height={36} 
              />
              {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp  />}
            </button>
            {isOpen && (
              <div className="flex absolute justify-end mr-20 mt-12">
                <div className="flex flex-col w-32 h-52 rounded-lg p-2 shadow-[0_0_4px_indigo] bg-gray-950">
                  <div className="flex flex-col justify-center h-full gap-4 border-b mb-2">
                    <div className="flex justify-center">
                      <Image
                        className="rounded-full"
                        src={imageUrl!}
                        alt="Descrição da imagem"
                        width={70} 
                        height={70} 
                      />
                    </div>
                    <div className="flex justify-center">Olá, {firstName}!</div>
                  </div>
                  <button
                    className="hover:text-white"
                    onClick={() => signOut()}
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
