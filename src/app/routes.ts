import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { CustomerComponent } from './customer/customer.component';
import { CollectionComponent } from './collection/collection.component';
import { CreditComponent } from './credit/credit.component';
import { AssetComponent } from './asset/asset.component';
import { ActivityComponent } from './activity/activity.component';
import { CreateActivityComponent } from './activity/create-activity/create-activity.component';
import { IndexActivityComponent } from './activity/index-activity/index-activity.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { ProtocolIndexComponent } from './protocol/protocol-index/protocol-index.component';
import { CreateProtocolComponent } from './protocol/create-protocol/create-protocol.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
    { path: 'login', component: UserComponent },
    { path: 'customers', component:CustomerComponent},
    { path: 'collections', component:CollectionComponent},
    { path: 'credits', component:CreditComponent},
    { path: 'assets', component:AssetComponent},
    { path: 'protocols', component:ProtocolComponent , children: [
        { path: '', component: ProtocolIndexComponent },
        { path: 'new', component: CreateProtocolComponent },
    ] },
    { path: 'activities', component: ActivityComponent, children: [
        { path: '', component: IndexActivityComponent },
        { path: 'new', component: CreateActivityComponent },
    ] },
    { path: '' , component:HomeComponent}

    
];

