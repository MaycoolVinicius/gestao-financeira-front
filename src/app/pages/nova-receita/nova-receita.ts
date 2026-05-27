import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ReceitaService } from '../../services/receita';

@Component({

selector:'app-nova-receita',

standalone:true,

imports:[
CommonModule,
FormsModule
],

templateUrl:'./nova-receita.html',

styleUrl:'./nova-receita.css'

})

export class NovaReceita {

descricao='';

valor=0;

data='';

categoria='SALARIO';

constructor(
private service: ReceitaService,
private router: Router
){}

salvar(){

this.service
.criar({

descricao:this.descricao,

valor:this.valor,

data:this.data,

categoria:this.categoria

})

.subscribe({

next:()=>{

this.router.navigate([
'/receitas'
]);

},

error:(e)=>{

console.log(
e
);

}

});

}

}