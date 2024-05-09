Desafio de Extração de Certidão
===============================

Descrição
---------

Este desafio consiste em criar uma aplicação full-stack que extrai certidões fazendárias de um portal público, utilizando Python para o backend e Next.js para o frontend. A aplicação deve seguir o padrão RESTful e JSON:API.

Objetivos
---------

1.  Backend

    -   Criar uma API usando FastAPI para gerenciar a extração e visualização de certidões.
    -   Utilizar Playwright para automação e web scraping dos dados.
    -   Containerizar a aplicação backend usando Docker.
2.  Frontend

    -   Criar uma interface web simples usando Next.js para interagir com a API.
    -   Utilizar Tailwind CSS ou Material UI para estilização.
    -   Containerizar a aplicação frontend usando Docker.

Especificações do Backend
-------------------------

1.  Rota `GET /certificate`:

    -   Acessar o portal [Directa](https://directa.natal.rn.gov.br/).
    -   Navegar para `Certidões > Emitir Certidão Fazendária`.
    -   Selecionar o tipo CNPJ e inserir o CNPJ `24590572000136`.
    -   Analisar os retornos e interceptar as requisições.
    -   Repetir a tentativa caso o retorno seja inválido.
    -   Se o retorno for válido, capturar o PDF e salvar o arquivo com um hash.
    -   Ler o PDF e retornar os seguintes dados:
        -   `path`: Caminho do PDF salvo para ser baixado ou visualizado.
        -   `expiration_date`: Data de vencimento do PDF em UTF, baseada na data atual.
        -   `number_certificate`: Número da certidão.
2.  Rota `GET /certificate/file/{hash}`:

    -   `hash`: Hash do arquivo salvo.
    -   Retornar o arquivo PDF salvo.
    -   Se o parâmetro `download` for `true`, o documento deve ser baixado.
    -   Caso contrário, retornar o buffer do PDF para visualização na página.
3.  Docker:

    -   Criar uma imagem Docker para a aplicação backend.

Especificações do Frontend
--------------------------

1.  Página de Consulta:

    -   Criar uma página simples com um input para inserir o CNPJ.
    -   Consultar a API do backend utilizando as informações fornecidas.
    -   Exibir os dados retornados pela API.
2.  Estilização:

    -   Utilizar Tailwind CSS ou Material UI para a estilização (à escolha do desenvolvedor).
3.  Docker:

    -   Criar uma imagem Docker para a aplicação frontend.

Requisitos Técnicos
-------------------

1.  Backend:

    -   Python
    -   FastAPI
    -   Playwright
    -   Docker
2.  Frontend:

    -   Next.js
    -   Tailwind CSS ou Material UI
    -   Docker

Entrega
-------

-   Faça o fork deste repositório.
-   Implemente as funcionalidades descritas.
-   Crie um README com instruções claras de como rodar a aplicação.
-   Faça um pull request com a sua solução.

Avaliação
---------

Os critérios de avaliação serão:

-   Organização e clareza do código.
-   Funcionamento correto das funcionalidades especificadas.
-   Qualidade da implementação do Docker.
-   Usabilidade da interface frontend.
-   Documentação clara e detalhada.
