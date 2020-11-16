import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { BaseResourceModel } from 'src/app/comum/base-resource/base-resource.model';
import { getMaxLength } from 'src/app/comum/library';
import { CustomValidators } from 'src/app/misc/validators/validators';

@Component({
    selector: 'eInput',
    templateUrl: './input-field.html',
    styleUrls: ['./input-field.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class InputFieldComponent {

    /** @description Nome do Campo */
    @Input() field: string;

    /** @description Descrição do Label */
    @Input() label: string;

    /** @description MaxLength quando o campo é representação de Numero ele se torna o MAX, quando é string é o tamanho do campo */
    @Input() max: number = 99;

    /** @description Caso false, retira o prefixo do dinheiro */
    @Input() hasPrefix: boolean = true;

    /** @description Caso true, aceita valores negativos */
    @Input() isSigned: boolean = false;

    /** @description Precisão é a quantidade de 0 após a virgula, só funciona no tipo I */
    @Input() precisao: number;

    /** @description Control que contem o Reactive Forms do campo */
    @Input() control: FormControl;

    /** @description ID do campo */
    @Input() id: string;

    /** @description Lista para o autocomplete */
    @Input() listOptions: Array<any>

    /** @description Quando é definido um tipo, é setado o auxTipo para escolher a mascara do campo */
    @Input() set tipo(valor: string) {
        this.auxTipo = valor;
        if (this.control)
            this.escolherMascara()
    };

    /** @description Variavel auxiliar de Tipo para definir a mascara */
    auxTipo: string = "S";

    /** @description Mascara que será enviada para o input */
    mascara: any = { mask: false };

    /**@description Campo que define a mascara inicializada */
    valorMascara: string = "";

    //Type do input
    type: string = "text";

    /**@description Getter que retorna o erro para o tooltip */
    get erro() {
        if (this.control.invalid && this.control.enabled) {
            for (let nomeErro in this.control.errors) {
                this.auxErro = CustomValidators.getErrorMessage(this.label, nomeErro, this.control.errors[nomeErro]);
                return this.auxErro;
            }
        }
    }

    /** @description Variavel auxiliar, contem a string com o valor do erro */
    auxErro: string = "";

    /**@description Variavel que identifica se o campo é requerido ou não */
    requerido: boolean = false;

    /** @description Id do Cypress */
    cypress: string

    /**@description Instancia do tooltip */
    @ViewChild(MatTooltip, { static: true }) tooltip: MatTooltip;

    /**@description Instancia do Input */
    @ViewChild("inputField") input: ElementRef;

    ngOnInit() {
        this.cypress = this.label.replace(/[^\w]/gi, '')

        if (!this.control) {
            this.control = new FormControl({ value: null, disabled: true })
        }

        this.tooltip.disabled = true;

        if (this.control.validator) {
            const validator = this.control.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.requerido = true;
            }
        }

        //Mostra os erros em tooltip
        this.showTooltip();

        this.escolherMascara();
    }

    /**
     * @description Função auxiliar para escolher mascara pelo Tipo
     * @private
     */
    private escolherMascara() {
        switch (this.auxTipo) {
            case "T":
                this.mascara = BaseResourceModel.mascaraTempo();
                break;
            case "D":
                this.mascara = BaseResourceModel.mascaraData();
                break;
            case "D8":
                this.mascara = BaseResourceModel.mascaraData8();
                break;
            case "DH":
                this.mascara = BaseResourceModel.mascaraDataHora();
                break;
            case "CNPJ":
                this.mascara = BaseResourceModel.mascaraCNPJ();
                break;
            case "CPF":
                this.mascara = BaseResourceModel.mascaraCPF();
                break;
            case "C":
                this.mascara = BaseResourceModel.mascaraCodigo(getMaxLength(this.control));
                break;
            case "PW":
                this.type = "password";
                break;
            case "TEL":
                this.mascara = BaseResourceModel.mascaraTelefone();
                break;
            case "CEL":
                this.mascara = BaseResourceModel.mascaraCelular();
                break;
            case "CFOP":
                this.mascara = BaseResourceModel.mascaraCFOP();
                break;
            case "CEP":
                this.mascara = BaseResourceModel.mascaraCEP();
                break;
            case "C2":
                this.mascara = BaseResourceModel.mascaraCodigo(getMaxLength(this.control));
                this.mascara.guide = false;
                break;
            case "color":
                this.type = "color";
                break;
            default:
                this.mascara = BaseResourceModel.mascaraMaxLength(getMaxLength(this.control));
                this.type = "text";
                break;
        }

        if (this.mascara.mask && !["P", "N", "I", "S", "URL", "C2"].includes(this.auxTipo)) {
            this.mascara.guide = true; this.mascara.placeholderChar = "_"
        }
    }

    onTouchedCb() {
        if (["S", "M"].includes(this.auxTipo) && this.control.value && isNaN(this.control.value)) { this.control.setValue(this.control.value.toLocaleUpperCase(), { emitEvent: false }) };

        //Mostra os erros em tooltip
        this.showTooltip();

        this.control.markAsTouched();
    }

    /** @description Função auxiliar para mostrar o Tooltip quando houver erro */
    private showTooltip() {
        if (this.control.invalid && !this.tooltip._isTooltipVisible()) {
            this.tooltip.disabled = false;
            for (let nomeErro in this.control.errors) {
                this.auxErro = CustomValidators.getErrorMessage(this.label, nomeErro, this.control.errors[nomeErro]);
                break;
            }
            this.tooltip.show();
            setTimeout(() => { this.tooltip.hide() }, 2000);
        } else {
            this.tooltip.disabled = true;
        }
    }

    /**
     * @description Função para focar o Input
     */
    focarInput() {
        this.input.nativeElement.focus();
    }
}
