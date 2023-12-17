import { Component, OnInit } from '@angular/core';
import { Workout } from './models/workout.model';
import { WorkoutService } from './services/workout.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title= 'FitnessTrackerApp'
  workouts: Workout[] = [];
  newWorkout: Workout = { id: 0, name: '', duration: 0, calories: 0 };

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.fetchWorkouts();
  }

  updateWorkout(workout: Workout): void {
    workout.name = 'Updated Workout';
    workout.duration = 60;
    workout.calories = 500;

    this.workoutService.updateWorkout(workout).subscribe(() => {
      this.fetchWorkouts();
    });
  }

  deleteWorkout(workoutId: number): void {
    this.workoutService.deleteWorkout(workoutId).subscribe(() => {
      this.fetchWorkouts();
    });
  }

  addWorkout(form: NgForm): void {

    this.workoutService.createWorkout(this.newWorkout).subscribe(() => {
      this.fetchWorkouts(); // Fetch workouts after adding a new one
      this.newWorkout = { id: 0, name: '', duration: 0, calories: 0 };
      form.resetForm();
    }, error => {
      console.error('Error adding workout:', error);
    });
  }


  private fetchWorkouts(): void {
    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.workouts = workouts;
    });
  }
}
