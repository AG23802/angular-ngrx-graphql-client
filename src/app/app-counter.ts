import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <h1>Counter: {{ count() }}</h1>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
  `
})
export class CounterComponent {
  // Define a signal
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }
}
