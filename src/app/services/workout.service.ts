// workout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
  export class WorkoutService {
    private apiUrl = 'http://localhost:3000/workouts';

    constructor(private http: HttpClient) {}

    getWorkouts(): Observable<Workout[]> {
      return this.http.get<Workout[]>(this.apiUrl);
    }

    createWorkout(workout: Workout): Observable<Workout> {
      return this.http.post<Workout>(this.apiUrl, workout);
    }

    updateWorkout(workout: Workout): Observable<Workout> {
      const id = workout.id || 0;
      return this.http.put<Workout>(`${this.apiUrl}/${id}`, workout);
    }

    deleteWorkout(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
