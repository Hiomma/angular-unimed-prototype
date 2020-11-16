import { AbstractControl, ValidatorFn } from '@angular/forms';
import { splitByString, toFixed, validarData } from 'src/app/comum/library';

export class CustomValidators {

    /** @description Timeout para dar debounce na requisição */
    private static timeoutCampoExistente: any;

    /**
     * @description Mostra as mensagens de acordo com o erro que é dado
     * @static
     * @param {string} fieldName Nome do Campo
     * @param {string} validatorName Nome da Validação
     * @param {*} [validatorValue] Valor da Validação
     * @returns
     */
    public static getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `Obrigatório.`,
            'bloqueado': 'Código bloqueado para alteração',
            'min': `O valor minimo é: ${validatorValue.min}`,
            'max': `O valor máximo é: ${validatorValue.max}`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cpfInvalido': "CPF inválido",
            'cnpjInvalido': "CNPJ inválido",
            'cepInvalido': 'CEP inválido.',
            'emailInvalido': 'Email já cadastrado!',
            'equalsTo': 'Campos não são iguais',
            'pattern': 'Campo inválido',
            'valor': "O valor está divergente com o total",
            "aAmortizarValor": "O Total deve bater com o valor a amortizar",
            'array': "A grid não pode estar vazio ou com valor divergente",
            'email': 'Email inválido',
            'existe': 'Valor utilizado em outro registro',
            'FKNotExiste': `${fieldName} inválido(a)`,
            "horaMenor": "A hora final não pode ser anterior a hora inicial!",
            "senhaDivergente": "As senhas estão divergentes!",
            "notZero": "O valor não pode ser zero",
            "mensagem": validatorValue,
            "umaLinha": "É necessário inserir ao menos uma linha na tabela"
        };

        return config[validatorName];
    }

    static validatorFk() {
        return (control: AbstractControl) => {
            if (!control.value || (control.value && typeof (control.value) == "object")) {
                return null
            } else {
                return { FKNotExiste: true }
            }
        }
    }



    static validatorCFOP(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control?.value) {
                let numeros: string = control.value.replace(/\_/g, "");

                if (numeros.length == 5 || numeros.length == 0) {
                    return null;
                } else {
                    return { pattern: true }
                }
            } else {
                return null;
            }
        }
    }

    static validatorHora(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control?.value) {
                let numeros: string = control.value.replace(/\:|_/g, "");

                if (numeros.length == 6 || numeros.length == 0) {
                    return null;
                } else {
                    return { pattern: true }
                }
            } else {
                if (control && control.value == "") {
                    setTimeout(() => control.setValue(null));
                }

                return null;
            }
        }
    }

    static validatorData(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control?.value) {

                let numeros: string = control.value.replace(/\/|_/g, "");

                if ((numeros.length == 8 || numeros.length == 0) && validarData(control.value)) {
                    return null;
                } else {
                    return { pattern: true }
                }
            } else {
                if (control && control.value == "") {
                    setTimeout(() => control.setValue(null));
                }
                return null;
            }
        }
    }

    static validatorData8(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control?.value) {
                let numeros: string = control.value.replace(/\/|_/g, "");
                if (numeros.length == 6 && validarData(control.value)) {
                    return null;
                } else {
                    return { pattern: true }
                }
            } else {
                if (control && control.value == "") {
                    setTimeout(() => control.setValue(null));
                }

                return null;
            }
        }
    }

    /** 
     * @description Só libera o campo quando ele for true;
    */
    static validatorBoolean(): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value == true ? null : { pattern: true };
        }
    }

    /** 
     * @description Só libera o campo quando ele for true;
    */
    static validatorURL(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            if (/([a-zA-Z]{3,}):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(control.value)) {
                return null;
            } else {
                return { pattern: true }
            }
        }
    }

    static validatorTelefone(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) return null;
            return control.value && control.value.indexOf("_") == -1 && control.value.length == 16 ? null : { pattern: true };
        }
    }

    static validatorCep(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) return null;
            return control.value && control.value.indexOf("_") == -1 && control.value.length == 10 ? null : { pattern: true };
        }
    }

    static validatorCelular(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) return null;
            return control.value && control.value.indexOf("_") == -1 && control.value.length == 17 ? null : { pattern: true };
        }
    }

    static validatorEmail(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) return null;

            for (let aux of splitByString(control.value, ";,")) {
                if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(aux)) {
                    continue;
                } else {
                    return { pattern: true }
                }
            }

            return null;
        }
    }

    static validatorConfirmarSenha(nomeCampo: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) return null;

            return control.value == control.root.get(nomeCampo).value ? null : { senhaDivergente: true };
        }
    }

    static validatorDataHora(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control?.value) {
                let numeros: string = control.value.replace(/\:|\/|_/g, "").replace(" ", "");

                if (numeros.length == 10 || numeros.length == 12 || numeros.length == 14) {
                    return null;
                } else {
                    return { pattern: true }
                }
            } else {
                if (control && control.value == "") {
                    setTimeout(() => control.setValue(null));
                }

                return null;
            }
        }
    }

    /**
     * @description Valida um campo customizado
     * @param campo Parametro trazido para fazer a comparação e retornar o erro de bloqueado
     */
    static validatorCampo(campo: { campo: string, value: string }): ValidatorFn {
        return (control: AbstractControl) => {
            if (control.value && control.root.get(campo.campo)) {
                if (control.root.get(campo.campo).value == campo.value) {
                    return { bloqueado: true };
                } else {
                    return null;
                }
            } else {
                return null
            }
        }
    }

    /**
     * @description Valida Inscrição Estadual
    */
    static validatorInscricaoEstadual(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control?.value) {
                if (control.value == "ISENTO") {
                    return null;
                } else {
                    let value = control.value.replace(/\.|\/|\-/g, "");

                    if (/\D/.test(value)) {
                        return { "pattern": true }
                    } else {
                        return null;
                    }
                }
            } else {
                return null
            }
        }
    }

    static validatorCpf(cpfZerado?: boolean): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value || !control.value.replace(/[^\d]+/g, '')) return null;
            let cpf = control.value.replace(/[^\d]+/g, '');
            if (cpfZerado && cpf == "00000000000") { return null }
            // Elimina CPFs invalidos conhecidos	
            if (cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999")
                return { cpfInvalido: true };
            // Valida 1o digito	
            let add = 0;
            for (let i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            let rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return { cpfInvalido: true };
            // Valida 2o digito	
            add = 0;
            for (let i = 0; i < 10; i++)
                add += parseInt(cpf.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(10)))
                return { cpfInvalido: true };
            return null;
        }
    }

    static validatorCnpj(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            let cnpj = control.value.replace(/[^\d]+/g, '');

            if (cnpj == '') return { cnpjInvalido: true };


            if (cnpj.length != 14)
                return { cnpjInvalido: true };

            if (cnpj.indexOf("11111111") > -1 || cnpj.indexOf("0000000") > -1) {
                return null;
            }

            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999")
                return { cnpjInvalido: true };

            // Valida DVs
            let tamanho: number = cnpj.length - 2
            let numeros = cnpj.substring(0, tamanho);
            let digitos = cnpj.substring(tamanho);
            let soma: number = 0;
            let pos = tamanho - 7;
            for (let i: number = tamanho; i >= 1; i--) {
                soma += Number.parseFloat(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2)
                    pos = 9;
            }

            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != Number.parseFloat(digitos.charAt(0)))
                return { cnpjInvalido: true };

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--) {
                soma += Number.parseFloat(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != Number.parseFloat(digitos.charAt(1)))
                return { cnpjInvalido: true };

            return null;
        }
    }
}