import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    Component,
    ViewChild
} from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from './misc/sidenav.service';

@Component({
    selector: 'app-root',

    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /** @description Menu lateral */
    @ViewChild(MatSidenavContent, { static: true }) matContent: MatSidenavContent;

    constructor(private sideNav: SidenavService,
        private http: HttpClient,
    ) {
    }

    async ngOnInit() {
        this.sideNav.setMatContent(this.matContent);
        let final = []

        for (let i = 98; i < 150; i++) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer 915P4Rx-zRmU59yg5JCO9O-aAnxE0WLsqqQeXfzUJdzYR9EvrOL1MEgN6Bjyxzig_YiFFtaknbIzYkq519_adM6GVk6mfTngc8tpb5zb4wnSikdWkwMWJASQFTGJOKSxZ8fsvEJYPDbAVww9hNT6_sOBhmHvLguNGb4ekEIZkbdCp7I7YFk8JVv5G5FhJNawJF19jMPN3-4AFGhTAA1Ud7srxe03becWi27fzSR192qqfdMJuKOlIFytJS9r1ZjEvqKouUu8eiqk3pMpr7-J6X_1fQmC_fUBSot-aYduA0Iwst2o1vKxFuMBk4ShbzpjIOD0eeDwnBlX4_uG3fuMt2LNZdB8_ag8PFwyNqspixNRstk_GrhVMJbt8plhpAbnkFu4dAkXBFghSEPXVdGQ5z3bNQHVLuSIuHBGpg8TqARJi38mNc7yudhZvIbPZc2YDV0cwcNMIVjd0gUyZHb00aS1o-fk9bSz9Y7BfXwXJWGun6-HUR8AEJuPVifC55hN9C49O7IdgHDM4byXMoj3BzVRJ7gM_VIIcEmWRfgA-DuJ6vFji8oqu96xbyAIXq7JVDjWLCcImXPdMrY0owhFSU8BNjk_dZ370ktAFUxQZPYaFY5Spj7OSf-FtvVJnqTy9fasjz4TQJSE6QCi3Rt38uEnl0R_AsmiDnBGiNQuz-67Ijmg5h2PU8I2_S_hqxEsdY5CPD3W8rqLl_xDip5e1jG3hRDv_bAlvX0JdzD4JCVTqFwbx4oX_Vi_fnJA2bpcbj1-lkVaTsjAcdnuwKJLtpTPY7mPcLlEKoHtawIAYKdnKWndO1KqWlRz8kTqun5TU1OrZl9X-9-xSCb1wE5fPyjpWXywcr7Xvag8I_YtiQ7uzvWv2heCs8qh6m_N1AwcUxcjMdmSbjGyU3ZqHWmaC8IC6zz4inQmKzg9H6Lww3Sv8yuMMH3D4_gbwhiONE6BmhMaSAb2KOrvnVpT3WAd138gXe1rForinxkMP3KmlMw`
            })

            const response = await this.http.post("https://ww3.martins.com.br/vendasnet/api/Produtos/Cliente/4046001/ModeloDistribuicao/-2/CondicaoPagamento/1679",
                {
                    "nmFilialField": "1 -> MARTINS-UBERLANDIA MATRIZ - 1 -> MARTINS-UBERLANDIA M",
                    "DsMercadoriaField": "",
                    "nrContadorInicialField": (i * 10),
                    "nrContadorFimField": 10,
                    "cdOperadorTMKRCAField": "63018",
                    "codGrpMerField": "4",
                    "cdFornecedorField": 0,
                    "cdBeneficioField": 0,
                    "qtdeItensField": 0,
                    "vlrDescFlexField": 0,
                    "tpClienteBaseInativaField": 0,
                    "indicaPrePedidoField": false
                }, { headers: headers }).toPromise() as any


            final.push(...response.lstProdutoField.map(element => {
                return {
                    codigo: element.codMerField,
                    valor: element.vlrUntStbCxaSemQdeField,
                    nome: element.desCplMerField
                }
            }))

            console.log(final, final.filter((v, i, a) => a.indexOf(v) === i))
        }
    }
}
