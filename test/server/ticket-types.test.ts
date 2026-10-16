import { describe, expect, it } from "vitest";
import { createTicketTypeSchema, toTicketTypeInsert } from "../../server/utils/ticket-types";

describe("createTicketTypeSchema", () => {
  it("parses valid input", () => {
    const result = createTicketTypeSchema.safeParse({
      name: "Weekend Camping",
      description: "Full weekend ticket with camping",
      priceInPence: 7500,
      maxQuantity: 200,
    });

    expect(result.success).toBe(true);
  });

  it("rejects a name shorter than 2 characters", () => {
    const result = createTicketTypeSchema.safeParse({
      name: "A",
      priceInPence: 7500,
      maxQuantity: 200,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a negative price", () => {
    const result = createTicketTypeSchema.safeParse({
      name: "Weekend Camping",
      priceInPence: -100,
      maxQuantity: 200,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a non-integer price", () => {
    const result = createTicketTypeSchema.safeParse({
      name: "Weekend Camping",
      priceInPence: 10.5,
      maxQuantity: 200,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a max quantity of 0", () => {
    const result = createTicketTypeSchema.safeParse({
      name: "Weekend Camping",
      priceInPence: 7500,
      maxQuantity: 0,
    });

    expect(result.success).toBe(false);
  });
});

describe("toTicketTypeInsert", () => {
  it("trims the name and maps a blank description to null", () => {
    const insert = toTicketTypeInsert("event-1", {
      name: "  Weekend Camping  ",
      description: "   ",
      priceInPence: 7500,
      maxQuantity: 200,
    });

    expect(insert).toEqual({
      eventId: "event-1",
      name: "Weekend Camping",
      description: null,
      priceInPence: 7500,
      maxQuantity: 200,
    });
  });

  it("passes a real description through unchanged", () => {
    const insert = toTicketTypeInsert("event-1", {
      name: "Weekend Camping",
      description: "Full weekend ticket with camping",
      priceInPence: 7500,
      maxQuantity: 200,
    });

    expect(insert.description).toBe("Full weekend ticket with camping");
  });
});
