import { Component, OnInit } from '@angular/core';

import { Warrior } from '../warrior';
import { WarriorService } from '../warrior.service';

@Component({
  selector: 'app-warriors',
  templateUrl: './warriors.component.html',
  styleUrls: ['./warriors.component.css']
})
export class WarriorsComponent implements OnInit {
  warriors: Warrior[];

  constructor(private warriorService: WarriorService) { }

  ngOnInit() {
    this.getWarriors();
  }

  getWarriors(): void {
    this.warriorService.getWarriors()
    .subscribe(warriors => this.warriors = warriors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.warriorService.addWarrior({ name } as Warrior)
      .subscribe(warrior => {
        this.warriors.push(warrior);
      });
  }

  delete(warrior: Warrior): void {
    this.warriors = this.warriors.filter(h => h !== warrior);
    this.warriorService.deleteWarrior(warrior).subscribe();
  }

}