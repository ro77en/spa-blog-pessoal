# Blog Pessoal - Frontend Angular SPA

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## 📝 Descrição

Este projeto é um Single Page Application (SPA) desenvolvido em Angular para consumir a API do Blog Pessoal. O frontend permite visualizar, criar, editar e excluir postagens de blog e seus usuários.

## 🚀 Funcionalidades

- ✅ Autenticação de usuários (login/cadastro)
- ✅ Gerenciamento de perfil de usuário
- ✅ Criação, edição e exclusão de postagens
- ✅ Visualização de postagens na página inicial
- ✅ Associação de temas às postagens
- ✅ Layout responsivo

## 🛠️ Tecnologias Utilizadas

- **Angular 17+**: Framework para desenvolvimento do frontend com standalone components
- **TypeScript**: Linguagem de programação
- **Bootstrap**: Framework CSS para design responsivo
- **Signals**: API para gerenciamento de estado reativo no Angular
- **Angular Router**: Para navegação entre componentes
- **Angular HTTP Client**: Para comunicação com a API
- **Fontawesome**: Biblioteca de ícones
- **rxjs**: Biblioteca para programação reativa

## 📋 Pré-requisitos

- Node.js (v14+)
- NPM ou Yarn
- Angular CLI
- API do Blog Pessoal em execução

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone git@github.com:ro77en/spa-blog-pessoal.git
```

2. Navegue até o diretório do projeto:
```bash
cd spa-blog-pessoal
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
ng serve
```

5. Acesse o aplicativo em seu navegador:
```
http://localhost:4200
```

## 📚 Estrutura do Projeto

```
src/
├── app/
│   ├── auth/             # Componentes e serviços de autenticação
│   ├── components/       # Componentes reutilizáveis da aplicação
│   ├── models/           # Interfaces e classes de modelos de dados
│   ├── pages/            # Componentes de páginas principais
│   ├── services/         # Serviços para comunicação com a API
│   ├── app.config.ts     # Configuração da aplicação para standalone components
│   ├── app.routes.ts     # Configuração de rotas para standalone components
│   └── app.component.ts  # Componente raiz da aplicação
└── environments/         # Configurações de ambiente
```

## 🔐 Segurança

A aplicação implementa autenticação baseada em token JWT. As requisições para a API são autenticadas através de interceptores HTTP que adicionam o token aos cabeçalhos das requisições.

## 🔄 Integração com Backend

Esta SPA foi projetada para se integrar com a API Blog Pessoal desenvolvida em Java Spring Boot. A comunicação é feita através de requisições HTTP REST.

## 📱 Responsividade

O layout é totalmente responsivo graças ao Bootstrap, adaptando-se a diferentes tamanhos de tela, desde dispositivos móveis até desktops.

## ⚙️ Configuração

As configurações da aplicação podem ser ajustadas nos arquivos de ambiente em `src/environments/`:

- `environment.ts`: Configurações para ambiente de desenvolvimento
- `environment.prod.ts`: Configurações para ambiente de produção

## 🚀 Implantação

Para gerar uma versão de produção:

```bash
ng build --prod
```

Os arquivos de distribuição serão gerados na pasta `dist/` e podem ser implantados em qualquer servidor web.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## ✨ Autor

Desenvolvido por [seu nome].

---

⌨️ com ❤️ por [seu nome]