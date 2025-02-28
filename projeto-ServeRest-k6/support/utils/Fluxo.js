import { sleep } from 'k6';
import { testConfig, createUser, deleteCreatedUsers, getUsuarios, getUserById, updateUser } from '../base/baseTest.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// HTML
export function handleSummary(data) {
    return {
      "FluxoUsuarios-smokeTest.html": htmlReport(data),
    };
}
export const options = testConfig.options.smokeTest;

export function createUserAndReturnData() {
  // Criar um usuário e retornar seus dados para serem usados no teste
  const user = createUser();
  console.log(`Usuário criado com ID: ${user.id}`);
  return { userId: user.id };
}

export function deleteUserById(userId) {
  // Deletar o usuário criado com o ID
  console.log(`Deletando usuário com ID: ${userId}`);
  deleteCreatedUsers(userId);
}

export function runTestsUsers(data) {
    if (!data || !data.userId) {
      console.error("Erro: 'userId' não encontrado no objeto de dados.");
      return; // Retorna sem fazer nada caso o 'userId' seja inválido
    }
    
    const userId = data.userId;

    console.log(`Rodando testes para o usuário com ID: ${userId}`);

  // Passo 2: Obter a lista de usuários
  getUsuarios();

  // Passo 3: Obter o usuário recém-criado pelo ID
  getUserById(userId);

  // Passo 4: Atualizar o usuário com novo e-mail
  updateUser(userId);

  sleep(1);
}

export default function (data) {
  runTestsUsers(data);
}

export function setup() {
  // Chama a função que cria o usuário e retorna os dados
  return createUserAndReturnData();
}

export function teardown(data) {
  // Chama a função que deleta o usuário com o ID retornado
  deleteUserById(data.userId);
}
