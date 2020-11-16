import { Component, ViewEncapsulation } from '@angular/core';
import { Home } from './home.component';

@Component({
    selector: 'app-home-mobile',
    templateUrl: './home-mobile.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeMobile extends Home {
}