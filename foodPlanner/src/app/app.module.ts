import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { MealListComponent } from './Pages/GenerateMealList/meal-list/meal-list.component';
import { MealListLineItemComponent } from './Pages/GenerateMealList/meal-list-line-item/meal-list-line-item.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './common/login/login.component';
import { DailyStatsComponent } from './Pages/GenerateMealList/daily-stats/daily-stats.component';
import { DayOfMealsComponent } from './Pages/GenerateMealList/day-of-meals/day-of-meals.component';
import { MealPlanListComponent } from './Pages/MealPlan/meal-plan-list/meal-plan-list.component';
import { PromptUserComponent } from './Pages/MealPlan/prompt-user/prompt-user.component'; 
import { FormsModule }   from '@angular/forms';
import { ModalComponent } from './common/modal-component/modal-component.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
  SocialLoginModule, 
  AuthServiceConfig,
  GoogleLoginProvider, 
  FacebookLoginProvider, 
  LinkedinLoginProvider
} from 'ng-social-login-module';
import { environment } from 'src/environments/environment';
import { ButtonWithIconComponent } from './common/button-with-icon/button-with-icon.component';

console.log(environment.production)
const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google_client_id)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebook_app_id)
  }
], true);
export function provideConfig(){
  return CONFIG;
}
const appRoutes: Routes =[
  { path: 'generate-meals', component: MealListComponent },
  { path: 'login', component: LoginComponent },
  { path:'generate-meal-plan', component:MealPlanListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MealListComponent,
    MealListLineItemComponent,
    LoginComponent,
    DailyStatsComponent,
    DayOfMealsComponent,
    MealPlanListComponent,
    PromptUserComponent,
    ModalComponent,
    ButtonWithIconComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    SocialLoginModule

  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
