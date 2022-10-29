import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  expe: Experiencia[] = [];

  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarExperiencia(): void{
    this.sExperiencia.lista().subscribe(data => {this.expe = data});
  }

  delete(id?: number){
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
      title: '¿Estas seguro que quieres eliminar la experiencia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Borrado!',
          'La experiencia fue borrada.',
          'success'
        )
        if(id != undefined){
          this.sExperiencia.delete(id).subscribe(
            data => {
              this.cargarExperiencia();
            }, err => {
              Swal.fire({
                background: '#121212',
                color: '#fff',
                icon: 'error',
                title: 'Error al borrar la experiencia',
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
          'La experiencia no fue borrada',
          'error'
        )
      }
    })
  }
}

