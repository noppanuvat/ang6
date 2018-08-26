import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Profile } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getUsers(url): Observable<Profile[]> {
    return this.http
      .get<Profile[]>(url)
      .pipe(catchError(this.handleError("getHeroes", [])));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error("operation : ", operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
