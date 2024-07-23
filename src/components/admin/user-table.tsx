import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "../ui/button"
  
  const users = [
    {
      kwhNumber: "INV001",
      email: "test@gmail.com",
      variant: "900",
    },
    {
      kwhNumber: "INV002",
      email: "text@gmail.com",
      variant: "2000",
    },
    {
      kwhNumber: "INV003",
      email: "Untest@gmail.com",
      variant: "1500",
    },
    {
      kwhNumber: "INV004",
      email: "test@gmail.com",
      variant: "3000",
    },
    {
      kwhNumber: "INV005",
      email: "test@gmail.com",
      variant: "900",
    },
    {
      kwhNumber: "INV006",
      email: "text@gmail.com",
      variant: "900",
    },
    {
      kwhNumber: "INV007",
      email: "Untest@gmail.com",
      variant: "900",
    },
  ]

  
  export function UserTable() {
    return (
      <Table className="border border-white">
        <TableHeader className="bg-slate-900">
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead className="col-span-2">Email</TableHead>
            <TableHead>KwhNumber</TableHead>
            <TableHead>Variant</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, i) => (
            <TableRow key={user?.kwhNumber} className="bg-slate-800">
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.kwhNumber}</TableCell>
              <TableCell >{user?.variant} Kwh</TableCell>
              <TableCell >
                <Button className="bg-slate-700">
                  Buat Tagihan
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  