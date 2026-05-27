import { Component } from '@angular/core';

import {
Router,
RouterLink,
RouterOutlet
} from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({

selector:'app-root',

imports:[
RouterOutlet,
RouterLink,
CommonModule
],

templateUrl:'./app.html',

styleUrl:'./app.css'

})

export class App {

modoEscuro = false;

constructor(
public router: Router
){

this.modoEscuro =

localStorage
.getItem(
'tema'
) === 'dark';

this.aplicarTema();

}

logout(){

localStorage
.removeItem(
'token'
);

this.router.navigate([
'/login'
]);

}

estaEmTelaPublica() {
  return (
    this.router.url === '/login' ||
    this.router.url === '/cadastro' ||
    this.router.url === '/recuperar-senha'
  );
}

trocarTema(){

this.modoEscuro =
!this.modoEscuro;

localStorage
.setItem(
'tema',
this.modoEscuro
? 'dark'
: 'light'
);

this.aplicarTema();

}

aplicarTema(){

document.body.className =

this.modoEscuro

? 'dark'

: '';

}

}