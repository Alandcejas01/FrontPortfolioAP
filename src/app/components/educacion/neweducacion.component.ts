import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-neweducacion',
  templateUrl: './neweducacion.component.html',
  styleUrls: ['./neweducacion.component.scss']
})
export class NeweducacionComponent implements OnInit {
  nombreEd: string;
  descripcionEd: string;

  constructor(private educacionS: EducacionService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const educacion = new Educacion(this.nombreEd, this.descripcionEd);
    this.educacionS.save(educacion).subscribe(
      data => {
        Swal.fire({
          background: '#121212',
          color: '#fff',
          position: 'center',
          icon: 'success',
          title: 'Educación añadida correctamente',
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
          title: 'Error al crear educación',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1550)
      }
    );
  }

}
