import fetchMock from "jest-fetch-mock";
import { setupApiStore } from "../testUtils";

import { FarmerApi } from "@store/states/farmer/farmerApi";
import farmerReducer from "@store/states/farmer/farmerSlice";

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("FarmerApi", () => {
  const storeRef: any = setupApiStore(FarmerApi, { farm: farmerReducer });

  it("should return url /farmer?page=1&limit=5 and method GET when call getFarmers with page 1", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(FarmerApi.endpoints.getFarmers.initiate(1));

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farmer?page=1&limit=5");
    expect(method).toBe("GET");
  });

  it("should return url /farmer and method GET when call getFarmers without page", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmerApi.endpoints.getFarmers.initiate(undefined)
    );
    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farmer");
    expect(method).toBe("GET");
  });

  it("should return url /farmer/id and method GET when call getFarmer with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmerApi.endpoints.getFarmer.initiate("mock-id")
    );
    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farmer/mock-id");
    expect(method).toBe("GET");
  });

  it("should return url /farmer and method POST when call addFarmer with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmerApi.endpoints.addFarmer.initiate({
        name: "mock-name",
        document: "1234567890",
        documentType: "PF",
      })
    );
    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farmer/");
    expect(method).toBe("POST");
  });

  it("should return url /harvest/id and method PUT when call updateFarmer with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmerApi.endpoints.updateFarmer.initiate({
        id: "mock-id",
        name: "mock-name",
        document: "1234567890",
        documentType: "PF",
      })
    );
    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farmer/mock-id");
    expect(method).toBe("PUT");
  });

  it("should return url /farmer/id and method DELETE when call deleteFarmer with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmerApi.endpoints.deleteFarmer.initiate("mock-id")
    );
    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farmer/mock-id");
    expect(method).toBe("DELETE");
  });
});
