# Reserva de Restaurante feito pela Katech

Aplicação desktop para reserva de mesas em restaurante, desenvolvida com Electron, TypeScript, Express e SQLite (nativa do NodeJS). O sistema possui interface gráfica, autenticação de usuários, cadastro de reservas, painel administrativo e integração entre frontend e backend.

## O que é Electron?

O Electron é uma tecnologia que permite criar aplicativos desktop usando HTML, CSS e JavaScript. Com ele, é possível desenvolver programas para Windows, macOS e Linux utilizando as mesmas ferramentas da web, mas com acesso a recursos do sistema operacional, como arquivos, menus e notificações.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Como Rodar em Desenvolvimento](#como-rodar-em-desenvolvimento)
- [Como Gerar Build](#como-gerar-build)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Estrutura do Backend](#estrutura-do-backend)
- [Principais Componentes](#principais-componentes)
- [Observações](#observações)
- [Detalhes Técnicos](#detalhes-técnicos)
- [Acesso Administrativo](#acesso-administrativo)

## Visão Geral

O **reserva-restaurante** é uma solução desktop para gerenciamento de reservas em restaurantes. Permite que clientes realizem reservas de mesas, consultem disponibilidade, e que administradores acompanhem e gerenciem todas as reservas.

A aplicação é composta por:

- **Frontend**: Interface gráfica construída com HTML, CSS, JavaScript, Bootstrap e Electron.
- **Backend**: API RESTful desenvolvida em Node.js/Express, com persistência de dados através do SQLite.

## Funcionalidades

- Cadastro e login de usuários.
- Máscara de CPF e validação de dados.
- Seleção de data, horário, mesa e quantidade de cadeiras.
- Visualização de mesas disponíveis e indisponíveis.
- Painel administrativo para visualização e alteração do status das reservas.
- Notificações de sucesso e erro (usando a biblioteca Notyf).
- Integração segura entre frontend e backend via Electron IPC e API REST.

## Requisitos

- [Node.js](https://nodejs.org/) (recomendado v20+)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Kurumi30/reserva-de-restaurante.git
cd reserva-de-restaurante
pnpm install
```

## Scripts Disponíveis

- `pnpm dev`: Inicia o ambiente de desenvolvimento com hot reload.
- `pnpm build`: Realiza a checagem de tipos e gera o build de produção.
- `pnpm build:win`: Gera build para Windows.
- `pnpm build:mac`: Gera build para macOS.
- `pnpm build:linux`: Gera build para Linux.
- `pnpm typecheck`: Checagem de tipos para Node e Web.
- `pnpm start`: Inicia a aplicação em modo preview (Electron).

## Como Rodar em Desenvolvimento

Execute o comando abaixo para iniciar a aplicação em modo desenvolvimento:

```bash
pnpm dev
```

A aplicação será aberta em uma janela Electron, conectando o frontend ao backend local.

## Como Gerar Build

> **Atenção:** Atualmente, o processo de build não está funcionando corretamente. Foi tentado diversas abordagens, mas ainda não foi possível resolver o problema. Abaixo estão os comandos que deveriam ser utilizados para gerar o executável, mas eles podem não funcionar como esperado.

Para gerar o executável da aplicação, utilize um dos comandos abaixo conforme seu sistema operacional:

```bash
# Para Windows
pnpm build:win

# Para macOS
pnpm build:mac

# Para Linux
pnpm build:linux
```

Os arquivos de build serão gerados na pasta `dist/` ou conforme configuração do Electron Builder.

## Estrutura de Pastas

```text
├── src/
│   ├── backend/           # Backend Express + SQLite
│   ├── main/              # Processo principal do Electron
│   ├── preload/           # Preload scripts para comunicação segura
│   └── renderer/          # Frontend (HTML, CSS, JS)
├── build/                 # Arquivos de build e ícones
├── resources/             # Recursos estáticos
├── package.json           # Configuração do projeto
└── electron-builder.yml   # Configuração do Electron Builder
```

## Estrutura do Backend

Foi desenvolvido com o mínimo de dependências possível, priorizando simplicidade, segurança e facilidade de manutenção.

O backend está localizado em [`src/backend`](src/backend) e segue uma arquitetura modular, separando responsabilidades em diferentes camadas para facilitar manutenção e escalabilidade. Abaixo estão os principais diretórios e arquivos:

```text
src/backend/
├── src/
│   ├── app.ts                # Inicialização do Express, middlewares e rotas principais
│   ├── server.ts             # Ponto de entrada do servidor HTTP
│   ├── controllers/          # Controllers responsáveis pela lógica das rotas
│   ├── models/               # Models para acesso e manipulação dos dados no banco
│   ├── routes/               # Definição das rotas da API
│   ├── infrastructure/       # Scripts de infraestrutura, como seed e conexão com o banco
│   ├── services/             # Serviços auxiliares
│   ├── errors/               # Definição de erros customizados
│   └── ...                   # Outros utilitários e middlewares
├── package.json              # Dependências e scripts do backend
├── tsconfig.json             # Configuração TypeScript do backend
└── LICENSE                   # Licença do backend
```

## BiomeJS
Utilizado para lint, formatação e organização automática do código. O Biome substitui ferramentas como ESLint e Prettier, garantindo padronização e qualidade do código. As regras estão configuradas no arquivo `biome.json`.

### Principais Componentes

- **Controllers**: Responsáveis por receber as requisições, validar dados e chamar os models.
- **Models**: Realizam operações no banco de dados SQLite, como criação, consulta e atualização de reservas, usuários e mesas.
- **Routes**: Centralizam as rotas da API RESTful, conectando endpoints aos controllers.
- **Infrastructure**: Scripts para criação e seed do banco de dados, como [`seed.ts`](src/backend/src/infrastructure/seed.ts), que cria as tabelas e popula dados iniciais.
- **Services**: Middlewares e utilitários, como tratamento global de erros.
- **Autenticação**: Utiliza JWT para proteger rotas sensíveis, garantindo que apenas usuários autenticados possam realizar certas operações.
- **Validação**: Validação de dados de entrada e tratamento de erros personalizados.

### Observações

- O backend é totalmente desacoplado do frontend, comunicando-se via API REST e Electron IPC. Ele inicia junto com a execução do Electron.
- O banco de dados SQLite é inicializado automaticamente.
- O código é escrito em TypeScript, garantindo tipagem e maior segurança.
- O `database.db` fica salvo no caminho `C:\Users\USER\AppData\Roaming\reserva-restaurante`

## Detalhes Técnicos

- **Backend**: O backend Express está em [`src/backend`](src/backend), com rotas, controllers e models para usuários, mesas e reservas. O banco de dados é inicializado automaticamente na primeira execução.
- **Frontend**: A interface está em [`src/renderer`](src/renderer), com páginas para login, cadastro, seleção de mesa e dashboard administrativo.
- **IPC**: Comunicação entre frontend e backend via Electron IPC para operações sensíveis.
- **Validação**: Máscara de CPF, validação de campos obrigatórios e feedback visual com Notyf.
- **Segurança**: Uso de tokens JWT para autenticação nas rotas protegidas do backend.

## Acesso Administrativo
Para acessar o painel administrativo, utilize as seguintes credenciais:
- **Email**: admin@email.com
- **Senha**: admin123

<details>
  <summary>Clique para ver as imagens do sistema</summary>

  ![image-1](https://github.com/user-attachments/assets/1b1eac7f-e715-4cb7-a0e0-3abdb68c02fb)
  ![image-2](https://github.com/user-attachments/assets/9eb1891b-e51d-42ba-bc98-14f5d16948dd)
  ![image-3](https://github.com/user-attachments/assets/0976842b-9c20-44b5-8a72-7482e1e8ca30)
  ![image-4](https://github.com/user-attachments/assets/cf803651-b68b-498e-8672-3c1a1433da69)
  ![image-5](https://github.com/user-attachments/assets/a26c3342-5313-4e91-8a5c-ec3220ba5692)
  ![image-6](https://github.com/user-attachments/assets/b610c589-b282-424b-9403-dcfe339d4f22)
  ![image-7](https://github.com/user-attachments/assets/fa3a6298-1b1c-4522-ba02-54d9ef032d07)
  ![image-8](https://github.com/user-attachments/assets/c5716918-0552-4ba7-919e-5b7d2167a7e7)
  ![image-9](https://github.com/user-attachments/assets/ae2fe742-5468-40ef-9140-2724bc9250e4)
  ![image-10](https://github.com/user-attachments/assets/309cdd60-83b1-45ad-b573-57d370c34db3)

</details>
