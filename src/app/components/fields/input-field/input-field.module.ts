import { CommonModule } from '@angular/common'; import { NgModule, LOCALE_ID } from '@angular/core';
import { InputFieldComponent } from './input-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextMaskModule } from 'angular2-text-mask';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IMaskModule } from 'angular-imask';

@NgModule({

    declarations: [
        InputFieldComponent,
    ],

    imports: [
        CommonModule,
        FormsModule,
        IMaskModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        ReactiveFormsModule,
        TextMaskModule,
    ],

    exports: [
        InputFieldComponent
    ]
})

export class InputFieldModule { }

