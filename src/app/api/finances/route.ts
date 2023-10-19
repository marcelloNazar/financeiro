import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Finance from "@/models/Finance";
import { IFinance } from "@/interfaces/Post";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");
  const year = url.searchParams.get("year");
  const month = url.searchParams.get("month");
  const day = url.searchParams.get("day");

  try {
    await connect();

    const filters: any = {
      username: username,
    };

    if (year) {
      filters.date = { $regex: `^${year}` }; // Filtro por ano
    }

    if (month) {
      if (year) {
        // Se o ano estiver especificado, filtre pelo ano e mês
        filters.date = { $regex: `^${year}-${month}` };
      } else {
        // Se o ano não estiver especificado, filtre apenas pelo mês
        filters.date = { $regex: `-${month}-` };
      }
    }

    if (day) {
      if (year && month) {
        // Se o ano e o mês estiverem especificados, filtre pelo ano, mês e dia
        filters.date = { $regex: `^${year}-${month}-${day}` };
      } else {
        // Se o ano ou o mês não estiverem especificados, filtre apenas pelo dia
        filters.date = { $regex: `-${day}$` };
      }
    }

    const finances = await Finance.find(filters);

    return new NextResponse(JSON.stringify(finances), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const newFinance = new Finance(body as IFinance);

  try {
    await connect();

    await newFinance.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
