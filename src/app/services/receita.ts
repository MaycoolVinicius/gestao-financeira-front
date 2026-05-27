import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Receita {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
}

export interface ReceitaPage {
  content: Receita[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private api = 'https://gestao-financeira-api-y0el.onrender.com/receitas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Receita[]>(this.api);
  }

  listarPaginado(page: number, size: number) {
    return this.http.get<ReceitaPage>(
      `${this.api}/paginado?page=${page}&size=${size}`
    );
  }

  criar(dados: any) {
    return this.http.post(this.api, dados);
  }

  atualizar(id: number, dados: any) {
    return this.http.put(`${this.api}/${id}`, dados);
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}