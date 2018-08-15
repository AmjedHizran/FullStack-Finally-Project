import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
// modules
import { AppRoutingModule} from './app.routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CarsComponent } from './cars/cars.component';
import { CarOrderComponent } from './car-order/car-order.component';
import { CarOrderListComponent } from './car-order-list/car-order-list.component';
import { CarReturnComponent } from './car-return/car-return.component';
import { UserComponent } from './Administrator/User/user.component';
import { CarService } from './shared/services/car.service';
import { CarPreviewService } from './shared/services/car-preview.service';
import { DxTooltipModule } from 'devextreme-angular';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarPriceComponent } from './car-price/car-price.component';
import { AccountService } from './shared/services/account.service';
import { RegisterService } from './shared/services/register.service';
import { ErrorComponent} from './error/error.component';
import { CarOrderPreviewComponent } from './car-order-preview/car-order-preview.component';
import { UserService } from './shared/services/user.service';
import { MyHttpInterceptor } from './shared/services/httpInterceptor.service';
import { FilterPipe} from './shared/pipe/filter.pipe';
import { OrderService } from './shared/services/order.service';
import { BranchService } from './shared/services/branch.service';
import { FilterOrders } from './shared/pipe/filterOrders.pipe';
import { AuthGuardService } from './shared/services/local.service';
import { CarComponent } from './Administrator/car/car.component';
import { CarPreviewComponent } from './Administrator/car-preview/car-preview.component';
import { OrderComponent } from './Administrator/order/order.component';

@NgModule({

declarations: [
AppComponent,
HeaderComponent,
FooterComponent,
HomeComponent,
RegisterComponent,
LoginComponent,
CarsComponent,
CarOrderComponent,
CarOrderListComponent,
CarReturnComponent,
UserComponent,
CarDetailsComponent,
CarPriceComponent,
ErrorComponent,
CarOrderPreviewComponent,
FilterPipe,
FilterOrders,
CarComponent,
CarPreviewComponent,
OrderComponent
],
imports: [
BrowserModule,
HttpClientModule,
RouterModule,
AppRoutingModule,
ReactiveFormsModule,
FormsModule,
DxTooltipModule
],
// tslint:disable-next-line:max-line-length
providers: [AuthGuardService, BranchService, OrderService, UserService, RegisterService , CarService, CarPreviewService , AccountService,
{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
    } ],
bootstrap: [AppComponent]
})

export class AppModule { }
