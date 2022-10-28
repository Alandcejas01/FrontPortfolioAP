export class persona {
  id?: number;
  nombre: string;
  apellido: string;
  cargo: string;
  descripcion: string;
  img: string;

  constructor(nombre: string, apellido: string, cargo: string, descripcion: string, img: string){
    this.nombre = nombre;
    this.apellido = apellido;
    this.cargo = cargo;
    this.descripcion = descripcion;
    this.img = img;
  }
}
