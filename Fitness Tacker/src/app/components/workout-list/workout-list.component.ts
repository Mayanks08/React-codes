import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { User } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div class="flex gap-4">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (ngModelChange)="filterUsers()"
          placeholder="Search by name"
          class="input flex-1"
        >
        <select
          [(ngModel)]="selectedType"
          (ngModelChange)="filterUsers()"
          class="select w-48"
        >
          <option value="">All workout types</option>
          <option *ngFor="let type of workoutTypes" [value]="type">{{ type }}</option>
        </select>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workouts</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Minutes</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let user of paginatedUsers">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
              <td class="px-6 py-4">
                <span *ngFor="let workout of user.workouts; let last = last">
                  {{ workout.type }} ({{ workout.minutes }}min){{ !last ? ', ' : '' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ getTotalMinutes(user) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <button
            (click)="previousPage()"
            [disabled]="currentPage === 1"
            class="btn"
            [class.btn-primary]="currentPage !== 1"
            [class.opacity-50]="currentPage === 1"
          >
            Previous
          </button>
          <button
            (click)="nextPage()"
            [disabled]="currentPage >= totalPages"
            class="btn"
            [class.btn-primary]="currentPage < totalPages"
            [class.opacity-50]="currentPage >= totalPages"
          >
            Next
          </button>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Items per page:</span>
          <select
            [(ngModel)]="pageSize"
            (ngModelChange)="onPageSizeChange()"
            class="select w-20"
          >
            <option [value]="5">5</option>
            <option [value]="10">10</option>
            <option [value]="20">20</option>
          </select>
        </div>
      </div>
    </div>
  `
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  workoutTypes: string[];
  searchTerm = '';
  selectedType = '';
  currentPage = 1;
  pageSize = 5;

  constructor(private workoutService: WorkoutService) {
    this.workoutTypes = this.workoutService.getWorkoutTypes();
  }

  ngOnInit(): void {
    this.workoutService.users$.subscribe(users => {
      this.users = users;
      this.filterUsers();
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const typeMatch = !this.selectedType || user.workouts.some(w => w.type === this.selectedType);
      return nameMatch && typeMatch;
    });
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  getTotalMinutes(user: User): number {
    return user.workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  private updatePaginatedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }
}