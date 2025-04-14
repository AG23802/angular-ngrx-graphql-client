import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',  // Or 'any', but in this case, we are handling it differently
  factory: () => 'https://api.example.com',  // Default value or factory function
});
