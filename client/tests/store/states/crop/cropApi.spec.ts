import fetchMock from "jest-fetch-mock";
import { setupApiStore } from "../testUtils";

import { CropApi } from "@store/states/crop/cropApi";
import cropReducer from "@store/states/crop/cropSlice";

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("CropApi", () => {
  const storeRef: any = setupApiStore(CropApi, { crop: cropReducer });

  it("should return url /crop?page=1&limit=5 and method GET when call getCrops with page 1", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(CropApi.endpoints.getCrops.initiate(1));

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/crop?page=1&limit=5");
    expect(method).toBe("GET");
  });

  it("should return url /crop/id and method GET when call getCrop with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      CropApi.endpoints.getCrop.initiate("mock-id")
    );

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/crop/mock-id");
    expect(method).toBe("GET");
  });

  it("should return url /crop and method POST when call addCrop with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      CropApi.endpoints.addCrop.initiate({
        name: "mock-name",
        harvestId: "mock-harvest-id",
      })
    );

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/crop");
    expect(method).toBe("POST");
  });

  it("should return url /crop/id and method PUT when call updateCrop with params", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      CropApi.endpoints.updateCrop.initiate({
        id: "mock-id",
        name: "mock-name",
        harvestId: "mock-harvest-id",
      })
    );

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/crop/mock-id");
    expect(method).toBe("PUT");
  });

  it("should return url /crop/id and method DELETE when call deleteCrop with id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await storeRef.store.dispatch(
      CropApi.endpoints.deleteCrop.initiate("mock-id")
    );

    const [request] = fetchMock.mock.calls[0];
    const { method }: any = fetchMock.mock.calls[0][0];
    const url = typeof request === "string" ? request : request?.url;

    expect(url).toBe("http://mocked-backend:9999/api/v1/crop/mock-id");
    expect(method).toBe("DELETE");
  });
});
