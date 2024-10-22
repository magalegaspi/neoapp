import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsteroidsService {
  selectedDate: string = '';
  asteroids: any[] = [];

  constructor() {}
}
