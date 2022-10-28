import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageProyectoService } from 'src/app/service/image-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

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
        alert("Proyecto creado correctamente");
        this.router.navigate(['']);
      }, err => {
        alert("Falló al añadir el proyecto");
        this.router.navigate(['']);
      }
    )
  }

  uploadImg($event:any){
    const name = "proyecto_" + this.nombre;
    this.imagePService.uploadImage($event, name);

  }

}
