import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workout_data';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      this.usersSubject.next(JSON.parse(storedData));
    } else {
      const initialData: User[] = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ];
      this.usersSubject.next(initialData);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.usersSubject.value));
  }

  addWorkout(name: string, workout: Workout): void {
    const users = this.usersSubject.value;
    let user = users.find(u => u.name === name);

    if (user) {
      user.workouts.push(workout);
    } else {
      user = {
        id: users.length + 1,
        name,
        workouts: [workout]
      };
      users.push(user);
    }

    this.usersSubject.next(users);
    this.saveToLocalStorage();
  }

  getWorkoutTypes(): string[] {
    return ['Running', 'Cycling', 'Swimming', 'Yoga'];
  }
}