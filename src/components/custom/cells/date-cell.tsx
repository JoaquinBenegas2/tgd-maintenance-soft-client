import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface DateCellProps {
  date: string;
}

export function DateCell({ date }: DateCellProps) {
  return <>{format(parseISO(date), "dd/MM/yyyy", { locale: es })}</>;
}
