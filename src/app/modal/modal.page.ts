import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Character } from '../interfaces/character.interface';
import { CharactersService } from '../services/characters.servcice';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string;
  character: Character = null;

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private charService: CharactersService) { }

  ngOnInit() {
    this.charService.getCharacterByID(this.id)
    .subscribe(data=>{
      this.character = data;
    })
  }

  async deleteCharacter() {
    await this.charService.deleteFavorito(this.character); 
    this.modalCtrl.dismiss();
  }
 
  async updateCharacter() {
    await this.charService.updateFavorite(this.character);
    const toast = await this.toastCtrl.create({
      message: 'Usuario actualizado.',
      duration: 2000
    });
    toast.present();
 
  }

}
