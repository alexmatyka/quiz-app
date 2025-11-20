import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Column<T> = {
  key: keyof T | string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface Props<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
}

export function Table<T extends { id: string }>({ data, columns }: Props<T>) {
  return (
    <ShadTable>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={String(col.key)}
              className={cn("py-6", col.className)}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                className={cn("py-6", col.className)}
              >
                {col.render
                  ? col.render(row)
                  : String(row[col.key as keyof typeof row])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  );
}
