import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  criarConta() {
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.toast.warning('Preencha todos os campos');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.toast.error('As senhas não conferem');
      return;
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (
!emailValido.test(
this.email
)
) {

this.toast.error(
'Digite um email válido'
);

return;

}
    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.http.post(
      'http://localhost:3000/usuarios',
      dados
    ).subscribe({
      next: () => {
        this.toast.success('Conta criada com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (erro) => {
  if (erro.status === 500) {
    this.toast.error('Email já cadastrado');
    return;
  }

  this.toast.error('Erro ao criar conta');
}
    });
  }
}