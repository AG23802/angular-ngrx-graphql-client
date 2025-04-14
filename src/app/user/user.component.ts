import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { ChangeDetectorRef } from "@angular/core";
import { API_URL } from '../tokens/api-url.token';  // Import your token here
import { AuthService } from '../auth-service';
@Component({
    selector: 'app-user',
    imports: [CommonModule],
    templateUrl: './user.component.html',
    providers: [
        { provide: API_URL, useValue: 'https://my-custom-api.com' } // Providing the token with a custom value
    ]
})
export class UserComponent {
  private userService = inject(UserService);
  users: any[] = [];

  apiURL = inject(API_URL);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('API URL:', this.apiURL);  // Log the injected API URL
  }

  addUser() {
    this.userService.createUser('New User', 'newuser@example.com').subscribe((user) => {
      const newUsers = [...this.users];
      newUsers.push(user);
      this.users = newUsers;
    });
  }

  login() {
    this.authService.login("admin", "123456").subscribe(
      (user) => {
        // Handle successful login
        console.log(user);
      },
      (error) => {
        // Handle error, e.g. show an error message
        console.error("Login failed", error);
      })
  }

  getData() {
    this.userService.getData().subscribe(
      (data) => {
        // Handle successful login
        console.log(data);
      },
      (error) => {
        // Handle error, e.g. show an error message
        console.error("Login failed", error);
      })
    }
}
