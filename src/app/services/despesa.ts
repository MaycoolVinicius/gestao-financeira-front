import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
}

export interface DespesaPage {
  content: Despesa[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
 
  private api =
    'http://localhost:3000/despesas';

  constructor(
    private http: HttpClient
  ) {}

  listar() {
    return this.http.get<Despesa[]>(this.api);
  }

  listarPaginado(
    page:number,
    size:number
  ) {
    return this.http.get<DespesaPage>(
      `${this.api}/paginado?page=${page}&size=${size}`
    );
  }

  criar(dados:any) {
    return this.http.post(this.api,dados);
  }

  atualizar(id:number,dados:any) {
    return this.http.put(
      `${this.api}/${id}`,
      dados
    );
  }

  deletar(id:number) {
    return this.http.delete(
      `${this.api}/${id}`
    );
  }
  uploadComprovante(
  id:number,
  arquivo:File
){

const formData =
new FormData();

formData.append(
'arquivo',
arquivo
);

return this.http.post(

`${this.api}/${id}/comprovante`,

formData

);

}
}