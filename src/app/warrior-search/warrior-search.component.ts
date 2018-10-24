import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Warrior } from '../warrior';
import { WarriorService } from '../warrior.service';

@Component({
  selector: 'app-warrior-search',
  templateUrl: './warrior-search.component.html',
  styleUrls: [ './warrior-search.component.css' ]
})
export class WarriorSearchComponent implements OnInit {
  warriors$: Observable<Warrior[]>;
  private searchTerms = new Subject<string>();

  constructor(private warriorService: WarriorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.warriors$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.warriorService.searchHeroes(term)),
    );
  }
}
