import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { DashboardService, DashboardResponse } from '../../services/dashboard';
import { HttpClient } from '@angular/common/http';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  dashboard?: DashboardResponse;
  movimentacoes: any[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [0, 0],
        label: 'Resumo financeiro',
        backgroundColor: ['#14b8a6', '#ef4444'],
        borderRadius: 12
      }
    ]
  };

barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#334155'
      }
    },
    y: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#334155'
      }
    }
  }
};

pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff'
      }
    }
  }
};
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#38bdf8',
          '#fb7185',
          '#fb923c',
          '#34d399',
          '#a78bfa',
          '#facc15'
        ],
        borderColor: '#1e293b',
        borderWidth: 3
      }
    ]
  };

 

  constructor(
    private service: DashboardService,
     private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.service.buscarDashboard().subscribe({
      next: (dados) => {
        this.dashboard = dados;
        this.dashboardOriginal = dados;
          this.aplicarFiltroPeriodo();
          return;
        this.movimentacoes = [
  ...dados.ultimasReceitas.map(receita => ({
    tipo: 'RECEITA',
    descricao: receita.descricao,
    valor: receita.valor,
    data: receita.data,
    categoria: receita.categoria
  })),

  ...dados.ultimasDespesas.map(despesa => ({
    tipo: 'DESPESA',
    descricao: despesa.descricao,
    valor: despesa.valor,
    data: despesa.data,
    categoria: despesa.categoria
  }))
].sort((a, b) =>
  new Date(b.data).getTime() - new Date(a.data).getTime()
);
        this.barChartData = {
          labels: ['Receitas', 'Despesas'],
          datasets: [
            {
              data: [
                dados.totalReceitas,
                dados.totalDespesas
              ],
              label: 'Resumo financeiro',
              backgroundColor: ['#14b8a6', '#ef4444'],
              borderRadius: 12
            }
          ]
          
        };

        this.pieChartData = {
          labels: Object.keys(dados.gastosPorCategoria),
          datasets: [
            {
              data: Object.values(dados.gastosPorCategoria),
              backgroundColor: [
                '#38bdf8',
                '#fb7185',
                '#fb923c',
                '#34d399',
                '#a78bfa',
                '#facc15'
              ],
              borderColor: '#1e293b',
              borderWidth: 3
            }
          ]
        };
      },

      error: (erro) => {
        console.log(erro);
      }
    });
  }
  exportarPdf() {
  this.http.get(
    'http://localhost:3000/relatorios/dashboard/pdf',
    {
      responseType: 'blob'
    }
  ).subscribe({
    next: (arquivo) => {
      const url = window.URL.createObjectURL(arquivo);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio-financeiro.pdf';
      link.click();

      window.URL.revokeObjectURL(url);
    },

    error: (erro) => {
      console.log(erro);
      alert('Erro ao exportar PDF');
    }
  });
}
periodoSelecionado = 'TODOS';
dashboardOriginal?: DashboardResponse;
alterarPeriodo(periodo: string) {
  this.periodoSelecionado = periodo;
  this.aplicarFiltroPeriodo();
}

aplicarFiltroPeriodo() {
  if (!this.dashboardOriginal) {
    return;
  }

  const hoje = new Date();

  const filtrarPorPeriodo = (item: any) => {
    const dataItem = new Date(item.data + 'T00:00:00');

    if (this.periodoSelecionado === 'HOJE') {
      return dataItem.toDateString() === hoje.toDateString();
    }

    if (this.periodoSelecionado === '7DIAS') {
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(hoje.getDate() - 7);
      return dataItem >= seteDiasAtras && dataItem <= hoje;
    }

    if (this.periodoSelecionado === 'MES') {
      return (
        dataItem.getMonth() === hoje.getMonth() &&
        dataItem.getFullYear() === hoje.getFullYear()
      );
    }

    if (this.periodoSelecionado === 'ANO') {
      return dataItem.getFullYear() === hoje.getFullYear();
    }

    return true;
  };

  const receitasFiltradas =
    this.dashboardOriginal.ultimasReceitas.filter(filtrarPorPeriodo);

  const despesasFiltradas =
    this.dashboardOriginal.ultimasDespesas.filter(filtrarPorPeriodo);

  const totalReceitas = receitasFiltradas.reduce(
    (total, receita) => total + receita.valor,
    0
  );

  const totalDespesas = despesasFiltradas.reduce(
    (total, despesa) => total + despesa.valor,
    0
  );

  const gastosPorCategoria: Record<string, number> = {};

  despesasFiltradas.forEach(despesa => {
    const categoria = despesa.categoria ?? 'SEM CATEGORIA';

    gastosPorCategoria[categoria] =
      (gastosPorCategoria[categoria] || 0) + despesa.valor;
  });

  this.dashboard = {
    ...this.dashboardOriginal,
    totalReceitas,
    totalDespesas,
    saldo: totalReceitas - totalDespesas,
    ultimasReceitas: receitasFiltradas,
    ultimasDespesas: despesasFiltradas,
    gastosPorCategoria
  };

  this.atualizarGraficosEMovimentacoes();
}

atualizarGraficosEMovimentacoes() {
  if (!this.dashboard) {
    return;
  }

  const dados = this.dashboard;

  this.movimentacoes = [
    ...dados.ultimasReceitas.map(receita => ({
      tipo: 'RECEITA',
      descricao: receita.descricao,
      valor: receita.valor,
      data: receita.data,
      categoria: receita.categoria
    })),
    ...dados.ultimasDespesas.map(despesa => ({
      tipo: 'DESPESA',
      descricao: despesa.descricao,
      valor: despesa.valor,
      data: despesa.data,
      categoria: despesa.categoria
    }))
  ].sort((a, b) =>
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  this.barChartData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [
          dados.totalReceitas,
          dados.totalDespesas
        ],
        label: 'Resumo financeiro',
        backgroundColor: ['#14b8a6', '#ef4444'],
        borderRadius: 12
      }
    ]
  };

  this.pieChartData = {
    labels: Object.keys(dados.gastosPorCategoria),
    datasets: [
      {
        data: Object.values(dados.gastosPorCategoria),
        backgroundColor: [
          '#38bdf8',
          '#fb7185',
          '#fb923c',
          '#34d399',
          '#a78bfa',
          '#facc15'
        ],
        borderColor: '#1e293b',
        borderWidth: 3
      }
    ]
  };
}
}