import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { getMaxLength } from 'src/app/comum/library';
import { CustomValidators } from 'src/app/misc/validators/validators';

@Component({
    selector: 'eTextArea',
    templateUrl: './text-area.html',
    styleUrls: ['./text-area.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TextAreaComponent {

    @Input() type = 'text';
    @Input() field: string;
    @Input() label: string;
    @Input() control: FormControl;
    @Input() id: string;
    @Input() small: string;

    /** @description Variavel que guarda se o text-area é uppercase ou não */
    @Input() isUppercase = true;

    /** @description Informa quantas linhas irá ter o text-area */
    @Input() linhas: number = 5;

    /**@description Instancia do tooltip */
    @ViewChild(MatTooltip, { static: true }) tooltip: MatTooltip;

    /**@description Instancia do Input */
    @ViewChild("textAreaField") textArea: ElementRef;

    /**@description Getter que retorna o erro para o tooltip */
    get erro() {
        if (this.control.invalid && this.control.enabled) {
            return this.auxErro;
        }
    }

    /** @description Variavel auxiliar, contem a string com o valor do erro */
    auxErro: string = "";

    /**@description Max Length do Text Area */
    maxLength: number = 5000;

    /** @description Id do Cypress */
    cypress: string

    /**@description Variavel que identifica se o campo é requerido ou não */
    requerido: boolean = false;

    constructor() { }

    ngOnInit() {
        this.cypress = this.label.replace(/[^\w]/gi, '')

        if (!this.control) {
            this.control = new FormControl({ value: null, disabled: true })
        }

        this.maxLength = getMaxLength(this.control);

        if (this.control.validator) {
            const validator = this.control.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.requerido = true;
            }
        }

        this.tooltip.disabled = true;
    }

    onTouchedCb() {
        if (this.isUppercase) {
            this.control.setValue(this.control.value ? this.control.value.toUpperCase() : "");
        }

        //Mostra os erros em tooltip
        if (this.control.invalid && !this.tooltip._isTooltipVisible()) {
            this.tooltip.disabled = false;
            this.tooltip.show();
            for (let nomeErro in this.control.errors) {
                this.auxErro = CustomValidators.getErrorMessage(this.label, nomeErro, this.control.errors[nomeErro]);
                break;
            }
            setTimeout(() => { this.tooltip.hide() }, 2000);
        } else {
            this.tooltip.disabled = true;
        }

        this.control.markAsTouched();
    }

    /**
     * @description Função para focar o Input
     */
    focarTextArea() {
        this.textArea.nativeElement.focus();
    }
}
