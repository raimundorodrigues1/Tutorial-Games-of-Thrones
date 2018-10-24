import { Component, OnInit } from '@angular/core';
import { Warrior } from '../warrior';
import { WarriorService } from '../warrior.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  warriors: Warrior[] = [];

  constructor(private warriorService: WarriorService) { }

  ngOnInit() {
    this.getWarriors();
  }

  getWarriors(): void {
    this.warriorService.getWarriors()
      .subscribe(warriors => this.warriors = warriors.slice(1, 5));
  }
}
