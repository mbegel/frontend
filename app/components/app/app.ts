import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {MenuBarComponent} from '../menu-bar/menu-bar';
import {MainComponent} from '../main/main';
import {UsersListComponent} from '../users-list/users-list';



@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES, MenuBarComponent, MainComponent]
})
@RouteConfig([
	{path: '/', component: MainComponent, useAsDefault: true, as: 'Main'},
	{path: '/user', component: UsersListComponent, as: 'Users'},
])
export class AppComponent {}
