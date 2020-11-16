import { FormControl } from '@angular/forms';

let numberFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formata(p: any, pAlign: string, pLista: Array<any>, tipo: string) {

    if (pLista) { pLista.filter(v => { if (v.codigo == p) p = v.descricao; return }) }

    if (pAlign == 'right') {
        if (!p) { p = 0 }
        if (tipo == "number") {
            return numberFormat.format(p);
        } else {
            return p;
        }
    }
    else {
        if (p == '') { p = '' }
        return p
    }
}

export function getMaxLength(control: FormControl) {
    if (!control.validator) {
        return null;
    }

    let bigString = "";
    for (let i = 0; i < 5002; i++) {
        bigString += "A";
    }

    let controlAux = new FormControl(bigString);
    let validator = control.validator(controlAux);

    if (validator && validator.maxlength) {
        return validator.maxlength.requiredLength;
    } else {
        return null
    }
}

/**
 * @description Função para verificiar se um objeto tem código
 * @param objeto Objeto para ser comparado. Será verificado se esse objeto tem o campo código 
 * @returns True caso o objeto ter código. False caso não tenha.
 */
export function temCodigo(objeto: any): boolean {
    if (objeto?.codigo) {
        return true;
    } else {
        return false
    }
}

/**
 * @description Copia profundamente o objeto, fazendo com que crie uma nova instância
 * @param object Envia o objeto para fazer uma cópia profunda sem instância
 * @returns Retorna um objeto com outra instância
 */
export function copy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
}

export function substract(number1: number, number2: number) {
    return toFixed((number1 - number2), 2)
}

/**
 *  @description Faz a aplicação dormir por um tempo determinado
 *  @param ms Milissegundos para pausar a aplicação
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @description Truca o valor para o número de casa pedido
 * @export
 * @param {*} num Número a ser truncado
 * @param {*} fixed Números a ficar após a virgula
 * @returns
 */
export function toFixed(num: number, fixed: number = 2) {
    if (num == null || num == undefined) return 0;

    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    num = Number(num.toFixed(fixed));
    let numero = num.toString().match(re)?.[0];
    let aux = numero ? parseFloat(numero) : 0;
    return parseFloat(aux.toFixed(fixed));
}

/**
 * @description Retorna o flat de um array
 * @export
 * @param {Array<any>} array Array que será realizado o flat
 * @returns
 */
export function flatArray(array: Array<any>): Array<any> {
    return [].concat.apply([], array);
}


/**
 * @description Faz o distinct do array
 * @export
 * @param {[]} array Array para efetuar o distinct
 * @param {string} campo nome do campo para fazer o distinct
 * @returns
 */
export function distinct(array: any[], campo: string[]) {
    return array.filter((element, i, arr) => {
        return arr.indexOf(arr.find(t => {
            let validado = true;
            for (let aux of campo) {
                validado = t[aux] === element[aux]
                if (!validado) break;
            }

            return validado
        })) === i;
    });
}

/**
 * @description Retorna o código do IBGE da UF indicada
 * @export
 * @param {string} uf
 * @returns
 */
export function getCodeUF(uf: string) {
    let listUf = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF', 'EX'];
    let listIbge = ['11', '12', '13', '14', '15', '16', '17', '21', '22', '23', '24', '25', '26', '27', '28', '29', '31', '32', '33', '35', '41', '42', '43', '50', '51', '52', '53', '00'];

    return listIbge[listUf.indexOf(uf)];
}

/**
 * @description Calcula o rateio de um valor
 * @export
 * @param {number} denominador Valor em porcentagem
 * @param {number} numerador Valor total
 * @param {boolean} [isTrunc=true] Caso true, irá truncar, caso false irá arredondar
 * @returns
 */
export function calcularRateio(numerador: number, denominador: number, isTrunc = true) {
    numerador = toNumber(numerador);
    denominador = toNumber(denominador);

    if (isTrunc) {
        return toFixed(denominador * 0.01 * numerador, 2);
    } else {
        return roundTo(denominador * 0.01 * numerador, 2);
    }
}

/**
 * @description Calcula o rateio de um valor
 * @export
 * @param {number} denominador Valor em porcentagem
 * @param {number} numerador Valor total
 * @returns
 */
export function dividir(numerador: number, denominador: number) {
    numerador = toNumber(numerador);
    denominador = toNumber(denominador);

    if (numerador == 0 || denominador == 0) {
        return 0;
    }

    return numerador / denominador;
}

