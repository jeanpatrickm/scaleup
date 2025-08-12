"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

interface BankAccount {
  name: string;
  initialBalance: number;
  transactions: Transaction[];
}

export default function FinancesPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { name: "Nubank", initialBalance: 0, transactions: [] },
    { name: "Itaú", initialBalance: 0, transactions: [] },
  ]);

  const [selectedBank, setSelectedBank] = useState("Nubank");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [initialBalance, setInitialBalance] = useState("");

  const updateInitialBalance = () => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.name === selectedBank
          ? { ...acc, initialBalance: parseFloat(initialBalance) || 0 }
          : acc
      )
    );
    setInitialBalance("");
  };

  const addTransaction = () => {
    if (!description.trim() || !amount) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.name === selectedBank
          ? { ...acc, transactions: [...acc.transactions, newTransaction] }
          : acc
      )
    );

    setDescription("");
    setAmount("");
    setType("income");
  };

  const deleteTransaction = (bankName: string, id: number) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.name === bankName
          ? {
              ...acc,
              transactions: acc.transactions.filter((t) => t.id !== id),
            }
          : acc
      )
    );
  };

  const getTotal = (account: BankAccount) => {
    return account.transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.amount : acc - t.amount;
    }, account.initialBalance);
  };

  const getBankColor = (bankName: string) => {
    if (bankName === "Nubank") return "bg-purple-50";
    if (bankName === "Itaú") return "bg-orange-50";
    return "bg-gray-50";
  };

  const getBankIcon = (bankName: string) => {
    const fileName = bankName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return `/icons/${fileName}.png`;
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Gestão Financeira</h1>

      {/* Seleção de banco */}
      <div className="flex gap-3 mb-6">
        <Select
          value={selectedBank}
          onValueChange={(val) => setSelectedBank(val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o banco" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nubank">Nubank</SelectItem>
            <SelectItem value="Itaú">Itaú</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Saldo inicial"
          type="number"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
        />
        <Button onClick={updateInitialBalance}>Definir saldo</Button>
      </div>

      {/* Formulário nova transação */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Select
          value={type}
          onValueChange={(val: "income" | "expense") => setType(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Entrada</SelectItem>
            <SelectItem value="expense">Saída</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addTransaction}>Adicionar</Button>
      </div>

      {/* Lista de contas */}
      {accounts.map((account) => (
        <Card
          key={account.name}
          className={`mb-6 ${getBankColor(account.name)}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image
                src={getBankIcon(account.name)}
                alt={account.name}
                width={24}
                height={24}
              />
              {account.name} —{" "}
              <span
                className={
                  getTotal(account) >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                R$ {getTotal(account).toFixed(2)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {account.transactions.length === 0 ? (
              <p className="text-gray-500">Nenhuma transação registrada.</p>
            ) : (
              <div className="space-y-3">
                {account.transactions.map((t) => (
                  <div
                    key={t.id}
                    className={`flex justify-between items-center p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
                      t.type === "income" ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {/* Esquerda */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                          t.type === "income" ? "bg-green-200" : "bg-red-200"
                        }`}
                      >
                        {t.type === "income" ? "⬆️" : "⬇️"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {t.description}
                        </p>
                        <p className="text-sm text-gray-500">{t.date}</p>
                      </div>
                    </div>

                    {/* Direita */}
                    <div className="flex items-center gap-4">
                      <p
                        className={`font-bold ${
                          t.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {t.type === "income" ? "+" : "-"} R${" "}
                        {t.amount.toFixed(2)}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTransaction(account.name, t.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </DashboardLayout>
  );
}
