import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealListLineItemComponent } from './components/meal-list-line-item/meal-list-line-item.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DailyStatsComponent } from './components/daily-stats/daily-stats.component';
import { DayOfMealsComponent } from './components/day-of-meals/day-of-meals.component';
import { MealPlanListComponent } from './MealPlan/meal-plan-list/meal-plan-list.component';
import { PromptUserComponent } from './MealPlan/prompt-user/prompt-user.component'; 
import { FormsModule }   from '@angular/forms';
import { ModalComponent } from './components/modal-component/modal-component.component';

const appRoutes: Routes =[
  { path: 'generate-meals', component: MealListComponent },
  { path: 'login', component: LoginComponent },
  { path:'generate-meal-plan', component:MealPlanListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MealListComponent,
    MealListLineItemComponent,
    LoginComponent,
    DailyStatsComponent,
    DayOfMealsComponent,
    MealPlanListComponent,
    PromptUserComponent,
    ModalComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
