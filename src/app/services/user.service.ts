import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/core/abstracts/base-http-service.abstract';
import { User } from '@app/models/user.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService {
  protected baseUrl = `${environment.apiBaseUrl}/users`; // Use base URL from environment

  /**
   * Fetches the list of users.
   * @returns An observable of the user array.
   */
  getUsers(): Observable<User[]> {
    return this.get<User[]>('');
  }

  /**
   * Fetches a single user by ID.
   * @param id - The ID of the user to fetch.
   * @returns An observable of the user.
   */
  getUserById(id: string): Observable<User> {
    return this.get<User>(`${id}`);
  }

  /**
   * Creates a new user.
   * @param user - The user data to create.
   * @returns An observable of the created user.
   */
  createUser(user: User): Observable<User> {
    return this.post<User>('', user);
  }

  /**
   * Updates an existing user.
   * @param id - The ID of the user to update.
   * @param user - The updated user data.
   * @returns An observable of the updated user.
   */
  updateUser(id: string, user: User): Observable<User> {
    return this.put<User>(`${id}`, user);
  }

  /**
   * Deletes a user by ID.
   * @param id - The ID of the user to delete.
   * @returns An observable of the deleted user.
   */
  deleteUser(id: string): Observable<User> {
    return this.delete<User>(`${id}`);
  }
}
