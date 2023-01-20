import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1IjoidGF0dG9kZ20iLCJhIjoiY2xhcWJrbWdwMTF6ODNwbzlxN3ViM3hmcSJ9.Sepe_EYWxNSMmrFcGjow-A'

if(!navigator.geolocation) {
    alert('Navegadot no soporta la geolocation')
    throw new Error('Navegador no soporta la Geolocation')
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
