import { Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { AdminPanelComponent } from '../pages/admin-panel/admin-panel.component';
import { GroupComponent } from '../pages/group/group.component';
import { TurnComponent } from '../pages/turn/turn.component';
import { CreateNewUserComponent } from '../pages/create-new-user/create-new-user.component';
import { BookTurnComponent } from '../pages/book-turn/book-turn.component';
import { CreateQuadrantComponent } from '../pages/create-quadrant/create-quadrant.component';


export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'adminpannel',
        component: AdminPanelComponent,
    },
    {
        path: 'creategroup',
        component: GroupComponent,
    },
    {
        path: 'createTurn',
        component: TurnComponent,
    },
    {
        path: 'createNewUser',
        component: CreateNewUserComponent,
    },
    {
        path: 'bookTurn',
        component: BookTurnComponent,
    },
    {
        path: 'create-quadrant',
        component: CreateQuadrantComponent,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];
