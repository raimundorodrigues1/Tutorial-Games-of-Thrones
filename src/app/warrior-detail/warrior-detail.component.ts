import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Warrior } from '../warrior';
import { WarriorService }  from '../warrior.service';

@Component({
  selector: 'app-warrior-detail',
  templateUrl: './warrior-detail.component.html',
  styleUrls: ['./warrior-detail.component.css']
  
})
export class WarriorDetailComponent implements OnInit {

  @Input () warrior: Warrior; 

  constructor(
    private route: ActivatedRoute,
    private warriorService: WarriorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWarrior();
  }
  
  getWarrior(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.warriorService.getWarrior(id)
      .subscribe(warrior => this.warrior = warrior);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.warriorService.updateWarrior(this.warrior)
      .subscribe(() => this.goBack());
  }
}
