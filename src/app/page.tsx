import DashboardLayout from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Pendentes: 2</p>
            <p>Concluídas: 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ideias</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: 2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Finanças</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Saldo: R$ 1.500</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
