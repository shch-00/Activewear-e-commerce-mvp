/**
 * Минимальный unit-тест: проверяет, что Jest в backend собран и выполняется.
 */
describe("backend test runner", () => {
  it("runs unit tests", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  it("loads medusa-config module", () => {
    const config = require("../../medusa-config");
    expect(config).toBeDefined();
    expect(config.projectConfig).toBeDefined();
  });
});
