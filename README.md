# SPRINT 8 - Compass UOL

Olá, meu nome é Lauro Dariva Ferneda. Sou de Sarandi-RS, tenho 20 anos, olhos e cabelos castanhos, pele clara e atualmente estou cursando Ciência da Computação na Atitus Educação de Passo Fundo.

## **Visão Geral**
Este é um programa focado no teste de APIs utilizando o framework **NestJS**, com ênfase na API **NestJS Cinema**. O objetivo é realizar testes funcionais e não funcionais de filmes e reserva de ingressos.

## **Objetivo**
Os testes da API NestJS Cinema foram realizados com foco nas rotas de gerenciamento de filmes e reserva de ingressos. Foram usadas **User Stories** e um **Plano de Testes** para garantir a qualidade das funcionalidades e a eficiência do sistema.

---

## Dispositivo de Testes

- **Modelo:** Acer Nitro 5
- **Processador:** 11th Gen Intel(R) Core(TM) i7-11800H @ 2.30GHz  2.30 GHz
- **RAM Instalada:** 16,0 GB (utilizável: 15,8 GB)
- **Tipo de Sistema:** Sistema operacional de 64 bits, processador baseado em x64

## Especificações do Sistema Operacional
- **Edição:** Windows 11 Home
- **Versão:** 23H2

---

## **Informações sobre os Testes**

- **Tecnologia de Backend:** NestJS
- **Endpoints de Teste:**
  - `/movies`: CRUD de filmes
  - `/tickets`: Reserva de ingressos
- **Metodologia de Testes:** 
  - Testes funcionais para verificar a integridade das operações CRUD
  - Testes de desempenho para avaliar a escalabilidade do sistema

---

## Testando a API NestJS Cinema

### 1. Planejamento de Testes
Antes de iniciar, foi criado um plano de testes detalhado que defina os objetivos, escopo e critérios de sucesso.

---

### 2. Teste de CRUD de Filmes
- **Create:** Enviar uma requisição POST para criar um novo filme.
- **Read:** Realizar uma requisição GET para listar filmes ou consultar um filme específico.
- **Update:** Enviar uma requisição PUT para atualizar um filme existente.
- **Delete:** Enviar uma requisição DELETE para excluir um filme.

---

### 3. Teste de Reserva de Ingressos
- **Create:** Enviar uma requisição POST para reservar um ingresso para um filme.
- **Cancel:** Enviar uma requisição DELETE para cancelar a reserva de ingresso.

---

### 4. Métricas Relevantes
- **Tempo médio de resposta:** Idealmente abaixo de 1 segundo para rotas principais.
- **Throughput:** Número de requisições processadas por segundo.
- **Taxa de erros:** A taxa de erros deve ser inferior a 5% em condições normais de carga.

---

## Testes de Performance

### Carga
- Simule entre 30 a 50 usuários simultâneos para avaliar o desempenho nas rotas principais (CRUD de filmes e reserva de ingressos).

### Estresse
- Aumente gradualmente a carga para verificar a capacidade de resposta sob pressão.

### Pico
- Teste o sistema com 100 ou mais usuários simultâneos para simular alta demanda.

---

## Observações

- Para dúvidas, consulte a [documentação oficial da API](https://github.com/juniorschmitz/nestjs-cinema/tree/main).

## **Menções Honrosas**

Gostaria de agradecer à Thaise, Jean e Beto, aos meus colegas da turma PerfMechs 05 B e nosso SM pelo apoio e ajuda na realização desta sprint.

---