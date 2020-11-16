import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export abstract class BaseResourceModel {
    codigo: string;
    public static nomeTabela: string;

    public static toStringify(objeto: any): string {
        return JSON.stringify(objeto);
    }

    /**
     * @description Retorna o modificador completoo para Sim e não
     * @static
     * @param {string} field Campo que está na linha
     * @returns
     */
    public static getModificadorSimNao(field: string) {
        let modificadorCorSimNao = (linha: any, campo: string) => {
            campo = campo.toLocaleLowerCase();
            if (linha[campo] == "SIM" || linha[campo] == "S") {
                return { background: "seagreen" }
            } else {
                return { background: "#FF4D4F" }
            }
        }

        let exhibitionFunction = (linha: any, campo: string) => {
            campo = campo.toLocaleLowerCase();
            if (linha[campo] == "S") {
                return "SIM";
            } else if (linha[campo] == "N") {
                return "NÃO";
            } else {
                return linha[campo];
            }
        }

        return {
            type: "chip", field, styleFunction: modificadorCorSimNao, exhibitionFunction: exhibitionFunction
        }
    }

    /**
     * @description Retorna um modificador generico de Exhibition
     * @static
     * @param {string} field Campo que está na linha
     * @returns
     */
    public static getExhibitionModificador(field: string) {
        field = field.toLocaleLowerCase();

        return (linha: any) => {
            return linha[field];
        }
    }

    /**
    * @description Retorna o valor em string da PK
    * @param dado Dados com as informações da linha selecionada do BaseFormConsulta
    */
    public getStringPks(dado: any): any {
        return { codigo: dado.codigo };
    }

    abstract getIdSql(): Array<number>;
    /**
     * @description Resgata o nome da tabela do Model
     * @param nomeComponente No Resolver é necessário passar o nome do componente quando é utilizado uma única tela para duas tabelas, ex: RECE e FINA.
     */
    abstract getTabelaBanco(nomeComponente?): string;
    abstract getNome(): string;
    abstract tabelasPesquisas(): Array<string>



    ///////////////////////////////////////////////////// Mascaras //////////////////////////////////////////////////////////
    public static mascaraTempo(): any {
        return {
            mask: [/\d/, /\d/, ':', /\d/, /\d/, ":", /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('HH:MM:SS')
        };
    }

    public static mascaraData(): any {
        return {
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('dd/mm/yyyy')
        };
    }

    public static mascaraData8(): any {
        return {
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('dd/mm/yy')
        };
    }






    public static mascaraDataHora(): any {
        return {
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/],
            pipe: createAutoCorrectedDatePipe('dd/mm/yy HH:MM')
        };
    }

    public static mascaraCNPJ(): any {
        return {
            mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/],
        }
    }

    public static mascaraCPF(): any {
        return {
            mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        }
    }

    public static mascaraTelefone(): any {
        return {
            mask: ["(", /\d/, "X", "X", /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        }
    }

    public static mascaraCelular(): any {
        return {
            mask: ["(", /\d/, "X", "X", /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        }
    }

    public static mascaraCEP(): any {
        return {
            mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
        }
    }

    public static mascaraCodigo(length: number = 10): any {
        let mascara = [];

        for (let i = 0; i < length; i++) { mascara.push(/\d/) }

        return { mask: mascara };
    }

    /**
     * @description Faz a mascara para aceitar somentes letras minusculas e maiusculas
     * @param maxLength MaxLength para o campo
     */
    public static mascaraLetras(maxLength: number = 30): any {
        let mascara = `^([a-z]|[A-Z]|[\u00C0-\u00FF ]){1,${maxLength}}$`;
        return { mask: new RegExp(mascara, "g") }
    }

    /**
     * @description Faz a mascara para aceitar tudo, entretanto limitar os campos
     * @param maxLength MaxLength para o campo
     */
    public static mascaraMaxLength(maxLength: number = 30): any {
        let mascara = [];

        for (let i = 0; i < maxLength; i++) { mascara.push(/./) }

        return { mask: mascara, guide: false };
    }


    /**
     * @description Faz a mascara para aceitar números e letras
     * @param maxLength MaxLength para o campo
     * @param regex Caso true, retorna o regex, caso false retorna o string
     */
    public static mascaraNumerosLetras(maxLength: number = 30, regex: boolean = false): any {
        let mascara = `^([a-z]|[A-Z]|[\u00C0-\u00FF ]|[0-9]|_|-){1,${maxLength}}$`;
        if (regex) {
            return { mask: /^([a-z]|[A-Z]|[0-9]|_|-){1,99}$/g }
        } else {
            return { mask: new RegExp(mascara, "g") }
        }
    }

    /**
     * @description Faz a mascara aceitar números e caracteres de Data, Hora e Moeda
     * @param maxLength MaxLength para o campo
     * @param regex Caso true, retorna o regex, caso false retorna o string
     */
    public static mascaraNumeroEspecial(regex: boolean = false, maxLength: number = 30): any {
        let mascara = `^([0-9]|\\.|,|:|\\/){1,${maxLength}}$`;
        if (regex) {
            return { mask: /^([0-9]|\.|,|:|\/)*$/g }
        } else {
            return { mask: new RegExp(mascara, "g") }
        }
    }

    public static mascaraDinheiroTabela(isNegativo: boolean = false, precisao: number = 2) {
        return createNumberMask({
            prefix: '',
            allowNegative: isNegativo,
            allowDecimal: true,
            decimalLimit: precisao,
            integerLimit: 15,
            requireDecimal: true,
            thousandsSeparatorSymbol: ".",
            decimalSymbol: ","
        })
    }

    public static mascaraPorcentagemTabela() {
        return createNumberMask({
            prefix: '',
            allowDecimal: true,
            decimalLimit: 2,
            integerLimit: 3,
            requireDecimal: true,
            thousandsSeparatorSymbol: ".",
            decimalSymbol: ","
        })
    }

    public static mascaraDataTabela() {
        return createAutoCorrectedDatePipe('dd/mm/yy');
    }

    public static mascaraInteiroTabela(precisao: number = 0) {
        return createNumberMask({
            prefix: '',
            allowDecimal: precisao == 0 ? false : true,
            decimalLimit: precisao,
            integerLimit: 15,
            requireDecimal: precisao == 0 ? false : true,
            thousandsSeparatorSymbol: ".",
            decimalSymbol: ","
        })
    }

    public static mascaraSemCaracterEspecialTabela(lenght: number = 30): any {
        let mascara = [];
        for (let i = 0; i < lenght; i++) { mascara.push(/^[a-zA-Z\u00C0-\u00FF0-9 ]*$/) }
        return { mask: mascara };
    }

    public static mascaraMaxLengthTabela(lenght: number = 30): any {
        let mascara = [];
        for (let i = 0; i < lenght; i++) { mascara.push(/./) }
        return { mask: mascara };
    }


    /**
     * @description Mascara de Números em formato de string para tabela
     * @static
     * @param {number} [lenght=30]
     * @returns {*}
     */
    public static mascaraNumeroTabela(lenght: number = 30): any {
        let mascara = [];
        for (let i = 0; i < lenght; i++) { mascara.push(/[0-9]/) }
        return { mask: mascara };
    }

    public static mascaraNumerosString(lenght: number = 30): any {
        let mascara = [];
        for (let i = 0; i < lenght; i++) { mascara.push(/\d/) }
        return { mask: mascara };
    }

    /**
     * @description Mascara de CFOP
     * @static
     * @returns {*}
     */
    public static mascaraCFOP(): any {
        return { mask: [/\d/, '.', /\d/, /\d/, /\d/] };
    }
}