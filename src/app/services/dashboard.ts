import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
}

export interface ReceitaResponse {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string | null;
  usuario: UsuarioResponse;
}

export interface DespesaResponse {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string | null;
  usuario: UsuarioResponse;
}

export interface DashboardResponse {
  usuarioId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  ultimasReceitas: ReceitaResponse[];
  ultimasDespesas: DespesaResponse[];
  gastosPorCategoria: Record<string, number>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) {}

  buscarDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(this.apiUrl);
  }
}