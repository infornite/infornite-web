import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {HighlightModule} from "ngx-highlightjs";

import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { PipesModule } from './pipes/pipe.module'
import { RtlSupportDirective } from './rtl-support/rtl-support.directive';
import { FlexLayoutModule } from '@angular/flex-layout';

import * as sharedComponents from './components';

@NgModule({
    imports: [
        HighlightModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        MatTreeModule,
        MatSortModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatRippleModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatChipsModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatToolbarModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatStepperModule,
        FlexLayoutModule,
        PipesModule,
    ],
    declarations: [
        RtlSupportDirective,
        sharedComponents.components,
    ],
    exports: [
        sharedComponents.components,
        HighlightModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatMenuModule,
        MatTabsModule,
        MatTableModule,
        MatTreeModule,
        MatSortModule,
        MatChipsModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatRippleModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatSliderModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatStepperModule,
        FlexLayoutModule,
        PipesModule,
    ]
})
export class SharedModule {
    constructor() {
    }
}