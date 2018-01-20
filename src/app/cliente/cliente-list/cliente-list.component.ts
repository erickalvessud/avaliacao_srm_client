import { Component, OnInit } from '@angular/core';
import { Cliente } from "../cliente";
import { ClienteService } from "../cliente.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [ClienteService]
})
export class ClienteListComponent implements OnInit {
    
    private clientes: Cliente[];

    constructor(private router: Router, private clienteService: ClienteService) { }

    ngOnInit() {
        this.getAllClientes();
    }


    getAllClientes() {
        this.clienteService.findAll().subscribe(
          clientes => {
            this.clientes = clientes;
          },
          err => {
            console.log(err);
          }

        );
    }
    
    redirectNewClientePage() {
        this.router.navigate(['/cliente/create']);
    }
    
    editClientePage(cliente: Cliente) {
        if (cliente) {
            this.router.navigate(['/cliente/edit', cliente.id]);
        }
    }

    deleteCliente(cliente: Cliente) {
        if (cliente) {
          this.clienteService.deleteById(cliente.id).subscribe(
            res => {
              this.getAllClientes();
              this.router.navigate(['/cliente']);
              console.log('done');
            }
          );
        }
    }
}
