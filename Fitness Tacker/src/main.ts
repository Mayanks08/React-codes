import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { WorkoutFormComponent } from './app/components/workout-form/workout-form.component';
import { WorkoutListComponent } from './app/components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutFormComponent, WorkoutListComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Workout Tracker</h1>
      <div class="grid gap-8 md:grid-cols-[300px,1fr]">
        <app-workout-form />
        <app-workout-list />
      </div>
    </div>
  `
})
export class App {
}

bootstrapApplication(App);