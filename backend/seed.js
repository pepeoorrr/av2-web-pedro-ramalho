// ========================================
// SEED - POPULAR BANCO COM DADOS DE TESTE
// ========================================
// Execute com: npm run seed

import { prisma } from "./src/config/prisma.js";

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");
  
  // Limpa agendamentos anteriores (comentar se quiser manter)
  // await prisma.agendamento.deleteMany({});
  
  // Cria agendamentos de teste
  const agendamentos = [
    {
      nomeCliente: "João Silva",
      email: "joao@example.com",
      telefone: "(11) 98765-4321",
      quadra: "Quadra 1",
      data: new Date("2026-06-20T10:00:00"),
      horario: "10:00",
      status: "confirmado",
      observacoes: "Primeira vez jogando"
    },
    {
      nomeCliente: "Maria Santos",
      email: "maria@example.com",
      telefone: "(11) 99876-5432",
      quadra: "Quadra 2",
      data: new Date("2026-06-21T14:00:00"),
      horario: "14:00",
      status: "pendente",
      observacoes: "Reserva para time"
    },
    {
      nomeCliente: "Carlos Oliveira",
      email: "carlos@example.com",
      telefone: "(11) 97654-3210",
      quadra: "Quadra 1",
      data: new Date("2026-06-22T16:00:00"),
      horario: "16:00",
      status: "confirmado",
      observacoes: null
    },
    {
      nomeCliente: "Ana Costa",
      email: "ana@example.com",
      telefone: "(11) 96543-2109",
      quadra: "Quadra 3",
      data: new Date("2026-06-23T19:00:00"),
      horario: "19:00",
      status: "pendente",
      observacoes: "Treino noturno"
    },
    {
      nomeCliente: "Pedro Rocha",
      email: "pedro@example.com",
      telefone: "(11) 95432-1098",
      quadra: "Quadra 2",
      data: new Date("2026-06-24T11:00:00"),
      horario: "11:00",
      status: "confirmado",
      observacoes: "Aula particular"
    }
  ];
  
  for (const agendamento of agendamentos) {
    const criado = await prisma.agendamento.create({
      data: agendamento
    });
    console.log(`✅ Agendamento criado: ${criado.id} - ${criado.nomeCliente}`);
  }
  
  console.log("✨ Seed completado com sucesso!");
}

main()
  .catch(e => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