/**
 * @description Arredenda o valor requerido
 * @export
 * @param {*} number Número a ser arredondado
 * @param {number} digits Digitos a ser contado após a virgula
 * @returns
 */
export function roundTo(number: any, digits: number) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (number < 0) {
        negative = true;
        number = number * -1;
    }
    var multiplicator = Math.pow(10, digits);
    number = parseFloat((number * multiplicator).toFixed(11));
    number = (Math.round(number) / multiplicator).toFixed(2);
    if (negative) {
        number = (number * -1).toFixed(2);
    }
    return number;
}

/**
 * @description Ordenação de arrays
 * @param list O array a ser passado
 * @param nameField O campo do array
 * @param order O número da ordenação: 1 - Crescente, -1 Decrescente
 * @param ignorarZeroNull Ignora o zero e o null da lista e insere eles ao final.
 * @returns Retorna o array ordernado
 */
export function toSort(list: any[], nameField: string, order: 1 | -1, ignorarZeroNull: boolean = false): Array<any> {
    return list.sort((a, b) => {
        if (isNaN(a[nameField])) {
            if (a[nameField].includes("/", 2) && a[nameField].includes("/", 4)) {
                let dataA = toDate(a[nameField]);
                let dataB = toDate(b[nameField]);

                if (dataA == dataB) { return 0 }
                if (dataA > dataB) { return 1 * order }
                if (dataA < dataB) { return -1 * order }
            }
        }

        if (ignorarZeroNull) {
            if (a[nameField] == 0 || !a[nameField] && a[nameField] == b[nameField]) { return 0 }
            if (a[nameField] == 0) {
                return 1;
            }
            if (b[nameField] == 0) {
                return -1;
            }
        }

        if (a[nameField] == b[nameField]) { return 0 }
        if (a[nameField] > b[nameField]) { return 1 * order }
        if (a[nameField] < b[nameField]) { return -1 * order }
    });
}

//Cronometro para o CRM, utilizado para contar quanto tempo gastou.
export function cronometro(horario?: string) {
    var s, m, h;
    let hora: string, minuto: string, segundo: string;

    if (horario) {
        let split = horario.split(":");
        [h, m, s] = [Number.parseInt(split[0]), Number.parseInt(split[1]), Number.parseInt(split[2])];
    } else {
        [h, m, s] = [0, 0, 0];
    }

    s++;
    if (s == 60) { m++; s = 0; }
    if (m == 60) { h++; s = 0; m = 0; }
    if (h < 10) hora = "0" + h; else hora = h;
    if (s < 10) segundo = "0" + s; else segundo = s;
    if (m < 10) minuto = "0" + m; else minuto = m;

    return hora + ":" + minuto + ":" + segundo;
}

/**
 * @description Função que pega uma string  "dd/mm/yyyy 00:00:00" e tranforma para Date
 * @param data "dd/mm/yyyy 00:00:00" - String
 * @return Irá retornar a data de hoje junto com o tempo enviado no fomato Date
 */
export function toDate(data: string) {
    let dataAux = new Date();

    let [dataSplit, tempoSplit] = data.split(" ");
    let [dia, mes, ano] = dataSplit.split("/")

    if (ano.length == 2) {
        ano = "20" + ano
    }

    if (tempoSplit) {
        let [hora, minuto, segundo] = tempoSplit.split(":");
        dataAux.setHours(Number.parseInt(hora));
        dataAux.setMinutes(Number.parseInt(minuto));
        dataAux.setSeconds(Number.parseInt(segundo));
    }

    dataAux.setDate(Number.parseInt(dia));
    dataAux.setMonth(Number.parseInt(mes) - 1);
    dataAux.setFullYear(Number.parseInt(ano));

    return dataAux;
}

/**
 * @description Função que pega uma string  "dd/mm/yy" e tranforma para string "dd/mm/yyyy"
 * @param data "dd/mm/yy" - String
 * @return Irá retornar a data de hoje enviado no fomato string "dd/mm/yyyy"
 */
export function toDate10String(data: string): string {
    let dataAux = new Date();

    let [dia, mes, ano] = data.split("/");

    dataAux.setDate(Number.parseInt(dia));
    dataAux.setMonth(Number.parseInt(mes));
    dataAux.setFullYear(Number.parseInt("20" + ano));

    return toLocaleDateString(dataAux);
}

