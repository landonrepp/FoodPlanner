import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-meal-plan-list',
  templateUrl: './meal-plan-list.component.html',
  styleUrls: ['./meal-plan-list.component.css']
})
export class MealPlanListComponent implements OnInit {

  constructor(private modalService:ModalService) { }

  ngOnInit() {
  }

}
