import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente } from "../cliente";
import { ClienteService } from "../cliente.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
  providers: [ClienteService]
})
export class ClienteCreateComponent implements OnInit, OnDestroy {
    
    id: number;
    clienteForm: FormGroup;
    private sub: any;

    tiposRiscos = ['A', 'B', 'C'];

    constructor(private route: ActivatedRoute, private router: Router, private clienteService: ClienteService) { }

    ngOnInit() {
        
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        }); 
    
        this.clienteForm = new FormGroup({
          nome: new FormControl('', Validators.required),
          limiteCredito: new FormControl('', Validators.required),
          tipoRisco: new FormControl('', Validators.required),
          taxaJuros: new FormControl('')
        });
        
        if (this.id) { //edit form
          this.clienteService.findById(this.id).subscribe(
            cliente => {
                this.id = cliente.id;
                this.clienteForm.patchValue({
                    nome: cliente.nome,
                    limiteCredito: cliente.limiteCredito,
                    tipoRisco: cliente.tipoRisco,
                    taxaJuros: cliente.taxaJuros
                });
             },error => {
              console.log(error);
             }
          );
        }
    }
    
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    
    onSubmit() {
        if (this.clienteForm.valid) {
        
            if (this.id) {
                let cliente: Cliente = new Cliente(this.id,
                this.clienteForm.controls['nome'].value,
                this.clienteForm.controls['limiteCredito'].value,
                this.clienteForm.controls['tipoRisco'].value,
                this.clienteForm.controls['taxaJuros'].value);
                this.clienteService.saveCliente(cliente).subscribe();
              } else {
                let cliente: Cliente = new Cliente(null,
                this.clienteForm.controls['nome'].value,
                this.clienteForm.controls['limiteCredito'].value,
                this.clienteForm.controls['tipoRisco'].value,
                this.clienteForm.controls['taxaJuros'].value);
                this.clienteService.saveCliente(cliente).subscribe();
            }

        }
        this.clienteForm.reset();
        this.router.navigate(['/cliente']);
    }
    
    onChange(newValue) {
        switch(newValue) { 
           case 'A': { 
              this.clienteForm.controls['taxaJuros'].setValue(0.0);
              break; 
           } 
           case 'B': { 
              this.clienteForm.controls['taxaJuros'].setValue(0.1);
              break; 
           } 
           case 'C': {
              this.clienteForm.controls['taxaJuros'].setValue(0.2);
              break;    
           } 
           default: { 
              break;              
           } 
        }
    }

    redirectClientePage() {
        this.router.navigate(['/cliente']);
    }
}
