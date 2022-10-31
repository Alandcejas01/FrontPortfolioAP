import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageProyectoService } from 'src/app/service/image-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.scss']
})
export class EditProyectosComponent implements OnInit {
  proyecto: Proyecto = null;
  imagenCargada: boolean = false;
  constructor(private proyectoService: ProyectoService,private activatedRouter: ActivatedRoute, private router: Router, public imagePService: ImageProyectoService) { }


  ngOnInit(): void {   /** spinner starts on init */
    this.imagePService.url = "";
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoService.detail(id).subscribe(
      data => {
        this.proyecto = data;
      }, err => {
        Swal.fire({
          background: '#121212',
          color: '#fff',
          icon: 'error',
          title: 'Error al modificar experiencia',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1550)
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
        Swal.fire({
          background: '#121212',
          color: '#fff',
          position: 'center',
          icon: 'success',
          title: 'Cambios Guardados',
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
          title: 'Error al modificar proyecto',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1550)
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