/**
 * @description Função que pega uma string  "dd/mm/yyyy" e tranforma para string "dd/mm/yy"
 * @param data "dd/mm/yyyy" - String
 * @return Irá retornar a data de hoje enviado no fomato string "dd/mm/yy"
 */
export function toDate8String(data: string): string {
    if (!data) return null;

    let [dia, mes, ano] = data.split("/");

    return dia + "/" + mes + "/" + (ano.length > 2 ? ano.substring(2) : ano);
}

/**
 * @description Função que pega uma string  "dd/mm/yyyy HH:mm:ss" e tranforma para string "dd/mm/yy HH:mm:ss"
 * @param data "dd/mm/yyyy HH:mm:ss" - String
 * @return Irá retornar a data de hoje enviado no fomato string "dd/mm/yy HH:mm:ss"
 */
export function toDateTime8String(data: string): string {
    if (!data) return null;

    let [dataSplit, tempoSplit] = data.split(" ");
    let [dia, mes, ano] = dataSplit.split("/");

    return dia + "/" + mes + "/" + (ano.length > 2 ? ano.substring(2) : ano) + " " + tempoSplit;
}


/**
 * @description Retorna o tempo de uma string que está no formato: "DD/MM/YYYY HH:mm:ss" para "HH:mm:ss"
 * @export
 * @param {string} data
 * @returns {string} Retorna uma string "HH:mm:ss"
 */
export function dateTimeToTime(data: string): string {
    return data.split(" ")[1];
}

/**
 * @description Tem a função de padronizar os dados para lançar para a API
 * @export
 * @param {*} dados
 */
export function padronizarDadosAPI(dados: any) {
    for (let aux in dados) {
        if (dados?.[aux]?.codigo) {
            dados[aux] = dados[aux].codigo;
        } else if (dados[aux] && Array.isArray(dados[aux])) {
            for (let filho of dados[aux]) {
                for (let aux2 in filho) {
                    if (['atualizacaocheckout', 'dataversao'].includes(aux2)) filho[aux2] = toLocaleString(new Date());

                    if ("checkboxpetraweb" == aux2) delete (filho[aux2]);

                    if (filho?.[aux2]?.codigo) {
                        filho[aux2] = filho[aux2].codigo;
                    }
                }
            }
        }
    }

    return dados;
}

/**
  * @description Habilita ou desabilita o modo fullscreen
  */
export function telaCheia(document) {

    var el: any = document.documentElement,
        rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen,
        efs = (document as any).mozCancelFullScreen || (document as any).webkitExitFullscreen || (document as any).msExitFullscreen || document.exitFullscreen;

    if (document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement || null) {
        efs.call(document)
    } else {
        rfs.call(el);
    }
}

/**
 * @description Converte um number para o formato string de Currency
 * @param numero Número que será convertido para uma string de Moeda
 * @return Retorna no formato: "R$ 0,00"
 */
export function toCurrency(numero: number, prefixo = true): string {
    return prefixo ? numberFormat.format(numero).replace(/\u00a0/g, " ") : numberFormat.format(numero).replace("R$", "").trim()
}

/**
 * @description Converte um number para o formato string de porcento
 * @param numero Número que será convertido para uma string de porcento
 * @return Retorna no formato: "0,00 %"
 */
export function toPercent(numero: number): string {
    return numero.toString().replace(".", ",") + " %";
}

/**
 * @description Função que pega uma string de tempo "00:00:00" e tranforma para Date
 * @param tempo "00:00:00" - String
 * @return Irá retornar a data de hoje junto com o tempo enviado no fomato Date
 */
export function transformarTempo(tempo: string) {
    let data = new Date();

    if (tempo && tempo.split(":").length == 3) {
        let [hora, minuto, segundo] = tempo.split(":");

        data.setHours(Number.parseInt(hora));
        data.setMinutes(Number.parseInt(minuto));
        data.setSeconds(Number.parseInt(segundo));

        return data;
    } else {
        return null;
    }

}






/**
 * @description Função para converter uma string para a sua mascara
 * @export
 * @param {string} value Valor da String
 * @param {string} mask Mascara a ser colocada
 * @returns {string}
 */
export function toMask(value: string, mask: string): string {
    let retorno: string = value;

    for (let i = 0; i < retorno.length - 1; i++) {
        if (mask.charAt(i) != "0" && i < retorno.length) {
            retorno = [retorno.slice(0, i), mask.charAt(i), retorno.slice(i)].join('');
        }
    }

    return retorno;
}

