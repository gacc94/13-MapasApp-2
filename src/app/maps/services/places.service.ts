import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feature, PlacesResponse} from "../interfaces/places.interface";
import {PlacesApiClient} from "../api/placesApiClient";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
    public useLocation?: [number, number] ;
    public isLoadingPlaces: boolean = false;
    public places: Array<Feature> = [];
    get isUserLocationReady(): boolean {
        return !!this.useLocation;
    }
    constructor(
        private placesApi: PlacesApiClient,
    ) {
        this.getUserLocation();
    }

    public async getUserLocation(): Promise<[number, number]>{
        return new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition(
                ({ coords})=>{
                    this.useLocation = [coords.longitude, coords.longitude]
                    resolve( this.useLocation );
                },
                (error)=>{
                    alert('No se puede obtener la geolocalización')
                    console.log(error);
                    reject();
                }
            );
        })
    }
    getPlacesByQuery( query: string=''){
        if( query.length === 0) {
            this.places = [];
            this.isLoadingPlaces = false;
            return ;
        }

        this.isLoadingPlaces = true;
        if( !this.useLocation ) throw new Error('No hay userLocation');

        return this.placesApi.get<PlacesResponse>(`/${query}.json`, {
            params: {proximity: this.useLocation?.join(',')}
        })
            .subscribe({
                next: value => {
                    console.log(value.features)

                    this.isLoadingPlaces= false;
                    this.places = value.features;
                }
            });
    }
}
