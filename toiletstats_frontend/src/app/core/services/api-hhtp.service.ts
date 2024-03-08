import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Constants } from 'src/config/constants';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/models/visit.model';
import { Stats } from 'src/app/models/stats.model';


@Injectable({
    providedIn: 'root'
})

export class ApiHttpService { 
  constructor(private http: HttpClient) { }
  
  getStats(): Observable<Stats> {
      return this.http.get<Stats>(`${Constants.API_ENDPOINT}/get_stats`);
  }

  getBezoeken(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${Constants.API_ENDPOINT}/get_all_visits`);
}

}