import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Character } from '../interfaces/character.interface';
import { ModalPage } from '../modal/modal.page';
import { CharactersService } from '../services/characters.servcice';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  characters: Character[];

  constructor(private charService: CharactersService, private cd: ChangeDetectorRef,  private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getAllFavorites();
  }

  //MÉTODO para mostrar todos los personajes favoritos
  getAllFavorites(){
    this.charService.getFavorites()
    .subscribe(data =>{
      this.characters = data;
      this.cd.detectChanges();
    })
  }

  //MÉTODO que abre un personaje favorito para poder editarlo o eliminarlo
  async openCharacter(character: Character){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: character.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }

}
