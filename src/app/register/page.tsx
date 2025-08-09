"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: unknown) {
    console.log("Cadastro enviado com sucesso!", data);
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-center">Criar conta</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="digite seu nome..."
              {...register("name")}
            ></Input>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="digite seu email..."
              {...register("email")}
            ></Input>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="digite sua senha..."
              {...register("password")}
            ></Input>
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Cadastrar
          </Button>
          <p className="text-sm text-center">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Fazer Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
