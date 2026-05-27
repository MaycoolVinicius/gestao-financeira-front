import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css'
})
export class RecuperarSenhaComponent {

  email = '';
  carregando = false;

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {}

  enviar() {

    if (!this.email) {

      this.toast.warning(
        'Informe seu email'
      );

      return;

    }

    this.carregando = true;

    this.http.post(
      'https://gestao-financeira-api-y0el.onrender.com/usuarios/recuperar-senha',
      {
        email: this.email
      }
    )
    .subscribe({

      next: () => {

        this.toast.success(
          'Se existir uma conta com este email, enviaremos instruções.'
        );

        this.email = '';

        this.carregando = false;

      },

      error: () => {

        this.toast.error(
          'Não foi possível processar sua solicitação'
        );

        this.carregando = false;

      }

    });

  }

}