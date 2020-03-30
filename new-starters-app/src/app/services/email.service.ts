import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendLmEmailCreated(starter){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };

    var postURL = "https://prod-43.westeurope.logic.azure.com:443/workflows/0e1cb28ee58c4e169569686a73346797/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HQ-H0CJXfHahxDxHWXK-LFpsxZseaJCBAKXyQ9LUWU8";

    const req = new HttpRequest('POST', postURL, starter,httpOptions);

    return this.http.request(req);

  }

  sendEmailLmCreated(starter){
console.log('created')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };

    var postURL = "https://prod-107.westeurope.logic.azure.com:443/workflows/875d812c2f664220aecbe27ab2b532b8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pl-9n-Z_ytDzOouOU5XjgGp0YPllbm1St54NLZzN6xE"

    const req = new HttpRequest('POST', postURL, starter ,httpOptions);

    return this.http.request(req);

  }


}
