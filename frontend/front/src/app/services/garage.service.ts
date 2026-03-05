import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GarageModel } from "../models/garage.models";
import { Observable } from "rxjs/internal/Observable";
import { VoitureModel } from "../models/voiture.models";
@Injectable({
  providedIn: "root"
})

export class GarageService {
    private http: HttpClient = inject(HttpClient);

    getGarages():Observable<GarageModel[]> {
        return this.http.get<GarageModel[]>("http://localhost:8080/api/garages");
    }

    getGarageById(id: number):Observable<GarageModel> {
        return this.http.get<GarageModel>("http://localhost:8080/api/garages/" + id);
    }

    deleteGarage(id:number):Observable<void>{
        return this.http.delete<void>("http://localhost:8080/api/garages/" + id);
    }

    getVoitures(id:number):Observable<VoitureModel[]>{
        return this.http.get<VoitureModel[]>("http://localhost:8080/api/voiture/garage/"+id);
    }
}
