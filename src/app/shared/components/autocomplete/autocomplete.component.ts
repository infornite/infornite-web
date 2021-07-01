import { Component, OnInit, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, tap, switchMap, finalize, filter, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'in4-ac',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  acIsLoading = false;
  facets: any;
  private readonly unsubscribe = new Subject<void>();
  
  constructor() { }

  ngOnInit(): void {

  }

  getFacet(option) {
    return option ? option.name + " - " + option.type : '';
  }

  get edgeTailFacetControl() {
    //return this.connectionsFormGroup.get('connectionDetails.edgeTailFacet')
  }

  assignEdgeTailAutocomplete() {
    this.edgeTailFacetControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((value) => {
          if (!value || value.length < 2) {
            this.facets = []
          }
        }),
        filter(value => value && value.length >= 2),
        debounceTime(100),
        tap(() => {
          this.facets = [];
          this.acIsLoading = true;
        }),
        switchMap(value => this.svcGetFacetService.getFacetStub(null, ".*" + value + ".*", this.facetLabel == this.edgeTypeControl.value.headFacetLabel ? this.edgeTypeControl.value.tailFacetLabel : this.edgeTypeControl.value.headFacetLabel, null))
      )//.pipe(take(1),)
      .subscribe(({ data, loading, errors }) => {
        this.acIsLoading = loading;
        if (data == undefined || errors) {
          this.facets = [];
        } else {
          this.facets = data['FacetStub'];
        }
      });
  }


}
