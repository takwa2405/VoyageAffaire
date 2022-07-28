import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
    constructor(private http: HttpClient) { }

  getallpost() {
    return this.http.get<string[]>('http://localhost:8089/Voyage/Publication/listeAllPub');
  }
  postallpost(body: any) {
    return this.http.post<string[]>('http://localhost:8089/Voyage/Publication/addPublication', body);
  }
  adreactbyidpost(id: any) {
    return this.http.post<string[]>('http://localhost:8089/Voyage/reaction/addReaction/' + id, {});
  }
  addommentbyidpost(id: any,contenu:any) {
    return this.http.post<string[]>('http://localhost:8089/Voyage/commentaire/addCommentaire/' + id, {
      "contenu": contenu
    });
  }
  deleteallpost(id: any) {
    return this.http.delete('http://localhost:8089/Voyage/Publication/supprimerPublication/' + id);
  }
  getpost(body: any) {
    return this.http.get<string[]>('http:/Voyage/Publication/find/{title}', body);
  }
  getonecooment(id: any) {
    return this.http.get<string[]>('http://localhost:8089/Voyage/commentaire/getCommentairesPub/' + id);
  }
  getonereact(id: any) {
    return this.http.get<string[]>('http://localhost:8089/Voyage/reaction/getReactionsPub/' + id);
  }
  updatepost(id: any, body: any) {
    return this.http.put('http://localhost:8089/Voyage/Publication/modifierPublication' , body);
  }
  getallpostByTitle(title: string) {
    return this.http.get<string[]>('http://localhost:8089/Voyage/Publication/find/' + title);
  }
  deleteCommentire(id: any) { return this.http.delete('http://localhost:8089/Voyage/commentaire/supprimerCommentaire/'+ id);

  }
  updateCommentaire(id: any, body: any){ return this.http.put('http://localhost:8089/Voyage/commentaire/modifierCommentaire/'+ id, body);

  }

}