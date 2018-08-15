import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarPriceComponent } from './car-price/car-price.component';
import { CarOrderListComponent } from './car-order-list/car-order-list.component';
import { CarOrderPreviewComponent } from './car-order-preview/car-order-preview.component';
import { CarOrderComponent } from './car-order/car-order.component';
import { UserComponent } from './Administrator/User/user.component';
import { CarReturnComponent } from './car-return/car-return.component';
import { CarComponent } from './Administrator/car/car.component';
import { CarPreviewComponent } from './Administrator/car-preview/car-preview.component';
import { OrderComponent } from './Administrator/order/order.component';



const appRoutes: Routes = [
{ path: 'Register', component: RegisterComponent },
{ path: 'ReturnCar', component: CarReturnComponent },
{ path: 'Login', component: LoginComponent},
{ path: 'home', component: HomeComponent},
{ path: 'Cars', component: CarsComponent},
{ path: 'MyOrders', component: CarOrderListComponent},
{ path: 'Order/:CarTypeID/:result/:returnDateInput/:startDateInput/:branch/:CarID' , component: CarOrderComponent},
{ path: 'OrderDetails/:carID/:carTypeId/:rentedDate/:returnDate/:actualReturnDate', component: CarOrderPreviewComponent},
{ path: 'CarDetails/:CarTypeID/:LocatedAtTheBranch', component: CarDetailsComponent},
{ path: 'Price/:CarTypeID/:branch/:CarID', component: CarPriceComponent},
{ path: 'return', component: CarReturnComponent},
{ path: 'user', component: UserComponent },
{ path: 'car', component: CarComponent },
{ path: 'carPreview', component: CarPreviewComponent },
{ path: 'order', component: OrderComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', component: HomeComponent }

];

// אובייקט ראוטר - יודע איך להחליף את הקומפוננטות לפי הנתיבים
const appRouter = RouterModule.forRoot(appRoutes);

@NgModule({
imports: [appRouter]
})
export class AppRoutingModule {}
