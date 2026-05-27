import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';

import { Dashboard } from './pages/dashboard/dashboard';

import { Receitas } from './pages/receitas/receitas';

import { DespesasComponent } from './pages/despesas/despesas';

import { NovaReceita } from './pages/nova-receita/nova-receita';
import { NovaDespesa } from './pages/nova-despesa/nova-despesa';

import { CadastroComponent } from './pages/cadastro/cadastro';

import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

{
path:'',
redirectTo:'login',
pathMatch:'full'
},

{
path:'login',
component:LoginComponent
},

{
path:'cadastro',
component:CadastroComponent
},

{
path:'recuperar-senha',
component:RecuperarSenhaComponent
},

{
path:'redefinir-senha',
loadComponent:()=>import(
'./pages/redefinir-senha/redefinir-senha'
).then(
m=>m.RedefinirSenhaComponent)
},

{
  path: 'dashboard',
  component: Dashboard,
  canActivate: [authGuard]
},

{
  path: 'receitas',
  component: Receitas,
  canActivate: [authGuard]
},

{
  path: 'receitas/nova',
  component: NovaReceita,
  canActivate: [authGuard]
},

{
  path: 'despesas',
  component: DespesasComponent,
  canActivate: [authGuard]
},

{
  path: 'despesas/nova',
  component: NovaDespesa,
  canActivate: [authGuard]
}

];