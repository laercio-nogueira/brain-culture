describe("Config constants", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test("should fallback to defaults if env not set", () => {
    jest.resetModules();
    const { BACKEND_URL, PORT, BASE_URL } = require("@config/env.config");

    expect(BACKEND_URL).toBe("http://localhost");
    expect(PORT).toBe(3000);
    expect(BASE_URL).toBe("http://localhost:3000");
  });
});
