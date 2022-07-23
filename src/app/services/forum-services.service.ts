import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumServicesService {
  constructor(private http: HttpClient) { }

  getallpost() {
    return this.http.get<string[]>('http://localhost:8089/Voyage/Publication/listePublications');
  }
  postallpost(body) {
    return this.http.post<string[]>('http://localhost:8089/Voyage/Publication/addPublication',body);
  }

 deleteallpost(id) {
    return this.http.delete('http://localhost:8089/Voyage/Publication/supprimerPublication/'+id);
 }
 getpost(body) {
  return this.http.get<string[]>('http:/Voyage/Publication/find/{title}',body);
}
}
