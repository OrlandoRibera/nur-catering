import { MatchersV3, PactV3 } from "@pact-foundation/pact";
import { expect } from "chai";
import { describe, it } from "mocha";
import { FoodPackageService } from "../../app/services/FoodPackageService.js";
import {
  createFoodPackageResponse,
  foodPackageRequest,
} from "../PactResponses.js";
const { like } = MatchersV3;

describe("FoodPackageService", () => {
  let foodPackageService;

  const provider = new PactV3({
    consumer: "nur-catering-react",
    provider: "catering-provider",
  });

  describe("createFoodPackage", () => {
    it("creates a new food package", () => {
      provider
        .given("create a food package")
        .uponReceiving("a request to create a food package")
        .withRequest({
          method: "POST",
          path: "/api/catering/createPackage",
          headers: {
            Accept: "application/json",
          },
          body: foodPackageRequest,
        })
        .willRespondWith({
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: like(createFoodPackageResponse),
        });

      return provider.executeTest(async (mockServer) => {
        foodPackageService = new FoodPackageService(mockServer.url);

        return foodPackageService
          .createFoodPackage(foodPackageRequest)
          .then((response) => {
            expect(response.status).to.be.equal("NEW");
            expect(response.foods).to.be.an("array");
            expect(response.foods).to.have.lengthOf(0);
          });
      });
    });
  });

  describe("getAllFoodPackages", () => {
    it("returns all food packages", () => {
      provider
        .given("get all food packages")
        .uponReceiving("a request to get all food packages")
        .withRequest({
          method: "GET",
          path: "/api/catering/getAllPackages",
        })
        .willRespondWith({
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: like([createFoodPackageResponse]),
        });

      return provider.executeTest(async (mockServer) => {
        foodPackageService = new FoodPackageService(mockServer.url);
        return foodPackageService.getAllFoodPackages().then((response) => {
          expect(response).to.be.an("array");
          expect(response).to.have.lengthOf(1);
          expect(response[0].recipeId).to.be.equal(foodPackageRequest.recipeId);
        });
      });
    });
  });
});
