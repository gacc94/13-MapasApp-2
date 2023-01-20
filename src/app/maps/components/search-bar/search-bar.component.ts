import { Component } from '@angular/core';
import {PlacesService} from "../../services";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
    private _debounceTimer?: any;
    constructor(
        private placesService: PlacesService
    ) { }

    onQueryChanged(query: string = ''){
        if( this._debounceTimer) clearTimeout( this._debounceTimer);

        this._debounceTimer = setTimeout(()=>{
            this.placesService.getPlacesByQuery(query)
                // .subscribe({
                //     next: value => {
                //         console.log(value.features)
                //     }
                // })
        },500);

    }

}
