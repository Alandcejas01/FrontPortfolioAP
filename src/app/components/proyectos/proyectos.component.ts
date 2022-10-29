import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyecto: Proyecto[] = [];
  constructor(public proyectoService: ProyectoService, private tokenService: TokenService) { }
  isLogged = false;
  ngOnInit(): void {
    this.cargarProyectos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyectos(): void{
    this.proyectoService.lista().subscribe(
      data => {
        this.proyecto = data;
      }
    )
  }

  delete(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      background: '#121212',
      color: '#fff',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      background: '#121212',
      color: '#fff',
      title: '¿Estas seguro que quieres eliminar el proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Borrado!',
          'El proyecto fue borrado.',
          'success'
        )
        if(id != undefined){
          this.proyectoService.delete(id).subscribe(
            data => {
              this.cargarProyectos();
            }, err => {
              Swal.fire({
                background: '#121212',
                color: '#fff',
                icon: 'error',
                title: 'Error al borrar el proyecto',
                showConfirmButton: true,
                timer: 1500
              })
            }
          )
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El proyecto no fue borrado',
          'error'
        )
      }
    })
  }

}
