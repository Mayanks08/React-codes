import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">User Name</label>
        <input
          type="text"
          id="name"
          [(ngModel)]="name"
          name="name"
          required
          class="input"
          placeholder="Enter user name"
        >
      </div>

      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Workout Type</label>
        <select
          id="type"
          [(ngModel)]="workoutType"
          name="type"
          required
          class="select"
        >
          <option value="">Select workout type</option>
          <option *ngFor="let type of workoutTypes" [value]="type">{{ type }}</option>
        </select>
      </div>

      <div>
        <label for="minutes" class="block text-sm font-medium text-gray-700">Minutes</label>
        <input
          type="number"
          id="minutes"
          [(ngModel)]="minutes"
          name="minutes"
          required
          min="1"
          class="input"
          placeholder="Enter workout duration"
        >
      </div>

      <button type="submit" class="btn btn-primary">Add Workout</button>
    </form>
  `
})
export class WorkoutFormComponent {
  name = '';
  workoutType = '';
  minutes = 0;
  workoutTypes: string[];

  constructor(private workoutService: WorkoutService) {
    this.workoutTypes = this.workoutService.getWorkoutTypes();
  }

  onSubmit(): void {
    if (this.name && this.workoutType && this.minutes > 0) {
      this.workoutService.addWorkout(this.name, {
        type: this.workoutType,
        minutes: this.minutes
      });
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}