import { Routes } from '@angular/router';
import { IndexComponent } from './user/index/index.component';
import { CreateComponent } from './user/create/create.component';
import { EditComponent } from './user/edit/edit.component';
import { ViewComponent } from './user/view/view.component';


export const routeConfig: any = {
  home: { path: '', redirectTo: 'user/index', pathMatch: 'full', title: 'Home' },
  users: { path: 'user/index', component: IndexComponent , title: 'Users'},
  newUser: { path: 'user/create', component: CreateComponent, title: 'New User' },
  editUser: { path: 'user/:userId/edit', component: EditComponent, title: 'Edit User'},
  viewUser: { path: 'user/:userId/view', component: ViewComponent, title: 'User' },
}

export const routes: Routes = Object.keys(routeConfig).map(key => ({
  ...routeConfig[key],
}));
