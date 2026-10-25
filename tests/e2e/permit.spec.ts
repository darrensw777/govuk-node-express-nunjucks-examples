import { test, expect } from "@playwright/test";

test.describe("Parking permit application", () => {
    test("completes the application journey", async ({ page }) => {
        // Start page
        await page.goto("/");

        await expect(
            page.getByRole("heading", {
                name: "Apply for a parking permit",
            }),
        ).toBeVisible();

        // Start application
        await page
            .getByRole("link", {
                name: "Start now",
            })
            .click();

        // Fill in details
        await page.getByLabel("Full name").fill("Darren Sweeney");

        await page.getByLabel("Email address").fill("darren@example.com");

        await page.getByLabel("Vehicle registration").fill("TC55LAS");

        // Submit form
        await page
            .getByRole("button", {
                name: "Continue",
            })
            .click();

        // Check answers
        await expect(page).toHaveURL(/\/check-answers$/);

        await expect(
            page.getByRole("heading", {
                name: "Check your answers",
            }),
        ).toBeVisible();

        await expect(page.getByText("TC55LAS")).toBeVisible();

        // Final submission
        await page
            .getByRole("button", {
                name: "Accept and submit",
            })
            .click();

        // Confirmation
        await expect(page).toHaveURL(/\/confirmation$/);

        await expect(page.getByText("Application received")).toBeVisible();
    });
});
