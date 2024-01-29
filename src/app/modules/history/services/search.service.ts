import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<any> {
    return this.http.get(`${this.URL}/tracks?src=${term}`)
      .pipe(
        map((dataRaw: any) => dataRaw.data)
      )
  }

    private filterResults(data: any[], term: string): any[] {
    // Filtra los resultados según la lógica deseada
    return data.filter(track => this.isMatch(track, term));
  }

  private isMatch(track: any, term: string): boolean {
    // Implementa la lógica de comparación aquí, por ejemplo, comparación de nombres, artistas, etc.
    const trackName = track.name.toLowerCase();
    const artistName = track.artist.toLowerCase();
    const searchTerm = term.toLowerCase();

    return trackName.includes(searchTerm) || artistName.includes(searchTerm);
  }
}
