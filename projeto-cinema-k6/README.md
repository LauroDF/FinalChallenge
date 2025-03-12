# Testes de Performance - API nestjs-cinema

## Objetivo

Este Pasta armazena os códigos para os testes da API nestjs-cinema.

### Gerando arquivo JSON de Filmes e Tickets com faker

**generateMovies**
![Retorno](../Assets/generateMovies.png)

**generateTickets**
![Retorno](../Assets/generateTickets.png)

### Testando a API nestjs-cinema com os movies gerados pelo faker

![Retorno](../Assets/teste-faker1.png)
![Retorno](../Assets/teste-faker2.png)

## **Testando a API nestjs-cinema com os tickets gerados pelo faker**

## Métricas de Performance
As seguintes métricas serão monitoradas durante os testes:

- **Tempo médio de resposta:** Inferior a **900ms** para rotas principais (máximo de **1s**).
- **Throughput:** Pelo menos **20 requisições simultâneas** em uma janela de **2-5 minutos**.
- **Taxa de erros:** Até **5% de falhas** permitidas antes de considerar um teste como falho.
- **Tempo de recuperação:** Após testes de estresse, o sistema deve se recuperar em até **1 minuto**, mantendo a integridade dos dados.

## Testes de Performance
Os testes foram projetados para avaliar a capacidade da API sob diferentes cenários de carga e estresse:

### 1. Teste de Carga (Load Testing)
**Objetivo:** Avaliar o desempenho da API sob condições normais de uso.
- **Usuários simultâneos:** 30-50
- **Cenário:** Login > Checkout > Operações em /usuarios
- **Resultados esperados:**
  - Tempo médio de resposta < 900ms
  - Throughput adequado ao número de usuários
  - Taxa de erro < 5%

### 2. Teste de Pico (Spike Testing)
**Objetivo:** Verificar a resposta da API a um aumento súbito de tráfego.
- **Usuários simultâneos:** 80-100
- **Cenário:** Operações distribuídas entre /login e /produtos
- **Resultados esperados:**
  - API mantém estabilidade sem degradação severa
  - Tempo de resposta pode aumentar, mas sem ultrapassar 1s
  - Taxa de erro < 5%

### 3. Teste de Estresse (Stress Testing)
**Objetivo:** Identificar o limite da API e seu comportamento sob alta demanda.
- **Usuários simultâneos:** 150-200
- **Cenário:** Carga excessiva em todas as rotas principais
- **Resultados esperados:**
  - API deve continuar respondendo, mesmo que com maior latência
  - Pode haver aumento na taxa de erros, mas sem falha total
  - Recuperação total do sistema em até 1 minuto após o teste

### 4. Teste de Volume (Volume Testing)
**Objetivo:** Avaliar o comportamento da API com grandes volumes de dados.
- **Cenário:** Criação massiva de usuários e produtos
- **Resultados esperados:**
  - Banco de dados deve suportar a carga sem degradação significativa
  - Tempo de resposta estável dentro dos limites aceitáveis

### 5. Teste de Escalabilidade (Scalability Testing)
**Objetivo:** Medir a capacidade da API de aumentar ou diminuir os recursos conforme a demanda.
- **Cenário:** Simulação de tráfego variável ao longo do tempo
- **Resultados esperados:**
  - API ajusta seu desempenho conforme a demanda
  - Nenhuma falha crítica durante ajustes de carga

## Ferramentas Utilizadas
- **K6:** Execução dos testes de carga e análise de métricas.
- **Node.js:** Para rodar a API localmente.
- **GitLab CI/CD:** Para automação dos testes.

## Conclusão

## Melhorias Propostas

## Dispositivo de testes

- **Modelo:** Acer Nitro 5
- **Processador:** 11th Gen Intel(R) Core(TM) i7-11800H @ 2.30GHz   2.30 GHz
- **RAM Instalada:** 16,0 GB (utilizável: 15,8 GB)
- **Tipo de Sistema:** Sistema operacional de 64 bits, processador baseado em x64
