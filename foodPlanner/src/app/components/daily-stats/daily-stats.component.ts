import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { keys } from 'd3';

@Component({
  selector: 'app-daily-stats',
  templateUrl: './daily-stats.component.html',
  styleUrls: ['./daily-stats.component.css']
})
export class DailyStatsComponent implements OnInit {
  @Input() meals: NutritionalInformation[] = [];
  private margin = {top: 10, right: 10, bottom: 10, left: 10};
  private width: number;
  private height: number;
  private radius: number;
  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;
  private id:string;

  private mealStats: MealStats = {
    calories: 0,
    carbs:0,
    protien:0,
    fat:0
  };
  private processedData: any[];

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 640 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height)/1.5 - 100;
  }
  private processMeals(){
    let total = 0;
    this.meals.forEach(meal=>{
      this.mealStats.calories += meal.calories;
      this.mealStats.carbs += meal.carbs;
      this.mealStats.fat += meal.fat;
      this.mealStats.protien += meal.protien;
      total += meal.carbs + meal.fat+ meal.protien
    });
    this.processedData = [];
    Object.keys(this.mealStats).forEach(key=>{
      if(key != "calories"){
        this.processedData.push({
          "nutrient":key+'\n'+Math.floor(this.mealStats[key]/total*100)+"%",
          "macro":this.mealStats[key]
        });
      }
      });
  }
  private initSvg() {
    this.color = d3Scale.scaleOrdinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(0);
    this.labelArc = d3Shape.arc()
        .outerRadius(this.radius+50)
        .innerRadius(this.radius+50);
    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.macro);
    console.log(`#${this.id}`);
    this.svg = d3.select(`#${this.id}`)
        .append('g')
        .attr('transform', 'translate(' + (this.radius+100) + ',' + this.height/2 + ')');
  }
  private drawPie() {
    let g = this.svg.selectAll('.arc')
        .data(this.pie(this.processedData))
        .enter().append('g')
        .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
        .style('fill', (d: any) => this.color(d.data.nutrient) );
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
        .attr('dy', '20px')
        .text((d: any) => d.data.nutrient);
  }
  ngOnInit() {
    this.id = "graphtest" + Math.floor(Math.random() * 1000000);;
    //TODO: fix this. we have to wait for the id to load before we can do this, but idk how to wait without
    // physically setting time.
    setTimeout(() => {
      this.initSvg();
      this.processMeals();
      this.drawPie();
    }, 1000);
  }

}
