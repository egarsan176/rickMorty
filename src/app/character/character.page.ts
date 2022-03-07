import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../interfaces/character.interface';
import { CharactersService } from '../services/characters.servcice';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {

  see: boolean = false;
  character: Character;

  isFav: boolean;

  constructor(private activeRoute: ActivatedRoute, private characterService: CharactersService) { }

  ngOnInit() {
    this.getCharacter();
  }


  //MÉTODO para obtener un personaje concreto a través de su id
  getCharacter(){
    
    this.characterService.getCharacterDetails(this.activeRoute.snapshot.params["id"])
    .subscribe({
      next: data =>{
        //console.log(data)
        this.character = data;
        this.see = true;
        this.checkFavorite(this.character);
       
      },
      error: e =>{
        console.log(e);
      }
    })
  }

  //MÉTODO para añadir un personaje a la base de datos a través de una petición al servicio
  addFavorito(character : Character){

    this.characterService.addFavorito(character);
    this.isFav = true;

  }

  //MÉTODO para eliminar un personaje a la base de datos a través de una petición al servicio
  deleteFavorito(character : Character){
    this.characterService.deleteFavorito(character);
    this.isFav=false;
  }

  //MÉTODO para comprobar si el caracter que se muestra está en favoritos o no
  checkFavorite(character : Character){
    this.characterService.getCharacterByID(character.id)
    .subscribe(result=>{
      if(result){
        this.isFav = true;
      }else{
        this.isFav = false;
      }
    })
  }

}
