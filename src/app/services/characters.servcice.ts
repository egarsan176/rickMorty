import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Character } from "../interfaces/character.interface";
import { Characters } from "../interfaces/characters.interface";

import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CharactersService {
    
    private urlBase: string = "https://rickandmortyapi.com/api/character/";

    constructor(private httpClient: HttpClient, private firestore: Firestore){}

    //MÉTODO que gestiona petición GET y devuelve una lista con todos los personajes que coinciden con el parámetro que se le pasa
    getCharacter(search:string){
        //guardo en una constante los parámetros del título y del límite de 10 
     const params = new HttpParams()
     .set('name', search) //paso en el name el input del cuadro de búsqueda

     return this.httpClient.get<Characters>(this.urlBase, {params: params});
    }

    //MÉTODO que gestiona petición GET pasando el id de un personaje y te devuelve el personaje en concreto
    getCharacterDetails(id: number){
        return this.httpClient.get<Character>(`${this.urlBase}${id}`);
    }

    //MÉTODO para añadir un personaje favorito que se guarda en la base de datos
    addFavorito(character: Character){
        const charRef = collection(this.firestore, 'characters');
        
        return addDoc(charRef, character);
    }

    //MÉTODO para eliminar un personaje favorito de la base de datos
    deleteFavorito(character: Character){
        const charDocRef = doc(this.firestore, `characters/${character.id}`);
        return deleteDoc(charDocRef);
    }

    //MÉTODO para obtener el listado de personajes favoritos de la base de datos
    getFavorites(): Observable<Character[]>{
        const charRef = collection(this.firestore, 'characters');
        return collectionData(charRef, {idField: 'id'}) as Observable<Character[]>;
    }

    //MÉTODO para actualizar un personaje favorito de la base de datos
    updateFavorite(character: Character){
        const charDocRef = doc(this.firestore, `characters/${character.id}`);
    return updateDoc(charDocRef, {
      name: character.name,
      species: character.species,
      origin: character.origin,
      status: character.status,
      location: character.location
    });
    }

    //MÉTODO SOLO VÁLIDO PARA EL MODAL para obtener un personaje favorito en concreto de la base de datos según su id
    getCharacterByID(id): Observable<Character>{
        const charDocRef = doc(this.firestore, `characters/${id}`);
        return docData(charDocRef, { idField: 'id' }) as Observable<Character>;
    }

}