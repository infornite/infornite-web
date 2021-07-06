import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FacetStubGQL } from '@app/graphql/schema'

import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'in4-ac',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('input') inputElement: ElementRef;
  acIsLoading = false;
  facets: any;


    //Search
  
    searchPlaceholder: String = ""
    acSearchIsLoading = false;
    acSearchFilteredFacets: any;
  
    searchVisible = false;
  
    searchForm = new FormGroup({
      searchInput: new FormControl('',),
  
    });

  constructor(
    private facetStubGQL: FacetStubGQL,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.acSearchAssign()
  }

  get searchInput() { return this.searchForm.get('searchInput') }

  acSearchAssign() {
    this.searchInput.valueChanges
      .pipe(
        tap((value) => {
          if (!value || value.length < 3) {
            this.acSearchFilteredFacets = []
          }
        }),
        filter(value => value && value.length >= 3),
        debounceTime(500),
        tap(() => {
          this.acSearchFilteredFacets = [];
          this.acSearchIsLoading = true;
        }),
        switchMap(value =>
          this.facetStubGQL.fetch({
            filter: {
              name: value,
              type: []
            }
          })
            .pipe(
              finalize(() => {
                this.acSearchIsLoading = false
              }),
            )
        )
      )
      .subscribe(data => {
        data
        console.log(data['data']['FacetStub'])
        if (data['data']['FacetStub'] == undefined) {
          this.acSearchFilteredFacets = [];
        } else {
          this.acSearchFilteredFacets = data['data']['FacetStub'];
        }
      });
  }
  getACDisplayValue(option) {
    return option ? option.name : '';
  }

  ngOnDestroy() {
    //this.unsubscribe.next()
    //this.unsubscribe.complete()
  }

  search() {
    if (this.searchVisible && this.searchInput.value.length > 3) {
      this.router.navigate(['/discover', this.searchInput.value])
      this.searchForm.get('searchInput').setValue("")
      this.searchVisible = false;
    }
    else {
      this.searchVisible = !this.searchVisible
      this.inputElement.nativeElement.focus();
    }
  }

  acItemSelected(id, name, type) {

    if (this.router.url.includes('explore')) {
      this.router.navigate(['/explore', id])
      this.searchForm.get('searchInput').setValue("")
      this.searchVisible = false;
    }
    else {
      this.router.navigate(['/view', id])
      this.searchForm.get('searchInput').setValue("")
      this.searchVisible = false;
    }
  }

  searchFocusOut() {
    if (this.searchVisible && this.searchInput.value.length == 0) {
      this.searchVisible = false
    }

  }
}
