import { describe, it, expect } from "vitest";

import { validatePermit } from "../../src/validators/permit.validator.js";

import type { PermitApplication } from "../../src/types/permit.js";

describe("validatePermit", () => {
    const validData: PermitApplication = {
        fullName: "Test User",
        email: "test@example.com",
        vehicleRegistration: "TC55LAS",
    };

    it("returns no errors for valid data", () => {
        const errors = validatePermit(validData);

        expect(errors).toEqual({});
    });

    it("requires a full name", () => {
        const errors = validatePermit({
            ...validData,
            fullName: "",
        });

        expect(errors.fullName).toBe("Enter your full name");
    });

    it("rejects a name containing only whitespace", () => {
        const errors = validatePermit({
            ...validData,
            fullName: "   ",
        });

        expect(errors.fullName).toBe("Enter your full name");
    });

    it("requires an email address", () => {
        const errors = validatePermit({
            ...validData,
            email: "",
        });

        expect(errors.email).toBe("Enter your email address");
    });

    it("rejects an invalid email address", () => {
        const errors = validatePermit({
            ...validData,
            email: "not-an-email",
        });

        expect(errors.email).toBe("Enter a valid email address");
    });

    it("accepts a valid email address", () => {
        const errors = validatePermit({
            ...validData,
            email: "someone@example.co.uk",
        });

        expect(errors.email).toBeUndefined();
    });

    it("requires a vehicle registration", () => {
        const errors = validatePermit({
            ...validData,
            vehicleRegistration: "",
        });

        expect(errors.vehicleRegistration).toBe(
            "Enter your vehicle registration",
        );
    });

    it("rejects a registration containing only whitespace", () => {
        const errors = validatePermit({
            ...validData,
            vehicleRegistration: "   ",
        });

        expect(errors.vehicleRegistration).toBe(
            "Enter your vehicle registration",
        );
    });

    it("returns multiple errors when all fields are empty", () => {
        const errors = validatePermit({
            fullName: "",
            email: "",
            vehicleRegistration: "",
        });

        expect(Object.keys(errors)).toHaveLength(3);
    });
});
