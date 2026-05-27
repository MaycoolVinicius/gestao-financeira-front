import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receita, ReceitaService } from '../../services/receita';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receitas.html',
  styleUrl: './receitas.css'
})
export class Receitas implements OnInit {

  receitas: Receita[] = [];

  paginaAtual = 0;
  tamanhoPagina = 5;
  totalPaginas = 0;

  mostrarFormulario = false;
  editando = false;
  idEditando?: number;

  descricao = '';
  valor = 0;
  data = '';
  categoria = 'SALARIO';

  busca = '';
  categoriaFiltro = '';

  constructor(
    private service: ReceitaService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas() {
    this.service.listarPaginado(
      this.paginaAtual,
      this.tamanhoPagina
    ).subscribe({
      next: (dados) => {
        this.receitas = dados.content;
        this.totalPaginas = dados.totalPages;
        this.paginaAtual = dados.number;
      },
      error: () => this.toast.error('Erro ao carregar receitas')
    });
  }

  proximaPagina() {
    if (this.paginaAtual + 1 < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarReceitas();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarReceitas();
    }
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.editando = false;
    this.idEditando = undefined;
    this.limparFormulario();
  }

  editar(receita: Receita) {
    this.mostrarFormulario = true;
    this.editando = true;
    this.idEditando = receita.id;

    this.descricao = receita.descricao;
    this.valor = receita.valor;
    this.data = receita.data;
    this.categoria = receita.categoria ?? 'SALARIO';
  }

  salvar() {
    const dados = {
      descricao: this.descricao,
      valor: this.valor,
      data: this.data,
      categoria: this.categoria
    };

    if (this.editando && this.idEditando) {
      this.service.atualizar(this.idEditando, dados).subscribe({
        next: () => {
          this.toast.success('Receita atualizada!');
          this.carregarReceitas();
          this.fecharFormulario();
        },
        error: () => this.toast.error('Erro ao atualizar receita')
      });
    } else {
      this.service.criar(dados).subscribe({
        next: () => {
          this.toast.success('Receita salva!');
          this.paginaAtual = 0;
          this.carregarReceitas();
          this.fecharFormulario();
        },
        error: () => this.toast.error('Erro ao salvar receita')
      });
    }
  }

  excluir(id: number) {
    if (!confirm('Deseja excluir esta receita?')) {
      return;
    }

    this.service.deletar(id).subscribe({
      next: () => {
        this.toast.success('Receita excluída!');
        this.carregarReceitas();
      },
      error: () => this.toast.error('Erro ao excluir receita')
    });
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.idEditando = undefined;
    this.limparFormulario();
  }

  limparFormulario() {
    this.descricao = '';
    this.valor = 0;
    this.data = '';
    this.categoria = 'SALARIO';
  }

  receitasFiltradas() {
    return this.receitas.filter(receita => {
      const bateDescricao = receita.descricao
        .toLowerCase()
        .includes(this.busca.toLowerCase());

      const bateCategoria =
        !this.categoriaFiltro ||
        receita.categoria === this.categoriaFiltro;

      return bateDescricao && bateCategoria;
    });
  }
}