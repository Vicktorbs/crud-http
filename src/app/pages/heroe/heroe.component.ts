import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroeService: HeroesService) { }

  ngOnInit() {
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario invalido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading()

    let peticion: Observable<any>

    if (this.heroe.id) {
      peticion = this.heroeService.actualizarHeroe(this.heroe)
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe)
    }
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Actualizado correctamente',
        icon: 'success'
      })
    })

  }

}
