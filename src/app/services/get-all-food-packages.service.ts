import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodPackage } from '../dtos/food-package.interface';

@Injectable()
export class GetAllFoodPackagesService {
  constructor(private _httpClient: HttpClient) {}

  public getAllFoodPackages(): Observable<FoodPackage[]> {
    return this._httpClient.get<FoodPackage[]>('/api/catering/getAllPackages');
  }
}
