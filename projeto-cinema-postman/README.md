# Testes de Performance - API nestjs-cinema

## Objetivo

Esta pasta contém os arquivos e configurações para os testes de performance da API **nestjs-cinema** utilizando o **Postman**.

## Testando a API no Postman

Os testes são realizados utilizando a ferramenta **Postman**:

### Ambiente Postman:
![Postman](../Assets/ambpost.png)

### Default:
![Postman](../Assets/GET-default.png)

### /movies
![Postman](../Assets/GET-movies.png)
![Postman](../Assets/POST-movies.png)
![Postman](../Assets/GET-ID-movies.png)
![Postman](../Assets/PUT-movies.png)
![Postman](../Assets/DELETE-movies.png)

### /tickets
![Postman](../Assets/GET-tickets.png)
![Postman](../Assets/POST-tickets.png)
![Postman](../Assets/GET-ID-tickets.png)
![Postman](../Assets/PUT-tickets.png)
![Postman](../Assets/DELETE-tickets.png)

## Testes Funcionais - API cinema via Postman

### User Story: Gerenciamento de Filmes na API

**Ator:** Qualquer usuário da API de Filmes (para consulta) e Usuário administrador da API de Filmes (para criação, atualização e exclusão)

### Requisitos Funcionais:

#### Criando um Novo Filme:
- O usuário administrador da API envia uma solicitação **POST** para o endpoint `/movies` com os detalhes do filme.
- O sistema valida os campos obrigatórios e a unicidade do título.
- Se as validações passarem, o sistema cria o filme e atribui um ID único.
- O sistema retorna uma resposta de sucesso com o status **201 Created**, incluindo o ID do filme.

#### Obtendo a Lista de Filmes:
- O usuário envia uma solicitação **GET** para o endpoint `/movies`.
- O sistema retorna uma lista de todos os filmes cadastrados com detalhes.

#### Obtendo Detalhes de um Filme por ID:
- O usuário envia uma solicitação **GET** para o endpoint `/movies/{id}`, onde `{id}` é o ID do filme desejado.
- O sistema verifica a existência do filme e retorna seus detalhes.
- Se o filme não existir, o sistema retorna uma resposta de erro com o status **404 Not Found**.

#### Atualizando os Detalhes de um Filme por ID:
- O usuário administrador da API envia uma solicitação **PUT** para o endpoint `/movies/{id}`, onde `{id}` é o ID do filme a ser atualizado.
- O sistema verifica a existência do filme, permite a atualização de campos específicos e valida os dados.
- Se todas as validações passarem, o sistema atualiza os detalhes do filme.
- O sistema retorna uma resposta de sucesso com o status **200 OK** e os detalhes atualizados do filme.

#### Excluindo um Filme por ID:
- O usuário administrador da API envia uma solicitação **DELETE** para o endpoint `/movies/{id}`, onde `{id}` é o ID do filme a ser excluído.
- O sistema verifica a existência do filme e o remove permanentemente do banco de dados.
- O sistema retorna uma resposta de sucesso com o status **204 No Content** (atualmente retornando **200 OK** sem resposta de sucesso).

## Melhorias Propostas

- A documentação da API, seu Swagger e seus retornos não coincidem. Os códigos de resposta não estão padronizados, sendo necessária uma melhoria na comunicação e documentação da API.

### Retornos não Padronizados:

![Postman](../Assets/sc1.png)
![Postman](../Assets/sc2.png)
![Postman](../Assets/sc3.png)
![Postman](../Assets/sc4.png)
![Postman](../Assets/sc5.png)
![Postman](../Assets/sc6.png)
![Postman](../Assets/sc7.png)
![Postman](../Assets/sc8.png)
![Postman](../Assets/sc9.png)
![Postman](../Assets/sc10.png)

## Ferramentas Utilizadas

- **Postman:** Para execução e automação dos testes de carga.
- **GitHub:** Para automação e versionamento dos testes.

## Dispositivo de Testes

Os testes foram executados no seguinte dispositivo:

- **Modelo:** Acer Nitro 5
- **Processador:** Intel Core i7-11800H (11ª geração) @ 2.30GHz
- **Memória RAM:** 16GB
- **Arquitetura:** 64 bits (x64)

## Conclusão

Os testes realizados no Postman garantem a validação funcional e de performance da API **nestjs-cinema**, permitindo identificar possíveis falhas e oportunidades de melhoria no serviço.