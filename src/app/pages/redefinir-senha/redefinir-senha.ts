import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
ActivatedRoute,
Router
} from '@angular/router';

import {
HttpClient
} from '@angular/common/http';

import {
ToastrService
} from 'ngx-toastr';

@Component({
selector:'app-redefinir-senha',

standalone:true,

imports:[
CommonModule,
FormsModule
],

templateUrl:'./redefinir-senha.html',

styleUrl:'./redefinir-senha.css'

})
export class RedefinirSenhaComponent {

senha='';

confirmarSenha='';

token='';

carregando=false;

constructor(

private route:
ActivatedRoute,

private http:
HttpClient,

private toast:
ToastrService,

private router:
Router

){

this.token =

this.route
.snapshot
.queryParamMap
.get('token')

?? '';

}

salvar(){

if(
!this.senha
||
!this.confirmarSenha
){

this.toast.warning(
'Preencha todos os campos'
);

return;

}

if(
this.senha
!==

this.confirmarSenha
){

this.toast.error(
'As senhas não conferem'
);

return;

}

this.carregando =
true;

this.http.post(

'http://localhost:3000/usuarios/redefinir-senha',

{

token:
this.token,

novaSenha:
this.senha

}

)

.subscribe({

next:()=>{

this.toast.success(

'Senha redefinida com sucesso'

);

this.router.navigate([
'/login'
]);

},

error:(erro)=>{

if(
erro.status
=== 500
){

this.toast.error(
'Token inválido ou expirado'
);

}else{

this.toast.error(
'Erro ao redefinir senha'
);

}

this.carregando =
false;

}

});

}

}