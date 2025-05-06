import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme, ThemeCreate } from '../../model/theme.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private apiUrl = `${environment.apiUrl}/temas`;

  constructor(private http: HttpClient) {}

  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.apiUrl);
  }

  getThemeById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.apiUrl}/${id}`);
  }

  createTheme(theme: ThemeCreate): Observable<Theme> {
    return this.http.post<Theme>(this.apiUrl, theme);
  }

  updateTheme(id: number, theme: ThemeCreate): Observable<Theme> {
    return this.http.put<Theme>(`${this.apiUrl}/${id}`, theme);
  }

  deleteTheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchThemesByDescription(description: string): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/descricao/${description}`);
  }
}
