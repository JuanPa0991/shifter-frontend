import { Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { AdminPanelComponent } from '../pages/admin-panel/admin-panel.component'; 
import { GroupComponent } from '../pages/group/group.component';

export const routes: Routes = [
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path: "adminpannel",
        component: AdminPanelComponent
    },
    {
        path:"creategroup",
        component:GroupComponent
    },
    {
        path:"",
        redirectTo: "login",
        pathMatch: "full"
    }
];
