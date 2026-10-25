import type { PermitApplication, PermitErrors } from "../types/permit.js";

export function validatePermit(data: PermitApplication): PermitErrors {
    const errors: PermitErrors = {};

    if (!data.fullName.trim()) {
        errors.fullName = "Enter your full name";
    }

    if (!data.email.trim()) {
        errors.email = "Enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Enter a valid email address";
    }

    if (!data.vehicleRegistration.trim()) {
        errors.vehicleRegistration = "Enter your vehicle registration";
    }

    return errors;
}
