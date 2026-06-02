# 💸 Gestão Financeira - Frontend

Frontend da aplicação Gestão Financeira, desenvolvido em Angular para auxiliar no controle de receitas, despesas e acompanhamento financeiro pessoal.

## 🚀 Acesse o projeto

🌐 Produção:
https://gestao-financeira-front-three.vercel.app

## 📸 Funcionalidades

- ✅ Login de usuários
- ✅ Cadastro de usuários
- ✅ Recuperação de senha por e-mail
- ✅ Redefinição de senha
- ✅ Dashboard financeiro
- ✅ Cadastro de receitas
- ✅ Cadastro de despesas
- ✅ Filtros de pesquisa
- ✅ Paginação
- ✅ Exportação de relatórios em PDF
- ✅ Tema claro/escuro
- ✅ Proteção de rotas com AuthGuard

---

## 🛠️ Tecnologias utilizadas

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3
- RxJS
- Angular Router
- ngx-toastr

### Backend
- Spring Boot
- Spring Security
- JWT
- PostgreSQL

### Deploy
- Vercel (Frontend)
- Render (Backend)
- Render PostgreSQL (Banco de Dados)

---

## 📂 Estrutura do Projeto

```bash
src/
│
├── app/
│   ├── components/
│   ├── guards/
│   ├── interceptors/
│   ├── pages/
│   │   ├── login/
│   │   ├── cadastro/
│   │   ├── dashboard/
│   │   ├── receitas/
│   │   ├── despesas/
│   │   ├── recuperar-senha/
│   │   └── redefinir-senha/
│   │
│   └── services/
│
├── assets/
└── styles.css
```

---

## ⚙️ Executando localmente

### Clonar o projeto

```bash
git clone https://github.com/MaycoolVinicius/gestao-financeira-front.git
```

### Entrar na pasta

```bash
cd gestao-financeira-front
```

### Instalar dependências

```bash
npm install
```

### Executar

```bash
ng serve
```

Aplicação disponível em:

```text
http://localhost:4200
```

---

## 🔐 Segurança

- Autenticação via JWT
- Proteção de rotas com AuthGuard
- Interceptor para envio automático do token
- Recuperação segura de senha por token temporário

---

## 📈 Melhorias Futuras

- [ ] Gráficos financeiros
- [ ] Metas de economia
- [ ] Categorias personalizadas
- [ ] Dashboard avançado
- [ ] Responsividade mobile completa
- [ ] Upload de comprovantes
- [ ] Domínio personalizado

---

## 👨‍💻 Desenvolvedor

Maycool Vinicius

GitHub:
https://github.com/MaycoolVinicius

LinkedIn:
www.linkedin.com/in/maycool-vinicius
