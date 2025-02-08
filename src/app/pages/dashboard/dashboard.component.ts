import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { FoodPackage } from '../../dtos/food-package.interface';
import { GetAllFoodPackagesService } from '../../services/get-all-food-packages.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  providers: [GetAllFoodPackagesService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public foodPackages: FoodPackage[];

  constructor(
    private readonly _getAllFoodPackagesService: GetAllFoodPackagesService
  ) {
    this.foodPackages = [];
  }

  public ngOnInit(): void {
    this._getAllFoodPackagesService
      .getAllFoodPackages()
      .pipe(
        tap((response) => {
          this.foodPackages = response;
        })
      )
      .subscribe({ error: (error) => (this.foodPackages = []) });
  }
}
