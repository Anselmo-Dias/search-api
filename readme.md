# search-api

## RFs (Requisitos funcionais)

- [x] Deve ser possível adicionar o cep;
- [ ] Deve ser possível obter coordenadas do user;
- [ ] Deve ser possível o usuário buscar farmácias próximas (até 10km);
- [ ] Deve ser possível o usuário ver farmácias próximas e verificar no estoque a quantidade do produto desejado;

- [ ] Deve ser possível cadastrar uma farmacia;
- [ ] Deve ser possível o usuário procurar por produtos;
- [ ] Deve ser possível o usuário ver todas farmacias que possuem aquele produto produtos;
- [ ] Deve ser possível o usuário Ver a listagem dos produtos de uma farmacia;
- [x] Deve ser possível pegar os dados de um user logado;

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar; 

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com e-mail duplicado
- [ ] A academia so pode ser cadstrada por administradores 
- [ ] Todas listas de dados precisam ser paginadas com 20 itens por página

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco postgreSQL;
- [ ] O usuário deve ser identificado por um jwt;

---

## Estrutura de Pastas

Aqui está a estrutura de pastas do projeto `search-api`:

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






## Design Patterns

### Conceito e O que é Design Pattern

Design Patterns são soluções generalizadas para problemas comuns de design de software. Eles representam soluções que foram encontradas úteis em muitos contextos diferentes e que podem ser reutilizadas em diferentes projetos. Os padrões de design são uma maneira de compartilhar essas soluções entre os desenvolvedores, permitindo que eles se concentrem na lógica específica do seu projeto, em vez de reinventar soluções para problemas comuns.

Os padrões de design são classificados em três categorias principais:

- **Criacionais**: Estes padrões lidam com a criação de objetos, como fábricas e abstrações.
- **Estruturais**: Estes padrões lidam com a composição de objetos e classes, como adaptadores e decoradores.
- **Comportamentais**: Estes padrões lidam com a comunicação e a coordenação entre objetos, como estratégias e observadores.

### Repository Pattern

O Repository Pattern é um padrão de design comportamental que abstrai o acesso a dados de uma aplicação. Ele atua como uma camada intermediária entre o código que consome os dados e o código que acessa o banco de dados ou qualquer outro sistema de armazenamento de dados. O objetivo do padrão Repository é separar a lógica de negócios da lógica de acesso a dados, tornando o código mais modular, mais fácil de manter e testar.

No contexto do projeto `search-api`, o uso do Repository Pattern permite que a lógica de acesso a dados seja centralizada e reutilizada em diferentes partes da aplicação. Isso facilita a manutenção do código, pois as alterações no acesso a dados não afetam diretamente a lógica de negócios, e também facilita a adição de novos tipos de dados ou a mudança de sistemas de armazenamento de dados, sem afetar a lógica de negócios existente.

---

## Factory Pattern
O Factory Pattern é um padrão de design criacional que fornece uma interface para criar objetos em uma superclasse, mas permite às subclasses alterar o tipo de objetos que serão criados. Esse padrão é particularmente útil quando a criação de um objeto requer informações sensíveis ou complexas, ou quando o processo de criação pode variar dependendo das condições externas.

### Conceito
No contexto do desenvolvimento de software, o Factory Pattern é usado para encapsular a lógica de criação de objetos. Em vez de instanciar diretamente um objeto usando o operador new, o Factory Pattern usa métodos que retornam objetos. Isso permite que o código seja mais flexível e extensível, pois novas classes podem ser adicionadas sem modificar o código existente que utiliza o Factory.

Aplicações no Projeto
No projeto search-api, o Factory Pattern pode ser aplicado em várias áreas, especialmente onde a criação de objetos envolve lógica complexa ou condicional. Por exemplo:

Criação de Repositórios: Ao invés de instanciar diretamente um repositório baseado em uma string de conexão ou outra configuração, um Factory pode ser usado para determinar qual repositório criar com base nas configurações fornecidas.

Criação de Use Cases: Similarmente, o Factory Pattern pode ser usado para criar use cases específicos com base nos parâmetros passados, permitindo uma maior flexibilidade na definição de comportamentos específicos para diferentes cenários de uso.

Geração de JWTs: Para a geração de tokens JWT, um Factory pode encapsular a lógica de criação desses tokens, permitindo que diferentes tipos de tokens sejam gerados conforme necessário, sem alterar o código que consome esses tokens.
Vantagens
Flexibilidade: Permite a criação de objetos sem especificar a classe exata a ser instanciada.
Extensibilidade: Facilita a adição de novas classes sem modificar o código existente que utiliza o Factory.
Encapsulamento: Oculta a complexidade da criação de objetos, mantendo o restante do código limpo e focado na lógica de negócios.
Esta seção foi adicionada ao final do seu arquivo readme.md, após a seção sobre Design Patterns.
