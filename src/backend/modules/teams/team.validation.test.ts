import { describe, expect, it } from "vitest";
import { assertAllowedRole, parseCreateRequest, parsePatchRequest } from "./team.validation";

describe("team validation", () => {
  it("accepts the two confirmed creation roles", () => {
    expect(() => assertAllowedRole("head-of-product")).not.toThrow();
    expect(() => assertAllowedRole("team-lead")).not.toThrow();
  });

  it("rejects roles outside the feature 004 scope", () => {
    expect(() => assertAllowedRole("viewer")).toThrow();
  });

  it("requires name, ownerRole, and one centralized competency id", () => {
    expect(() => parseCreateRequest({ name: "", ownerRole: "team-lead", competencyIds: [] })).toThrow();
  });

  it("rejects fields outside the contract model", () => {
    expect(() =>
      parsePatchRequest({ name: "Core", planningPeriodId: "period_1" })
    ).toThrow();
  });
});
