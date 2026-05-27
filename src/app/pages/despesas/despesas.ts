import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Despesa, DespesaService } from '../../services/despesa';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './despesas.html',
  styleUrl: './despesas.css'
})
export class DespesasComponent implements OnInit {

  despesas: Despesa[] = [];

  mostrarFormulario = false;
  editando = false;
  idEditando?: number;

  descricao = '';
  valor = 0;
  data = '';
  categoria = 'ALIMENTACAO';

  busca = '';
  categoriaFiltro = '';

  paginaAtual = 0;
  tamanhoPagina = 5;
  totalPaginas = 0;

  arquivoSelecionado?: File;

  constructor(
    private service: DespesaService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarDespesas();
  }

  carregarDespesas() {
    this.service
      .listarPaginado(this.paginaAtual, this.tamanhoPagina)
      .subscribe({
        next: (dados) => {
          this.despesas = dados.content;
          this.totalPaginas = dados.totalPages;
          this.paginaAtual = dados.number;
        },
        error: () => {
          this.toast.error('Erro ao carregar despesas');
        }
      });
  }

  selecionarArquivo(event: any) {
    this.arquivoSelecionado = event.target.files[0];
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.editando = false;
    this.idEditando = undefined;
    this.limparFormulario();
  }

  editar(despesa: Despesa) {
    this.mostrarFormulario = true;
    this.editando = true;
    this.idEditando = despesa.id;

    this.descricao = despesa.descricao;
    this.valor = despesa.valor;
    this.data = despesa.data;
    this.categoria = despesa.categoria ?? 'ALIMENTACAO';
    this.arquivoSelecionado = undefined;
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
        next: (res: any) => {
          this.enviarComprovanteSeExistir(
            res.id,
            'Despesa atualizada!',
            'Despesa atualizada, mas falhou o upload do comprovante'
          );
        },
        error: () => this.toast.error('Erro ao atualizar despesa')
      });
    } else {
      this.service.criar(dados).subscribe({
        next: (res: any) => {
          this.enviarComprovanteSeExistir(
            res.id,
            'Despesa salva!',
            'Despesa salva, mas falhou o upload do comprovante'
          );
        },
        error: () => this.toast.error('Erro ao salvar despesa')
      });
    }
  }

  enviarComprovanteSeExistir(
    id: number,
    mensagemSucesso: string,
    mensagemErroUpload: string
  ) {
    if (!this.arquivoSelecionado) {
      this.toast.success(mensagemSucesso);
      this.carregarDespesas();
      this.fecharFormulario();
      return;
    }

    this.service.uploadComprovante(id, this.arquivoSelecionado).subscribe({
      next: () => {
        this.toast.success(mensagemSucesso + ' Comprovante enviado!');
        this.carregarDespesas();
        this.fecharFormulario();
      },
      error: () => {
        this.toast.warning(mensagemErroUpload);
        this.carregarDespesas();
        this.fecharFormulario();
      }
    });
  }

  excluir(id: number) {
    if (!confirm('Deseja excluir esta despesa?')) {
      return;
    }

    this.service.deletar(id).subscribe({
      next: () => {
        this.toast.success('Despesa excluída!');
        this.carregarDespesas();
      },
      error: () => this.toast.error('Erro ao excluir despesa')
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
    this.categoria = 'ALIMENTACAO';
    this.arquivoSelecionado = undefined;
  }

  despesasFiltradas() {
    return this.despesas.filter(despesa => {
      const bateDescricao = despesa.descricao
        .toLowerCase()
        .includes(this.busca.toLowerCase());

      const bateCategoria =
        !this.categoriaFiltro ||
        despesa.categoria === this.categoriaFiltro;

      return bateDescricao && bateCategoria;
    });
  }

  proximaPagina() {
    if (this.paginaAtual + 1 < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarDespesas();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarDespesas();
    }
  }
}