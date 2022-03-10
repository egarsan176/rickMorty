import { Component, OnInit } from '@angular/core';
import { Result } from '../interfaces/characters.interface';
import { CharactersService } from '../services/characters.servcice';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  search: string = "";
  loading: boolean;
  characters: Result[] = [];


  constructor(private characterService: CharactersService) { }

  ngOnInit() {
  }

  //MÉTODO para obtener la lista de personajes que coinciden con el nombre que se escribe en el campo de búsqueda
  getCharacter(event){
    this.loading = true;
    this.search = event.detail.value; //igualo la propiedad al evento que le paso por el input de search

    this.characterService.getCharacter(this.search)
    .subscribe({
      next: data =>{
        //console.log(data)
        this.characters = data.results;  
        this.loading=false;
    },
    error: e =>{
        console.log(e)
        this.loading=false;
    }
    })
  }
}
