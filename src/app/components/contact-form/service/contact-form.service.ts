import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PostMailBody {
  access_token?: string;
  subject: string;
  reply_to: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  token = {
    access_token: '73ndws7pk3fek9ssn4lj0jsg'
  };

  constructor(private http: HttpClient) { }

  post(params: PostMailBody): Observable<any> {
    const body = this.toBody({ ...this.token, ...params });
    return this.http.post(
      'https://postmail.invotes.com/send',
      body,
      {
        headers: {
        'Content-type': 'application/x-www-form-urlencoded'
        },
        responseType: 'text'
      }
    );
  }

  private toBody(object: PostMailBody): string {
    const formData = [];
    for (const key in object ) {
      if (key) {
        formData.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
      }
    }
    return formData.join('&');
  }
}
