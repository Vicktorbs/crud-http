import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {

    this.cargando = true
    this.heroesService.getHeroes().subscribe(resp => {
      this.heroes = resp
      this.cargando = false
  })

  }

  borrarHeroes(heroe: HeroeModel, i: number) {

    Swal.fire({
      title: '¡Borrar!',
      text: `¿Estas seguro de que deseas borrar a ${ heroe.nombre }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar'
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(i, 1);
    this.heroesService.deleteHeror(heroe.id).subscribe();
      }
    })

  }

}
