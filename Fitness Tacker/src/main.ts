import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from './app/storage.service';
import { User, Workout } from './app/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center glow-text">Health Challenge Tracker</h1>
      
      <!-- Add User Form -->
      <div class="card p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-blue-400">Add New Workout</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            [(ngModel)]="newUser.name"
            placeholder="User Name"
            class="input"
          />
          <input 
            [(ngModel)]="newWorkout.type"
            placeholder="Workout Type"
            class="input"
          />
          <input 
            [(ngModel)]="newWorkout.minutes"
            type="number"
            placeholder="Minutes"
            class="input"
          />
        </div>
        <button (click)="addUser()" class="btn mt-4">
          Add User Workout
        </button>
      </div>

      <!-- Filters -->
      <div class="card p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            [(ngModel)]="searchName"
            placeholder="Search by name..."
            class="input"
          />
          <select 
            [(ngModel)]="filterWorkoutType"
            class="input"
          >
            <option value="">All Workout Types</option>
            <option *ngFor="let type of workoutTypes">{{ type }}</option>
          </select>
        </div>
      </div>

      <!-- Users Table -->
      <div class="card overflow-hidden">
        <table class="table">
          <thead>
            <tr>
              <th class="th">Name</th>
              <th class="th">Workout Type</th>
              <th class="th">Minutes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <ng-container *ngFor="let user of filteredUsers | slice:(page-1)*pageSize:page*pageSize">
              <tr *ngFor="let workout of user.workouts" class="hover:bg-gray-700 transition-colors">
                <td class="td">{{ user.name }}</td>
                <td class="td">{{ workout.type }}</td>
                <td class="td">{{ workout.minutes }}</td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>

      <!-- Enhanced Pagination -->
      <div class="mt-4 flex justify-center items-center gap-2">
        <button 
          (click)="prevPage()"
          [disabled]="page === 1"
          [class.opacity-50]="page === 1"
          class="btn px-3 py-1"
        >
          Previous
        </button>

        <div class="flex gap-2 mx-4">
          <button 
            *ngFor="let p of visiblePages"
            (click)="page = p"
            [class.bg-blue-600]="page === p"
            [class.text-white]="page === p"
            [class.bg-gray-800]="page !== p"
            [class.text-gray-300]="page !== p"
            class="px-3 py-1 rounded hover:bg-blue-700 transition-colors min-w-[32px]"
          >
            {{ p }}
          </button>
        </div>

        <button 
          (click)="nextPage()"
          [disabled]="page === totalPages"
          [class.opacity-50]="page === totalPages"
          class="btn px-3 py-1"
        >
          Next
        </button>

        <span class="ml-4 text-gray-400">
          Page {{ page }} of {{ totalPages }}
        </span>
      </div>
    </div>
  `,
})
export class App implements OnInit {
  users: User[] = [];
  newUser = { name: '' };
  newWorkout: Workout = { type: '', minutes: 0 };
  searchName = '';
  filterWorkoutType = '';
  page = 1;
  pageSize = 5;
  workoutTypes: string[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadUsers();
    this.updateWorkoutTypes();
  }

  get filteredUsers() {
    return this.users
      .filter(user => 
        user.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
        (this.filterWorkoutType === '' || 
         user.workouts.some(w => w.type === this.filterWorkoutType))
      );
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  get visiblePages() {
    const totalPages = this.totalPages;
    const current = this.page;
    const delta = 2; // Number of pages to show on each side of current page
    
    let start = Math.max(1, current - delta);
    let end = Math.min(totalPages, current + delta);

    // Adjust the range if we're at the edges
    if (current <= delta) {
      end = Math.min(totalPages, 2 * delta + 1);
    } else if (current >= totalPages - delta) {
      start = Math.max(1, totalPages - 2 * delta);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  loadUsers() {
    this.users = this.storageService.getUsers();
  }

  updateWorkoutTypes() {
    const types = new Set<string>();
    this.users.forEach(user => 
      user.workouts.forEach(workout => types.add(workout.type))
    );
    this.workoutTypes = Array.from(types);
  }

  addUser() {
    if (this.newUser.name && this.newWorkout.type && this.newWorkout.minutes > 0) {
      this.storageService.addUser({
        name: this.newUser.name,
        workouts: [this.newWorkout]
      });
      this.loadUsers();
      this.updateWorkoutTypes();
      this.newUser = { name: '' };
      this.newWorkout = { type: '', minutes: 0 };
    }
  }
}

bootstrapApplication(App);