import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';

const routes: Routes = [
    {path: 'cliente', component: ClienteListComponent},
    {path: 'cliente/create', component: ClienteCreateComponent},
    {path: 'cliente/edit/:id', component: ClienteCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
