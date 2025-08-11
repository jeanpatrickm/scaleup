"use client";

import DashboardLayout from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClipboardList, Lightbulb, Wallet } from "lucide-react";

export default function HomePage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Tarefas */}
        <Card className="bg-blue-50 border-none shadow-md hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2">
            <ClipboardList className="text-blue-600" size={24} />
            <CardTitle className="text-blue-700">Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Pendentes: <span className="font-semibold">2</span>
            </p>
            <p className="text-gray-700">
              Concluídas: <span className="font-semibold">1</span>
            </p>
          </CardContent>
        </Card>

        {/* Card Ideias */}
        <Card className="bg-yellow-50 border-none shadow-md hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2">
            <Lightbulb className="text-yellow-600" size={24} />
            <CardTitle className="text-yellow-700">Ideias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Total: <span className="font-semibold">2</span>
            </p>
          </CardContent>
        </Card>

        {/* Card Finanças */}
        <Card className="bg-green-50 border-none shadow-md hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2">
            <Wallet className="text-green-600" size={24} />
            <CardTitle className="text-green-700">Finanças</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Saldo: <span className="font-semibold">R$ 1.500</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
