import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { VoitureModel } from "../models/voiture.models";
@Injectable({
  providedIn: "root"
})

export class VoitureService {
    private http: HttpClient = inject(HttpClient);

    getVoitures():Observable<VoitureModel[]> {
        return this.http.get<VoitureModel[]>("http://localhost:8080/api/voiture");
    }

    getVoitureById(id: number):Observable<VoitureModel> {
        return this.http.get<VoitureModel>("http://localhost:8080/api/voiture/" + id);
    }

    deleteVoiture(id:number):Observable<void>{
        return this.http.delete<void>("http://localhost:8080/api/voiture/" + id);
    }

    // getVoitures(id:number):Observable<VoitureModel[]>{
    //     return this.http.get<VoitureModel[]>("http://localhost:8080/api/voiture/voiture/"+id);
    // }
}