/**
 * @description Retorna true se os arrays forem iguais
 * @export
 * @param {*} ary1 Primeiro array
 * @param {*} ary2 Segundo array
 * @returns
 */
export function arraysAreEqual(ary1: any[], ary2: any[]) {
    return (ary1.join(',') === ary2.join(','));
}

/**
 * @description Retorna true se os objetos forem iguais
 * @export
 * @param {*} objeto1 Primeiro objeto
 * @param {*} objeto2 Segundo objeto
 * @returns
 */
export function objectsAreEqual(objeto1: any[], objeto2: any[]) {
    return (JSON.stringify(objeto1) === JSON.stringify(objeto2));
}




/**
 * @description Função que pega uma Data e retorna uma data em formata "mm/dd/yyyy"
 * @param date Campo Date
 * @return Retorna a data no formato "mm/dd/yyyy"
 */
export function getDateUs(date: Date) {
    return (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + (date.getUTCDate()).toString().padStart(2, '0') + '/' + date.getUTCFullYear();
}

/**
 * @description Função que pega uma Data e retorna uma data em formata "mm/dd/yy"
 * @param date Campo em String no formado "dd/mm/yy"
 * @return Retorna a data no formato "mm/dd/yy"
 */
export function toDateUsa(date: string) {
    if (!date) return null;
    let data = date.split("/");
    return data[1] + "/" + data[0] + "/" + data[2];
}

export function getTabelaUrl(url: string) {
    if (url.split("/")[1] == "pess0000") {
        return "CLIE0000";
    }

    return url.split("/")[1].toUpperCase();
}

export function setParamRoute({ routerLink, params, outlet }: { routerLink: any, params: any, outlet: string }) {
    if (params) {
        routerLink[1].outlets[outlet] = routerLink[1].outlets[outlet].slice(0, 2);
        routerLink[1].outlets[outlet] = routerLink[1].outlets[outlet].concat(Object.values(params))
    }

    return routerLink;
}

export function validacaoEmail(field: any) {
    if (!isNaN(field))
        return false;

    let usuario = field.substring(0, field.indexOf("@"));
    let dominio = field.substring(field.indexOf("@") + 1, field.length);
    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {

        return true;
    }
    else {
        return false;
    }
}

/**
 * @description Função serve para transformar caracteres especiais em URI para que a requisição GET seja efetuada com sucesso.
 *  @param palavra palavra que será transformada em URI.  
 */
export function trocarCaracterEspecial(palavra: string) { return palavra ? encodeURIComponent(palavra) : "" }

export function isOdd(num: number) { return num % 2 }



export function getOptions(pOption: string) {
    let optionsSimNao: any = [{ codigo: "S", descricao: "SIM" }, { codigo: "N", descricao: "NÃO" }];
    if (pOption == 'optionsSimNao') { return optionsSimNao }
}


/**
 * @description Transforma uma String data dd/mm/yyyy para dd-mm-yyyy
 * @export
 * @param {string} date
 * @return {*} 
 */
export function toDateIso(date: string) {
    if (!date) return null;
    let split = date.split("/");
    split[2] = split[2].padStart(4, "20");
    split[0] = split[0].padStart(2, "0");

    return `${split[2]}-${split[1]}-${split[0]}`
}

/**
 * @description Transforma uma String data e hora dd/mm/yyyy hh:mm:ss para dd-mm-yyyy hh:mm:ss
 * @export
 * @param {string} date
 * @return {*} 
 */
export function toDateTimeIso(date: string) {
    if (!date) return null;
    let [auxDate, auxHour] = date.split(" ")
    let split = auxDate.split("/");
    split[2] = split[2].padStart(4, "20");
    split[0] = split[0].padStart(2, "0");

    return `${split[2]}-${split[1]}-${split[0]} ${auxHour}`
}

/**
 * @description Converte uam string para base64 no formato UTF-8
 * @export
 * @param {string} str
 * @returns
 */
export function toBase64(str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt('0x' + p1))
    }))
}


/**
 * @description Retorna o valor em formato number de uma string "1.500,00" para 1500.00
 * @export
 * @param {string} string String que virará number
 * @returns
 */
