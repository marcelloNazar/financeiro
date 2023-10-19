export function numberToString(number?: number) {
  const string = number?.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });
  return string;
}



export function converterDataParaDDMMYY(data: string): string {
  const partes = data.split("-"); // Divide a string nos hífens
  if (partes.length === 3) {
    const ano = partes[0].substring(2); // Pega os dois últimos dígitos do ano
    const mes = partes[1];
    const dia = partes[2];
    return `${dia}/${mes}`;
  } else {
    throw new Error("Formato de data inválido. Use o formato AAAA-MM-DD.");
  }
}
export function letrasMaiusculas(str: string) {
  return str.toUpperCase();
}
export function formatarDataParaString(data: Date): string {
  const ano = String(data.getFullYear());
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Lembre-se de que os meses são base 0
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
