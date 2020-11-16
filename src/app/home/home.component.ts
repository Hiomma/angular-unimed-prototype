import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SidenavService } from '../misc/sidenav.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Home {

    @ViewChild("sectionHome") sectionHome: ElementRef
    @ViewChild("sectionNoticias") sectionNoticias: ElementRef
    @ViewChild("sectionSobre") sectionSobre: ElementRef
    @ViewChild("sectionContato") sectionContato: ElementRef

    resourceForm = this.formBuilder.group({
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        titulo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        mensagem: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10000)]],
    })

    /** @description Tamanho da tela em tempo real */
    width = self.innerWidth;

    constructor(private formBuilder: FormBuilder,
        private navbarService: SidenavService,) { }

    openIcon(socialNetwork: string) {
        switch (socialNetwork) {
            case 'twitter':
                window.open("https://twitter.com/unimedscapixaba", "_blank")
                break;
            case 'facebook':
                window.open("https://www.facebook.com/UnimedSulCapixabaOficial/", "_blank")
                break;
            case 'instagram':
                window.open("https://www.instagram.com/unimedsulcapixaba/", "_blank")
                break;
            case 'youtube':
                window.open("https://www.youtube.com/channel/UCLnAU410W8AkWjSljhU0Viw", "_blank")
                break;
        }
    }

    goToSection(section: string) {
        this.navbarService.scrollTo(this[section].nativeElement.offsetTop);
    }

}