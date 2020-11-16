import { Injectable } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';


@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    private _matContent: MatSidenavContent;
    private sidenav: MatSidenav;

    /** @description Seta o sidenav */
    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    /** @description Abre o sidenav */
    public open() {
        return this.sidenav.open();
    }

    /** @description Fecha o sidenav */
    public close() {
        return this.sidenav.close();
    }

    /** @description Fecha/abre o sidenav */
    public toggle(): void {
        this.sidenav.toggle();
    }

    /** @description Seta o sidenav */
    public setMatContent(matContent: MatSidenavContent) {
        this._matContent = matContent;
    }

    get matContent() {
        return this._matContent
    }

    scrollTo(position: number) {
        this._matContent.scrollTo({ top: position, behavior: "smooth" });
    }
}
