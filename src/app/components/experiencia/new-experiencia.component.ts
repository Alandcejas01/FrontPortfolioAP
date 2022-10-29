import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.scss']
})
export class NewExperienciaComponent implements OnInit {
  nombreE: string = '';
  descripcionE: string = '';

  constructor(private sExperiencia: SExperienciaService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const expe = new Experiencia(this.nombreE, this.descripcionE);
    this.sExperiencia.save(expe).subscribe( data => {
      Swal.fire({
        background: '#121212',
        color: '#fff',
        position: 'center',
        icon: 'success',
        title: 'Experiencia añadida correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1550)
    }, err =>{
      Swal.fire({
        background: '#121212',
        color: '#fff',
        icon: 'error',
        title: 'Error al crear experiencia',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1550)
    }
    )
  }

}
