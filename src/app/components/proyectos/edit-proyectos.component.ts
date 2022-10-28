import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageProyectoService } from 'src/app/service/image-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.scss']
})
export class EditProyectosComponent implements OnInit {
  proyecto: Proyecto = null;
  imagenCargada: boolean = false;
  constructor(private proyectoService: ProyectoService,private activatedRouter: ActivatedRoute, private router: Router, public imagePService: ImageProyectoService) { }


  ngOnInit(): void {
    this.imagePService.url = "";
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoService.detail(id).subscribe(
      data => {
        this.proyecto = data;
      }, err => {
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    if(!(this.imagePService.url == "")){
      this.proyecto.img = this.imagePService.url;
    }
    this.proyectoService.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
    )
  }


  uploadImage($event:any){
    if($event.target.files[0] == null){
      this.imagePService.url = this.proyecto.img;
    } else {
      const name = "proyecto_" + this.proyecto.nombre;
      this.imagePService.uploadImage($event, name);
    }
  }
}
