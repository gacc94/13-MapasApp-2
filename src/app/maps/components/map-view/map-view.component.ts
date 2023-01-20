import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapService, PlacesService} from "../../services";
import mapboxgl, {Marker, Popup, Map} from "mapbox-gl";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, AfterViewInit{
    @ViewChild('mapDiv') mapDivElement!: ElementRef;
    constructor(
        private mapService: MapService,
        private placesServices: PlacesService
    ) { }
    ngOnInit(){
        console.log(this.placesServices.useLocation);
    }
    ngAfterViewInit(): void {
        if(!this.placesServices.useLocation) throw Error('No hay placesServices.userLocation');

        const map = new mapboxgl.Map({
            container   : this.mapDivElement.nativeElement,
            style       : 'mapbox://styles/mapbox/streets-v11',
            center      : this.placesServices.useLocation,
            zoom        : 20,
        })
        const popup = new Popup()
            .setHTML(`
                <h6>Aqui estoy </h6>
                <span>Estoy en este lugar del mundo</span>
            `)
        new Marker({ color: 'red'})
            .setLngLat(this.placesServices.useLocation)
            .setPopup( popup )
            .addTo( map )
        this.mapService.setMap( map );
    }
}
