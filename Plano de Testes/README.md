**Plano de Teste da API NestJS Cinema**

## 1. Introdução

### 1.1 Identificação do Projeto

**Nome:** Testes da API NestJS Cinema\
**Versão da API:** Versão atual do repositório\
**Tecnologias:** NestJS, Node.js, banco de dados relacional (dependendo da implementação), ferramentas de teste como K6, Postman e JMeter

### 1.2 Objetivos do Plano

O objetivo deste plano de teste é validar a funcionalidade, desempenho e integridade da API NestJS Cinema. Os testes garantirão que a API atenda aos requisitos funcionais e não funcionais definidos, assegurando uma experiência confiável para os usuários.

### 1.3 Público-Alvo

Desenvolvedores, testadores de software, engenheiros de qualidade e demais interessados na estabilidade e performance da API.

### 1.4 Escopo do Plano de Teste

Os testes cobrirão as seguintes áreas:

- Gerenciamento de filmes (CRUD completo)
- Reserva de ingressos
- Testes de performance
- Testes de segurança básicos
- Testes de integração entre endpoints

---

## 2. Requisitos a serem testados

Os seguintes requisitos funcionais e não funcionais serão validados:

### 2.1 Funcionais

- Criar um novo filme via **POST /movies**
- Obter lista de filmes via **GET /movies**
- Obter detalhes de um filme via **GET /movies/{id}**
- Atualizar detalhes de um filme via **PUT /movies/{id}**
- Excluir um filme via **DELETE /movies/{id}**
- Criar uma reserva de ingresso via **POST /tickets**

### 2.2 Não Funcionais

- **Desempenho:** A API deve processar pelo menos 100 solicitações de criação de filmes por segundo e responder em menos de 200ms.
- **Escalabilidade:** O tempo de resposta para listagem de filmes deve ser inferior a 100ms com paginação ativa.
- **Confiabilidade:** Testes de estresse serão realizados para verificar a estabilidade sob alta carga.
- **Segurança:** Validação de permissões administrativas nos endpoints críticos.

---

## 3. Estratégias de Teste

### 3.1 Tipos e Técnicas de Teste

- **Testes Funcionais:** Verificar se cada endpoint responde corretamente às requisições esperadas.
- **Testes de Integração:** Garantir a correta comunicação entre módulos.
- **Testes de Performance:** Medir tempos de resposta e suportar cargas elevadas com K6 e JMeter.
- **Testes de Segurança:** Verificar autenticação e possíveis falhas de autorização.

### 3.2 Critérios de Aceitação

- Todas as requisições devem retornar os códigos HTTP esperados.
- Os tempos de resposta devem estar dentro dos limites estabelecidos.
- O sistema deve manter a integridade dos dados após operações CRUD.

### 3.3 Ferramentas Utilizadas

- **Postman:** Testes manuais e automação de testes básicos.
- **K6:** Testes de carga e estresse.
- **JMeter:** Avaliação de desempenho sob cenários de alta concorrência.

---

## 4. Equipe e Infraestrutura

### 4.1 Equipe Envolvida

- Testador de software
- Desenvolvedores
- DevOps (para infraestrutura e deploy em ambiente de teste)

### 4.2 Recursos Necessários

- Ambiente de testes configurado com a API rodando localmente
- Banco de dados preparado para testes
- Ferramentas instaladas: Postman, K6, JMeter

---

## 5. Cronograma

### 5.1 Atividades e Prazos

| Atividade                          | Prazo  |
| ---------------------------------- | ------ |
| Configuração do ambiente de testes | 2 dias |
| Testes funcionais                  | 3 dias |
| Testes de integração               | 3 dias |
| Testes de performance              | 3 dias |
| Testes de segurança                | 3 dias |
| Relatório final de testes          | 2 dias |

---

## 6. Documentação Complementar

- Relatórios de desempenho gerados pelo K6 e JMeter
- Logs de execução dos testes
- Especificação técnica da API
- Scripts de automação de testes

**Conclusão**
Este plano de testes servirá como guia para a validação da API NestJS Cinema, garantindo que ela atenda aos requisitos definidos e funcione de maneira eficiente e confiável.

