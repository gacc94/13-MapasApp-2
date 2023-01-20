import { Injectable } from '@angular/core';
import Mapboxgl, {AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup} from "mapbox-gl";
import {Feature} from "../interfaces/places.interface";
import {DirectionApiClient} from "../api/directionApiClient";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MapService {

    private _map?: Map;
    private _markers: Array<Marker> = [];
    get isMapReady(){
        return !!this._map;
    }
    constructor(
        private directionsApi: DirectionApiClient,
    ) { }
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
    createMarkersFromPlaces( places: Array<Feature>, userLocation: [number, number] ){
        if( !this._map) throw Error('Mapa no inicalizado');

        this._markers.forEach( marker => marker.remove() );
        const newMarkers = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                        <h6>${ place.text }</h6>
                        <span> ${ place.place_name }</span>
                    `);
            const newMarker = new Marker()
                .setLngLat([lng, lat])
                .setPopup( popup )
                .addTo( this._map);
            newMarkers.push( newMarker);

        }
        this._markers = newMarkers;
        if( places.length === 0 ) return;

        // Limites del mapa
        const bounds = new LngLatBounds(
            this._markers[0].getLngLat(),
            this._markers[0].getLngLat(),
        );
        newMarkers.forEach( marker => bounds.extend( marker.getLngLat() ) );
        bounds.extend( userLocation );
        this._map.fitBounds(bounds, {
            padding: 200
        })
    }
    getRouteBetweenPoints(start: [number, number], end: [number, number]){

        this.directionsApi.get<any>(`/${start.join(',')};${end.join(',')}`)
            .subscribe( resp => this.drawPolyline( resp.route[0] ));
    }
    private drawPolyline(route: any) {

        console.log({kms: route.distance / 1000, duration: route.duration / 60});

        if(!this._map) throw Error('Mapa no inicialñizado');
        const coords = route.geometry.coordinates;

        const bounds = new LngLatBounds();
        coords.forEach((coord: any)=> bounds.extend(coord))


        this._map?.fitBounds( bounds, {
            padding: 200,
        })

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords,
                        }
                    }
                ]
            }
        }

        if( !this._map.getLayer('RouteString')){
            this._map.removeLayer('RouteString')
            this._map.removeSource('RouteString')
        }

        this._map.addSource('RouteString', sourceData);
        this._map.addLayer({
            id: "RouteString",
            source: 'RouteString',
            layout: {
                "line-cap": 'round',
                "line-join": 'round'
            },
            paint: {
                "line-color": 'blanck',
                "line-width": 3,
            },
            type: 'line',
        })
    }
}













