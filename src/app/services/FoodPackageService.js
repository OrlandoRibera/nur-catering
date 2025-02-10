import axios from "axios";

export class FoodPackageService {
  constructor(baseUrl) {
    this.endpoint = baseUrl;
    if (!this.endpoint) {
      this.endpoint = "http://localhost:8080";
    }
  }
  async getAllFoodPackages() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.endpoint}/api/catering/getAllPackages`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async createFoodPackage(foodPackage) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.endpoint}/api/catering/createPackage`,
          {
            recipeId: foodPackage.recipeId,
            clientId: foodPackage.clientId,
            addressId: foodPackage.addressId,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(
            "🎯 ~ FoodPackageService ~ returnnewPromise ~ error:",
            error
          );
          reject(error);
        });
    });
  }
}
