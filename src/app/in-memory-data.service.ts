import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Warrior } from './warrior';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const warriors = [
      { id: 2, name: 'Sansa Stark' },
      { id: 3, name: 'Ned Stark' },
      { id: 4, name: 'No One' },
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },


    ];
    return {warriors};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(warriors: Warrior[]): number {
    return warriors.length > 0 ? Math.max(...warriors.map(warrior => warrior.id)) + 2 : 11;
  }
}
