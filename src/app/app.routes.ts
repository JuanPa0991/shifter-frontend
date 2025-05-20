import { Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { AdminPanelComponent } from '../pages/admin-panel/admin-panel.component'; 
import { GroupComponent } from '../pages/group/group.component';
import { HistQuadrantComponent } from '../pages/hist-quadrant/hist-quadrant.component';
import { UserCalendarComponent } from '../pages/user-calendar/user-calendar.component';

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
        path:"histquadrant",
        component:HistQuadrantComponent
    },
    {
        path:"usercalendar",
        component:UserCalendarComponent
    },
    {
        path:"",
        redirectTo: "login",
        pathMatch: "full"
    }
];
