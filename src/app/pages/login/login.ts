import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
selector: 'app-login',

standalone: true,

imports: [
CommonModule,
FormsModule,
RouterLink
],

templateUrl: './login.html',

styleUrl: './login.css'
})

export class LoginComponent {

email = '';

senha = '';

constructor(
private auth: Auth,
private router: Router
){}

entrar() {

this.auth.login({

email: this.email,

senha: this.senha

})

.subscribe({

next: (resposta)=>{

this.auth.salvarToken(
resposta.token
);

this.router.navigate([
'/dashboard'
]);

},

error: ()=>{

alert(
'Email ou senha inválidos'
);

}

});

}

}