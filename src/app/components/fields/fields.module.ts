import { registerLocaleData, CommonModule } from '@angular/common'; import { NgModule, LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from './input-field/input-field.module';
import { TextAreaModule } from './text-area/text-area.module';


registerLocaleData(ptBr, 'pt-BR')

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputFieldModule,
        TextAreaModule,
    ],

    exports: [

        InputFieldModule,

        TextAreaModule,
    ],

    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }]

})

export class FieldsModule { }

