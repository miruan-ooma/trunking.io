import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { HttpClient } from '@angular/common/http';
import { ApiAction } from '../../core/api-actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor( _http:HttpClient) {
    super(_http);
   }


   login(obj: any) {
    this.makeRequest(ApiAction.SessionCreate, obj).subscribe()
  }
}
