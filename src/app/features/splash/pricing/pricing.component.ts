import { Component, OnInit } from '@angular/core';

declare const Calendly: any;

@Component({
  selector: 'in4-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['../splash.component.scss'],
})
export class PricingComponent implements OnInit {

  customise: boolean = false;
  selectedUserCount: number = 500000;

  constructor(

  ) { }

  ngOnInit(): void {

  }
  toggleCustomise() {
    this.customise = !this.customise
  }

  currencyRate = 1;
  currencyValue = "AUD"

  price = [{
    name: "Essentials",
    blurb: "Create a common understanding of key business terms, metrics and reports across your business.",
    basePrice: 5000,
    currentPrice: 5000,
    features: [
      "Business Glossary",
      "Report Catalogue",
      "Systems Inventory",
    ],
    featureSpacer: [
      "1",
    ],
    baseStewards: 2,
    origStewards: 2,
    baseViewers: 10,
    origViewers: 10,
    baseFacets: 1000,
    origFacets: 1000,
    baseHours: 2,
    origHours: 2,
    plusSteward: 500,
    plusViewer: 100,
    plusFacet: 0.5,
    plusHour: 250,
    maxHours: 5,
    facetFactor: 500,
    hourFactor: 1,

  },
  {
    name: "Standard",
    blurb: "Help your teams to access the information they need whilst applying best practice data governance capabilities.",
    basePrice: 15000,
    currentPrice: 15000,
    features: [
      "All Essential features",
      "Data Dictionary",
      "Data Controls",
      "Diagrams",
    ],
    baseStewards: 6,
    origStewards: 6,
    baseViewers: 30,
    origViewers: 30,
    baseFacets: 40000,
    origFacets: 40000,
    baseHours: 5,
    origHours: 5,
    plusSteward: 500,
    plusViewer: 100,
    plusFacet: 0.2,
    plusHour: 200,
    maxHours: 300,
    facetFactor: 10000,
    hourFactor: 5,
  },
  {
    name: "Complete",
    blurb: "Manage your data landscape from end to end and build processes to keep your data safe and secure.",
    basePrice: 25000,
    currentPrice: 25000,
    features: [
      "All Standard features",
      "Data Flows & Data Lineage",
      "Project & Privacy Assessments",
      "Data Issue Management",
    ],
    baseStewards: 15,
    origStewards: 15,
    baseViewers: 75,
    origViewers: 75,
    baseFacets: 150000,
    origFacets: 150000,
    baseHours: 10,
    origHours: 10,
    plusSteward: 500,
    plusViewer: 100,
    plusFacet: 0.05,
    plusHour: 175,
    maxHours: 300,
    facetFactor: 50000,
    hourFactor: 5,
  }]

  setPrice(name, factor, value) {
    this.price.forEach((item, index) => {
      if (item.name == name) {

        switch (factor) {
          case 'steward': {
            if ((item.baseStewards + value) < item.origStewards) {
              break
            }
            else {
              item.basePrice = item.basePrice + (item.plusSteward * value)
              item.baseStewards = item.baseStewards + value
            }
            break;
          }
          case 'contributor': {
            if ((item.baseViewers + value) < item.origViewers) {
              break
            }
            else {
              item.basePrice = item.basePrice + (item.plusViewer * value)
              item.baseViewers = item.baseViewers + value
            }
            break;
          }
          case 'facet': {
            if ((item.baseFacets + (value * item.facetFactor)) < item.origFacets) {
              break
            }
            else {
              item.basePrice = item.basePrice + (item.plusFacet * (value * item.facetFactor))
              item.baseFacets = item.baseFacets + (value * item.facetFactor)
            }
            break;
          }
          case 'hour': {
            
            if (((item.baseHours + (value * item.hourFactor)) < item.origHours) || ((item.baseHours + (value * item.hourFactor)) > item.maxHours)) {

              console.log((item.baseHours + (value * item.hourFactor)))
              console.log(item.maxHours)
              console.log(((item.baseHours + (value * item.hourFactor)) > item.maxHours))
              break
            }
            else {
              item.basePrice = item.basePrice + (item.plusHour * (value * item.hourFactor))
              item.baseHours = item.baseHours + (value * item.hourFactor)
            }
            break;
          }

        }
      }
    })

  }

  changeCurrency(value) {
    switch (value.value) {
      case 'AUD': {
        this.currencyRate = 1;
        this.currencyValue = "AUD"
        break;
      }
      case 'USD': {
        this.currencyRate = 0.8;
        this.currencyValue = "USD"
        break;
      }
      case 'EUR': {
        this.currencyRate = 0.70;
        this.currencyValue = "EUR"
        break;
      }
      case 'GBP': {
        this.currencyRate = 0.60;
        this.currencyValue = "GBP"
        break;
      }
      case 'SGD': {
        this.currencyRate = 1.05;
        this.currencyValue = "SGD"
        break;
      }
    }
  }
}