import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
    selector: 'main',
    templateUrl: './main/main.html',
    directives : [ROUTER_DIRECTIVES]
})
export class MainComponent { }
