"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Tarefas</h1>

      {/* Campo de adicionar nova tarefa */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Digite uma nova tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={addTask}>Adicionar</Button>
      </div>

      {/* Lista de tarefas */}
      <div className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-gray-500">Nenhuma tarefa adicionada.</p>
        )}

        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.title}
              </span>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              Remover
            </Button>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
