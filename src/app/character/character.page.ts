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

  //PROPIEDADES
  see: boolean = false;
  character: Character;
  date: string= "";

  charactersFav: Character[];

  //PARA COMPROBAR SI ES FAVORITO O NO
  isFav: boolean = false;
  estrella: string= "star-outline";

  constructor(private activeRoute: ActivatedRoute, private characterService: CharactersService) { }

  ngOnInit() {
    this.estrella = this.isFav ? "star" : "star-outline"; //cambio el valor del icono según sea favorito o no
    this.getAllFavorites(); //cargo en el init todos los personajes favoritos
    
  }

  //MÉTODO para obtener un personaje concreto a través de su id
  getCharacter(){

    this.characterService.getCharacterDetails(this.activeRoute.snapshot.params["id"])
    
    .subscribe({
      next: data =>{
        this.checkFavorite(data); //aquí compruebo si el personaje está en favoritos o no
        
        this.character = data;  //igualo la propiedad this.character al valor de la respuesta

        //para que la fecha se muestre en un formato más correcto
        let aux = data.created.toString();
        let indice = aux.indexOf("T");
        this.date = aux.substring(0,indice);
        //this.date = data.created.getDate()+"-"+data.created.getMonth()+"-"+data.created.getFullYear();
       
        this.see = true;
    
      },
      error: e =>{
        console.log(e);
      }
    })
  }

  //MÉTODO que añade un personaje favorito o lo elimina
  favorite(character: Character){
    //console.log("entrar",this.isFav)
    if(this.isFav == false){
      this.characterService.addFavorito(character).then(resp =>{
        this.estrella = "star"
        this.isFav=true;
      });
    }else{
      this.charactersFav.forEach(element =>{
        if(element.name == character.name){
          this.characterService.deleteFavorito(element).then(resp =>{
            this.estrella = "star-outline"
            this.isFav = false;
          });
          
        }
      })
    }
  }

  
  //MÉTODO para comprobar si el caracter que se muestra está en favoritos o no
  checkFavorite(character : Character){

    if(this.charactersFav!=undefined){

      this.charactersFav.forEach(element => {     
        
        // console.log('Element: ',element) //8gtWBBgaKykpmCMAr093
        //console.log(character.id) //1
        if(element.name == character.name){
          this.isFav = true;
          this.estrella = "star"
        }
        if(!this.isFav){
          this.isFav = false;
          this.estrella = "star-outline"
        }
      });
    }
  }

  //MÉTODO para mostrar todos los personajes favoritos, si la petición tiene respuesta se almacena en this.charactersFav todos los personajes favoritos de la bbdd
  getAllFavorites(){
    this.characterService.getFavorites()
    .subscribe(data =>{
      this.charactersFav = data; 
      
      this.getCharacter();  //llamo al método que obtiene el caracter que se va a mostrar en la página
    })
  }


}
