"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Idea {
  id: number;
  title: string;
  description: string;
}

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addIdea = () => {
    if (!title.trim()) return;
    const newIdea: Idea = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    };
    setIdeas((prev) => [...prev, newIdea]);
    setTitle("");
    setDescription("");
  };

  const deleteIdea = (id: number) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Minhas Ideias</h1>

      {/* Formulário para adicionar ideia */}
      <div className="space-y-3 mb-6">
        <Input
          placeholder="Título da ideia..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Descreva sua ideia..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={addIdea}>Adicionar Ideia</Button>
      </div>

      {/* Lista de ideias */}
      <div className="space-y-3">
        {ideas.length === 0 && (
          <p className="text-gray-500">Nenhuma ideia registrada.</p>
        )}

        {ideas.map((idea) => (
          <Card key={idea.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{idea.title}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteIdea(idea.id)}
              >
                Remover
              </Button>
            </CardHeader>
            {idea.description && (
              <CardContent>
                <p>{idea.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
