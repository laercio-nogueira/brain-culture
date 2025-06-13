import fetchMock from "jest-fetch-mock";
import { setupApiStore } from "../testUtils";

import { FarmApi } from "@store/states/farm/farmApi";
import farmReducer from "@store/states/farm/farmSlice";

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("FarmApi", () => {
  const storeRef: any = setupApiStore(FarmApi, { farm: farmReducer });

  it("should return url /farm?page=1&limit=5 and method GET when call getFarms with page 1", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(FarmApi.endpoints.getFarms.initiate(1));

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farm?page=1&limit=5");
    expect(method).toBe("GET");
  });

  it("should return url /farm and method GET when call getFarms without page", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmApi.endpoints.getFarms.initiate(undefined)
    );

    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    const { method }: any = fetchMock.mock.calls[0][0];

    expect(url).toBe("http://mocked-backend:9999/api/v1/farm");
    expect(method).toBe("GET");
  });

  it("should return url /farm/id and method GET when call getFarm with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmApi.endpoints.getFarm.initiate("mock-id")
    );

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/farm/mock-id");
    expect(method).toBe("GET");
  });

  it("should return url /farm and method POST when call addFarm with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmApi.endpoints.addFarm.initiate({
        name: "mock-name",
        city: "Sao Paulo",
        state: "SP",
        totalArea: 200,
        cultivatedArea: 100,
        vegetatedArea: 100,
      })
    );

    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    const { method }: any = fetchMock.mock.calls[0][0];

    expect(url).toBe("http://mocked-backend:9999/api/v1/farm/");
    expect(method).toBe("POST");
  });

  it("should return url /farm/id and method PUT when call updateFarm with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmApi.endpoints.updateFarm.initiate({
        id: "mock-id",
        name: "mock-name",
        city: "Minas Gerais",
        state: "MG",
        totalArea: 200,
        cultivatedArea: 100,
        vegetatedArea: 100,
      })
    );

    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    const { method }: any = fetchMock.mock.calls[0][0];

    expect(url).toBe("http://mocked-backend:9999/api/v1/farm/mock-id");
    expect(method).toBe("PUT");
  });

  it("should return url /farm/id and method DELETE when call deleteFarm with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      FarmApi.endpoints.deleteFarm.initiate("mock-id")
    );

    const [request] = fetchMock.mock.calls[0];
    const url = typeof request === "string" ? request : request?.url;
    const { method }: any = fetchMock.mock.calls[0][0];

    expect(url).toBe("http://mocked-backend:9999/api/v1/farm/mock-id");
    expect(method).toBe("DELETE");
  });
});
