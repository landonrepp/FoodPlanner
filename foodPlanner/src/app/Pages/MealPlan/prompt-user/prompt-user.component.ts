import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypeFactoryService } from 'src/app/services/type-factory.service';


@Component({
  selector: 'app-prompt-user',
  templateUrl: './prompt-user.component.html',
  styleUrls: ['./prompt-user.component.css']
})
export class PromptUserComponent implements OnInit {

  constructor(
      private tfs:TypeFactoryService,
    ) { }
    @Output() sendDataToParent = new EventEmitter<MealPlanParameters>();
  mealPlanParameters:MealPlanParameters;

  ngOnInit() {
    this.mealPlanParameters = this.tfs.newMealPlanParameters();
    console.log(this.tfs);
  }
  _sendDataToParent(){
    this.sendDataToParent.emit(this.mealPlanParameters);
  }
}