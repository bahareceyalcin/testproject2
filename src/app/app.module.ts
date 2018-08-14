import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './routes';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './shared/customer.service';
import { CollectionComponent } from './collection/collection.component';
import { CollectionService } from './shared/collection.service';
import { AssetComponent } from './asset/asset.component';
import { CreditComponent } from './credit/credit.component';
import { ActivityComponent } from './activity/activity.component';
import { CreateActivityComponent } from './activity/create-activity/create-activity.component';
import { IndexActivityComponent } from './activity/index-activity/index-activity.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { LawService } from './shared/law.service';
import { CreateProtocolComponent } from './protocol/create-protocol/create-protocol.component';
import { ProtocolIndexComponent } from './protocol/protocol-index/protocol-index.component';
import { ProtocolService } from './shared/protocol.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    CustomerComponent,
    CollectionComponent,
    AssetComponent,
    CreditComponent,
    ActivityComponent,
    CreateActivityComponent,
    IndexActivityComponent,
    ProtocolComponent,
    CreateProtocolComponent,
    ProtocolIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    AuthGuard,
    CustomerService,
    CollectionService,
    LawService,
    ProtocolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
