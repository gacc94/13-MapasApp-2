import { Injectable } from '@angular/core';
import Mapboxgl, {LngLatLike, Map} from "mapbox-gl";

@Injectable({
  providedIn: 'root'
})
export class MapService {

    private _map?: Map;
    get isMapReady(){
        return !!this._map;
    }
    constructor() { }
    setMap(map: Map) {
        this._map = map;
    }
    flyTo( coords: LngLatLike ) {
        if(!this.isMapReady) throw new Error('El mapa no inicializado');
        this._map?.flyTo({
            zoom    : 14,
            center  : coords,
        })
    }
}
