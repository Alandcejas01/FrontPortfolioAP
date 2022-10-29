import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.scss']
})
export class EditAcercaDeComponent implements OnInit {
  persona: persona = null;
  imagenCargada: boolean = false;
  constructor(private personaService: PersonaService,private activatedRouter: ActivatedRoute, private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.url = "";
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      data => {
        this.persona = data;
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al modificar persona',
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
    if(!(this.imageService.url == "")){
      this.persona.img = this.imageService.url;
    }
    this.personaService.update(id, this.persona).subscribe(
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
          title: 'Error al modificar persona',
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
      this.imageService.url = this.persona.img;
    } else {
      const id = this.activatedRouter.snapshot.params['id'];
      const name = "perfil_" + id;
     this.imageService.uploadImage($event, name);
    }
  }
}
