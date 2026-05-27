import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DespesaService } from '../../services/despesa';

@Component({

selector:'app-nova-despesa',

standalone:true,

imports:[
CommonModule,
FormsModule
],

templateUrl:'./nova-despesa.html',

styleUrl:'./nova-despesa.css'

})

export class NovaDespesa {

descricao='';

valor=0;

data='';

categoria='ALIMENTACAO';

constructor(
private service: DespesaService,
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
'/despesas'
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