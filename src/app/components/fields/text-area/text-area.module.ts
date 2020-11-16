import { CommonModule } from '@angular/common'; import { NgModule, LOCALE_ID } from '@angular/core';
import { TextAreaComponent } from './text-area';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({

    declarations: [
        TextAreaComponent
    ],

    imports: [
        CommonModule,
        MatInputModule,
        MatTooltipModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],

    exports: [
        TextAreaComponent
    ],

    entryComponents: [
        TextAreaComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }]

})

export class TextAreaModule { }

