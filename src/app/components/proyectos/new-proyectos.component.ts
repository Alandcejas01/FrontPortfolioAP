import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageProyectoService } from 'src/app/service/image-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.scss']
})
export class NewProyectosComponent implements OnInit {
  nombre: string;
  descripcion: string;
  img: string;
  constructor(private proyectoService: ProyectoService, private router: Router, public imagePService: ImageProyectoService) { }

  ngOnInit(): void {
    this.imagePService.url = "";
  }

  onCreate(): void{
    const proyecto = new Proyecto(this.nombre, this.descripcion, this.img = this.imagePService.url);
    this.proyectoService.save(proyecto).subscribe(
      data => {
        Swal.fire({
          background: '#121212',
          color: '#fff',
          position: 'center',
          icon: 'success',
          title: 'Proyecto añadido correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1550)
      }, err => {
        Swal.fire({
          background: '#121212',
          color: '#fff',
          icon: 'error',
          title: 'Error al crear proyecto',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1550)
      }
    )
  }

  uploadImg($event:any){
    const name = "proyecto_" + this.nombre;
    this.imagePService.uploadImage($event, name);
  }

}