export function toNumber(string: string | number) {
    let auxNumber = typeof (string) == "string" ? parseFloat(string.replace(/\./g, "").replace(",", ".").replace("R$", "").replace("%", "").replace(/ /g, "")) : string;
    return auxNumber ? parseFloat(auxNumber.toFixed(10)) : 0;
}

/**
 * @description Converte um UTF-8 para base64
 * @export
 * @param {string} str
 * @returns
 */
export function decodeToString(str: any) {
    return decodeURIComponent(Array.prototype.map.call(decodeToString(str), function (c: { charCodeAt: (arg0: number) => { (): any; new(): any; toString: { (arg0: number): string; new(): any; }; }; }) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}


/**
 * @description Função que retorna o mês anterior
 * @export
 * @param {Date} data
 * @param {number} [diff=-1]
 * @returns
 */
export function mesAnterior(data: Date, diff: number = -1) {
    var dataCopiada = new Date(data.getTime());
    dataCopiada.setMonth(dataCopiada.getMonth() + diff);
    dataCopiada.setDate(1);
    return dataCopiada;
}

/**
 * @description Função que retorna os meses anteriores
 * @export
 * @param {Date} data Dia que você quer
 * @param {number} qtdMeses Quantidade de meses anteriores
 * @returns
 */
export function getUltimosMeses(data: Date, qtdMeses: number) {
    let datas: Array<Date> = [];
    for (let i = 1; i < (qtdMeses + 1); i++) {
        datas.push(mesAnterior(data, i * -1));
    }
    return datas;
}

/**
 * @description Retorna o maior valor
 * @export
 * @param {*} valor1
 * @param {*} valor2
 * @returns
 */
export function getMaior(valor1: any, valor2: any) {
    return valor1 > valor2 ? valor1 : valor2;
}

/**
 * @description Retorna se é maior
 * @export
 * @param {*} valor1
 * @param {*} valor2
 * @returns
 */
export function isMaiorDate8(valor1: string, valor2: string) {
    let split1 = valor1.slice(0, 8).split("/");
    let split2 = valor2.slice(0, 8).split("/");
    return new Date(`20${split1[2]}-${split1[1]}-${split1[0]}`) >= new Date(`20${split2[2]}-${split2[1]}-${split2[0]}`);

}

/**
 * @description Retorna a Data em Formato Extendido
 * @export
 * @param {string} date
 * @returns
 */
export function dateToExtentedDate(date: string) {
    const split = date.split("/")
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    return `${split[0]} de ${meses[Number(split[1]) - 1]} de ${split[2]}`
}

/**
 * @description Validação de Data
 * @export
 * @param {string} valor Data no formato dd/mm/yy
 * @returns Retorna True se não tiver erro.
 */
export function validarData(valor: string): boolean {
    var date = valor;
    var ardt = [];
    var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{2}");
    ardt = date.split("/");
    if (ardt.length == 3 && ardt[2].length == 2) ardt[2] = "20" + ardt[2];

    let erro = false;
    if (date.search(ExpReg) == -1) {
        erro = true;
    }
    else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30))
        erro = true;
    else if (ardt[1] == 2) {
        if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
            erro = true;
        if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
            erro = true;
    }
    if (erro) {
        return false;
    }
    return true;
}


/**
 * @description Separa um array a partir de vários separadores
 * @export
 * @param {string} source String que será feito o corte
 * @param {string} splitBy Separadores
 * @returns
 */
export function splitByString(source: string, splitBy: string) {
    var splitter: any = splitBy.split('');
    splitter.push([source]); //Push initial value

    return splitter.reduceRight((accumulator, curValue) => {
        var k = [];
        accumulator.forEach(v => k = [...k, ...v.split(curValue)]);
        return k;
    });
}

/**
 * @description Função que converte um numero de bytes para uma string de KB/MB/GB
 * @export
 * @param {number} bytes Bytes em Number
 * @param {number} [decimals=2] Decimais que irão retornar
 * @returns
 */
export function convertSizeBytes(bytes: number, decimals = 2) {
    if (bytes === 0 || bytes === undefined) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * @description Retorna por extendo a string do mes
 * @export
 * @param {number} month
 */
export function toExtensionMonth(month: number) {
    return ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][month]
}

export function toLocaleDateString(date: Date) {
    return date?.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })
}

export function toLocaleTimeString(date: Date) {
    return date?.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })

}

export function toLocaleString(date: Date) {
    return date?.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
}