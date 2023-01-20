import { Component } from '@angular/core';
import {MapService, PlacesService} from "../../services";

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent {
    constructor(
        private placesService:PlacesService,
        private mapService: MapService,
    ) { }
    goToMyLocation(): void{
        if( !this.placesService.useLocation ) throw new Error('No hay  de usuario');
        if( !this.mapService.isMapReady ) throw new Error('No hay mapa disponible');

        this.mapService.flyTo( this.placesService.useLocation! );
    }
}
