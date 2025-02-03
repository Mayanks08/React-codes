import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default data when localStorage is empty', (done) => {
    service.users$.subscribe(users => {
      expect(users.length).toBe(3);
      expect(users[0].name).toBe('John Doe');
      done();
    });
  });

  it('should add new workout for existing user', (done) => {
    const newWorkout = { type: 'Running', minutes: 25 };
    service.addWorkout('John Doe', newWorkout);

    service.users$.subscribe(users => {
      const user = users.find(u => u.name === 'John Doe');
      expect(user?.workouts.length).toBe(3);
      expect(user?.workouts).toContain(newWorkout);
      done();
    });
  });

  it('should create new user with workout when adding workout for new user', (done) => {
    const newWorkout = { type: 'Yoga', minutes: 30 };
    service.addWorkout('New User', newWorkout);

    service.users$.subscribe(users => {
      const user = users.find(u => u.name === 'New User');
      expect(user).toBeTruthy();
      expect(user?.workouts.length).toBe(1);
      expect(user?.workouts[0]).toEqual(newWorkout);
      done();
    });
  });

  it('should return available workout types', () => {
    const types = service.getWorkoutTypes();
    expect(types).toContain('Running');
    expect(types).toContain('Cycling');
    expect(types).toContain('Swimming');
    expect(types).toContain('Yoga');
  });
});