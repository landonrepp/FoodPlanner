import { Component, OnInit } from '@angular/core';
import { TypeFactoryService } from 'src/app/services/type-factory.service';

@Component({
  selector: 'app-prompt-user',
  templateUrl: './prompt-user.component.html',
  styleUrls: ['./prompt-user.component.css']
})
export class PromptUserComponent implements OnInit {

  constructor(
      private tfs:TypeFactoryService 
    ) { }
  mealPlanParameters:MealPlanParameters;

  ngOnInit() {
    this.mealPlanParameters = this.tfs.newMealPlanParameters();
  }
}