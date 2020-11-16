import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { FieldsModule } from '../components/fields/fields.module';
import { HomeMobile } from './home-mobile.component';
import { Home } from './home.component';

const homeRoutes: Routes = [
    { path: '', component: Home },
];
@NgModule({
    declarations:
        [Home,
            HomeMobile],
    imports: [
        CommonModule,

        FlexLayoutModule,
        RouterModule.forChild(homeRoutes),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FieldsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})



export class HomeModule { }
