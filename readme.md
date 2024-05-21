

# eurofarma-search

eurofarma-search style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível adicionar o cep;
- [ ] Deve ser possível o usuário buscar farmácias próximas;
- [ ] Deve ser possível o usuário ver farmácias próximas e verificar no estoque a quantidade do produto desejado;

- [ ] Deve ser possível o usuário procurar por produtos;
- [ ] Deve ser possível o usuário Ver a listagem dos produtos;

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar; 
- [ ] Deve ser possível se autenticar; 
- [ ] Não deve ser possível cadastrar um user com email duplicado;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com e-mail duplicado

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco postgreSQL;
- [ ] O usuário deve ser identificado por um jwt;

---

## Estrutura de Pastas

Aqui está a estrutura de pastas do projeto `eurofarma-search-api`:

- **.env.example**: Arquivo de exemplo para configurar variáveis de ambiente.
- **.eslintignore**: Lista de arquivos e diretórios para serem ignorados pelo ESLint.
- **.eslintrc.json**: Configurações do ESLint para o projeto.
- **.gitignore**: Lista de arquivos e diretórios para serem ignorados pelo Git.
- **.npmrc**: Configurações do npm para o projeto.
- **docker-compose.yml**: Configuração para orquestração de contêineres Docker.
- **jest.config.ts**: Configurações do Jest para testes do projeto.
- **package-lock.json**: Arquivo gerado automaticamente pelo npm para gerenciar as dependências do projeto.
- **package.json**: Arquivo que contém metadados do projeto e suas dependências.
- **tsconfig.json**: Configurações do TypeScript para o projeto.

- **src**: Diretório principal para o código-fonte do projeto.
  - **app.ts**: Arquivo principal da aplicação.
  - **env**: Configurações de ambiente.
  - **http**: Arquivos relacionados à HTTP.
    - **controllers**: Lógica dos controladores para manipulação de requisições.
    - **routes.ts**: Definições de rotas da API.
  - **lib**: Funções e módulos de utilidade.
  - **repositories**: Camada de acesso a dados.
  - **server.ts**: Configuração e inicialização do servidor.
  - **services**: Camada de lógica de negócios.

- **test**: Diretório para arquivos de teste do projeto.

---

## Design Patterns

### Conceito e O que é Design Pattern

Design Patterns são soluções generalizadas para problemas comuns de design de software. Eles representam soluções que foram encontradas úteis em muitos contextos diferentes e que podem ser reutilizadas em diferentes projetos. Os padrões de design são uma maneira de compartilhar essas soluções entre os desenvolvedores, permitindo que eles se concentrem na lógica específica do seu projeto, em vez de reinventar soluções para problemas comuns.

Os padrões de design são classificados em três categorias principais:

- **Criacionais**: Estes padrões lidam com a criação de objetos, como fábricas e abstrações.
- **Estruturais**: Estes padrões lidam com a composição de objetos e classes, como adaptadores e decoradores.
- **Comportamentais**: Estes padrões lidam com a comunicação e a coordenação entre objetos, como estratégias e observadores.

### Repository Pattern

O Repository Pattern é um padrão de design comportamental que abstrai o acesso a dados de uma aplicação. Ele atua como uma camada intermediária entre o código que consome os dados e o código que acessa o banco de dados ou qualquer outro sistema de armazenamento de dados. O objetivo do padrão Repository é separar a lógica de negócios da lógica de acesso a dados, tornando o código mais modular, mais fácil de manter e testar.

No contexto do projeto `eurofarma-search-api`, o uso do Repository Pattern permite que a lógica de acesso a dados seja centralizada e reutilizada em diferentes partes da aplicação. Isso facilita a manutenção do código, pois as alterações no acesso a dados não afetam diretamente a lógica de negócios, e também facilita a adição de novos tipos de dados ou a mudança de sistemas de armazenamento de dados, sem afetar a lógica de negócios existente.

Exemplo de implementação do Repository Pattern no projeto:
