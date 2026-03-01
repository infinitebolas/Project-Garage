import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GarageModel } from "../models/garage.models";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})

export class GarageService {
    private http: HttpClient = inject(HttpClient);

    getGarages():Observable<GarageModel[]> {
        return this.http.get<GarageModel[]>("http://localhost:8080/api/garages");
    }


}
