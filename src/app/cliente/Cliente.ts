export class Cliente {

  id: number;
  nome: string;
  limiteCredito: number;
  tipoRisco: string;
  taxaJuros?: number;

  constructor(id: number, nome: string, limiteCredito: number, tipoRisco: string, taxaJuros?: number){
    this.id = id;
    this.nome = nome;
    this.limiteCredito = limiteCredito;
    this.tipoRisco = tipoRisco;
    this.taxaJuros = taxaJuros;
  }

}