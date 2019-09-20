import { Component, OnInit, Input } from '@angular/core';
import {Product} from "../../../types/Products"


@Component({
  selector: 'app-link-items-line-item',
  templateUrl: './link-items-line-item.component.html',
  styleUrls: ['./link-items-line-item.component.css']
})
export class LinkItemsLineItemComponent implements OnInit {
  @Input()
  item:Product
  constructor() { }

  ngOnInit() {
  }

}
