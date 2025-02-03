import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['addWorkout', 'getWorkoutTypes']);
    spy.getWorkoutTypes.and.returnValue(['Running', 'Cycling', 'Swimming', 'Yoga']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, WorkoutFormComponent],
      providers: [
        { provide: WorkoutService, useValue: spy }
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load workout types on init', () => {
    expect(component.workoutTypes).toEqual(['Running', 'Cycling', 'Swimming', 'Yoga']);
  });

  it('should add workout when form is valid', () => {
    component.name = 'John';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.onSubmit();

    expect(workoutService.addWorkout).toHaveBeenCalledWith('John', {
      type: 'Running',
      minutes: 30
    });
  });

  it('should not add workout when form is invalid', () => {
    component.name = '';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.onSubmit();

    expect(workoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should reset form after successful submission', () => {
    component.name = 'John';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.onSubmit();

    expect(component.name).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });
});