import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { authLogout } from '@core/core.module'
import { IUser } from './user'
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'n4-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  user$: IUser;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private store: Store
  ) { }
  
  ngOnInit(): void {
    this.auth.getAccessTokenSilently()
    //this.user$ = this.auth.getUser$()

    /*
    this.auth.getUser$().subscribe((user: IUser) => {
      this.user$  = user
    })
 */
  }
 

  logout() {
    this.auth.logout()
    
  }

  formatNumberWithMetricPrefix(num, digits = 1) {
    const si = [
      { value: 1e18, symbol: 'E' },
      { value: 1e15, symbol: 'P' },
      { value: 1e12, symbol: 'T' },
      { value: 1e9, symbol: 'G' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'k' },
      { value: 0, symbol: '' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    function divideNum(divider) {
      return (num / (divider || 1)).toFixed(digits);
    }

    let i = si.findIndex(({ value }) => num >= value);
    if (+divideNum(si[i].value) >= 1e3 && si[i - 1]) {
      i -= 1;
    }
    const { value, symbol } = si[i];
    return divideNum(value).replace(rx, '$1') + symbol;
  }

  beautify = n => ((Math.log10(n) / 3 | 0) == 0) ? n : Number((n / Math.pow(10, (Math.log10(n) / 3 | 0) * 3)).toFixed(1)) + ["", "K", "M", "B", "T",][Math.log10(n) / 3 | 0];


}
