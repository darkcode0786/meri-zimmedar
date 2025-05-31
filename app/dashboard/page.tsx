
"use client"
import Table1 from "@/components/comp-471";
import Table2 from "@/components/comp-479";
import TableCustom from "@/components/custum-table";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto border rounded-lg p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        <p className="text-center text-gray-500">You have successfully logged in!</p>
      </div>

      <div className=" p-8">
      <Table1/>
      </div>

      <div className=" p-8 overflow-scroll">
      <Table2/>
      </div>

      <div className=" p-8">
      <TableCustom/>
      </div> 
      <div className=" p-8">
      <div className="p-4">
  <div className="overflow-x-auto">
    <table className="min-w-full bg-blue-100 text-blue-900 border border-blue-200 rounded">
      <thead>
        <tr className="bg-blue-200">
          <th className="py-2 px-4 border-b border-blue-300 text-left">Name</th>
          <th className="py-2 px-4 border-b border-blue-300 text-left">Email</th>
          <th className="py-2 px-4 border-b border-blue-300 text-left">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-300">
          <td className="py-2 px-4 border-b border-blue-300">John Doe</td>
          <td className="py-2 px-4 border-b border-blue-300">john.doe@example.com</td>
          <td className="py-2 px-4 border-b border-blue-300">Admin</td>
        </tr>
        <tr className="hover:bg-blue-300">
          <td className="py-2 px-4 border-b border-blue-300">Jane Smith</td>
          <td className="py-2 px-4 border-b border-blue-300">jane.smith@example.com</td>
          <td className="py-2 px-4 border-b border-blue-300">Editor</td>
        </tr>
        <tr className="hover:bg-blue-300">
          <td className="py-2 px-4 border-b border-blue-300">Bob Johnson</td>
          <td className="py-2 px-4 border-b border-blue-300">bob.johnson@example.com</td>
          <td className="py-2 px-4 border-b border-blue-300">Viewer</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      </div> 
    </div>
  )
}
