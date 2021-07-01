import {
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector
  } from '@ngrx/store';
  import { routerReducer, RouterReducerState } from '@ngrx/router-store';
  import { createSelector } from '@ngrx/store';
  //import * as fromRouter from '@ngrx/router-store'; //MOS
  import { environment } from '../../environments/environment';
  
  import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
  import { debug } from './meta-reducers/debug.reducer';
  //import { AuthState } from './auth/auth.models';
  //import { authReducer } from './auth/auth.reducer';
  import { RouterStateUrl } from './router/router.state';
  import { settingsReducer } from './settings/settings.reducer';
  import { SettingsState } from './settings/settings.model';
  
  export const reducers: ActionReducerMap<AppState> = {
    //auth: authReducer,
    settings: settingsReducer,
    router: routerReducer
  };
  
  export const metaReducers: MetaReducer<AppState>[] = [
    initStateFromLocalStorage
  ];
  
  if (!environment.production) {
    if (!environment.test) {
      metaReducers.unshift(debug);
    }
  }
  /*
  export const selectAuthState = createFeatureSelector<AppState, AuthState>(
    'auth'
  );
  */
 
  export const selectSettingsState = createFeatureSelector<
    AppState,
    SettingsState
  >('settings');
  
  export const selectRouterState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
  >('router');

  export const selectRouterUrl = createSelector(
    selectRouterState,
    (state: RouterReducerState<RouterStateUrl>) => state.state.url,
  );
  
  export interface AppState {
    //auth: AuthState;
    settings: SettingsState;
    router: RouterReducerState<RouterStateUrl>;
  }
//MOS
/*
export const {
  selectCurrentRoute,   // select the current route
  selectFragment,       // select the current route fragment
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouterState);
*/