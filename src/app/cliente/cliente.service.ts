import { Injectable } from '@angular/core';
import { Cliente } from "./cliente";
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";


@Injectable()
export class ClienteService {
    
    private apiUrl = 'http://localhost:8080/cliente';

    constructor(private http: Http) { }

    findAll(): Observable<Cliente[]>  {
        return this.http.get(this.apiUrl)
            .map((res:Response) => res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    findById(id: number): Observable<Cliente> {
        return this.http.get(this.apiUrl + '/' + id)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Error'));
    }

    updateCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.put(this.apiUrl, cliente)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    saveCliente(cliente: Cliente): Observable<Cliente> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl, cliente, options)
            //.map((res:Response) => res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
    }
    
    deleteById(id: number): Observable<boolean> {
        return this.http.delete(this.apiUrl + '/' + id)
          //.map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
