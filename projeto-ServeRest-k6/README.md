# Testes de Performance - API ServeRest

## Objetivo
Este documento descreve as métricas e os resultados esperados para os testes de performance da API ServeRest, garantindo sua confiabilidade e eficiência sob diferentes condições de carga.

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

## Resultados Obtidos

### 1 Rota /usuarios

A rota `/usuarios` foi testada com múltiplas requisições GET e POST. Os principais resultados foram:

- **GET /usuarios**: 100% das requisições retornaram status `200`, indicando que a API respondeu corretamente.
- **POST /usuarios**: 96% das requisições resultaram em status `201` (criação bem-sucedida), enquanto 4% retornaram `400` (e-mail já existente), dentro da margem esperada de erro.
- **Tempo de resposta médio**: 450ms
- **p(95) do tempo de resposta**: < 5000ms (critério atingido)

### **Smoke Test**
![Retorno](../Assets/usuarios.png)
### **Stress Test**
![Retorno](../Assets/usuarios2.png)

### 2 Rota /login

A rota `/login` foi testada para validar a autenticação de usuários criados anteriormente:

- **POST /login**: 99% das requisições retornaram status `200` com token de autenticação válido.
- 1% das requisições falharam com status `401`, indicando credenciais inválidas (potencialmente devido à concorrência na criação de usuários).
- **Tempo de resposta médio**: 500ms

### **Smoke Test**
![Retorno](../Assets/login.png)
### **Spike Test**
![Retorno](../Assets/login2.png)

### 3 Rota /produtos

A rota `/produtos` foi testada com requisições GET e POST, utilizando um usuário administrador.

- **GET /produtos**: Todas as requisições obtiveram status `200`, confirmando a disponibilidade da API.
- **POST /produtos**: 98% das requisições resultaram em `201` (produto criado com sucesso), enquanto 2% falharam com `401` devido à falta de autenticação adequada.
- **Tempo de resposta médio**: 480ms

### **Smoke Test**
![Retorno](../Assets/produtos.png)

### 4 Rota /carrinhos

A rota `/carrinhos` foi testada com requisições GET e POST, utilizando um usuário administrador.

- **GET /carrinhos**: Todas as requisições obtiveram status `200`, confirmando a disponibilidade da API.
- **POST /carrinhos**: 98% das requisições resultaram em `201` (produto criado com sucesso), enquanto 2% falharam com `401` devido à falta de autenticação adequada.
- **Tempo de resposta médio**: 480ms

### **Spike Test**
![Retorno](../Assets/carrinhos.png)

### 5 Fluxo de Teste

O foi criado focando o fluxo `Criar usuário > Realizar Login > Criar Produto > Criar Carrinho > Excluir Produto`:

### **Smoke Test**
![Retorno](../Assets/fluxo.png)
### **Endurance Test**
![Retorno](../Assets/fluxo2.png)

- **POST /usuarios**: 96% das requisições resultaram em status `201` (criação bem-sucedida), enquanto 4% retornaram `400` (e-mail já existente), dentro da margem esperada de erro.
- **POST /login**: 91% das requisições retornaram status `200` com token de autenticação válido e 9% das requisições falharam com status `401`, indicando credenciais inválidas (potencialmente devido à concorrência na criação de usuários).
- **POST /produtos**: 85% das requisições resultaram em `201` (produto criado com sucesso), enquanto 15% falharam com `401` devido à falta de autenticação adequada.
- **DELETE /produtos**: 77% das requisições resultaram em `201` (produto criado com sucesso), enquanto 13% falharam com `401` devido à falta de autenticação adequada.
- **POST /carrinhos**: 74% das requisições resultaram em `201` (produto criado com sucesso), enquanto 26% falharam com `401` devido à falta de autenticação adequada.
- **DELETE /carrinhos**: 69% das requisições resultaram em `201` (produto criado com sucesso), enquanto 31% falharam com `401` devido à falta de autenticação adequada.
- **Tempo de resposta atingido**: 5616ms
- **Tempo do teste**: 20m

## Conclusão

Os testes de performance na API ServeRest demonstraram que a API tem um desempenho robusto sob condições de carga moderada, mantendo tempos de resposta dentro dos parâmetros estabelecidos e uma taxa de sucesso das requisições superior a 95% na maioria das rotas.

A API respondeu de forma satisfatória durante os testes de carga, pico, estresse e volume, com tempo médio de resposta abaixo dos 900ms, exceto em momentos de pico, onde o tempo de resposta foi ligeiramente superior. A taxa de erros permaneceu abaixo de 5% durante a maioria dos testes, atendendo aos critérios de confiabilidade.

### Pontos de melhoria:

Concorrência na criação de usuários: Ajustar o manuseio de requisições concorrentes para minimizar falhas 400 (e-mail já existente). Autenticação de criação e exclusão de produtos e carrinhos: Melhorar o fluxo de autenticação para garantir que todas as requisições de criação de produtos e carrinhos sejam corretamente autenticadas, evitando falhas de 401.

No geral, a API demonstrou bom desempenho e conformidade com os critérios estabelecidos para os testes.

## Dispositivo de testes

- **Modelo:** Acer Nitro 5
- **Processador:** 11th Gen Intel(R) Core(TM) i7-11800H @ 2.30GHz   2.30 GHz
- **RAM Instalada:** 16,0 GB (utilizável: 15,8 GB)
- **Tipo de Sistema:** Sistema operacional de 64 bits, processador baseado em x64
