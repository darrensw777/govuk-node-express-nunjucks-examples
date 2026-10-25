import { Router } from "express";
import type { PermitApplication } from "../types/permit.js";
import { validatePermit } from "../validators/permit.validator.js";

const router = Router();

router.get("/apply", (req, res) => {
    res.render("application.njk", {
        title: "Your details",
        data: req.session.permit ?? {},
    });
});

router.post("/apply", (req, res) => {
    const data: PermitApplication = {
        fullName: String(req.body.fullName ?? "").trim(),
        email: String(req.body.email ?? "").trim(),
        vehicleRegistration: String(req.body.vehicleRegistration ?? "").trim(),
    };

    // Clear the old session
    req.session.permitSubmitted = false;
    req.session.permit = data;

    const errors = validatePermit(data);

    if (Object.keys(errors).length > 0) {
        const errorList = Object.entries(errors).map(([field, message]) => ({
            text: message,
            href: `#${field}`,
        }));

        return res.status(400).render("application.njk", {
            title: "Your details",
            data,
            errors,
            errorList,
        });
    }

    req.session.permit = data;
    return res.redirect("/check-answers");
});

router.get("/check-answers", (req, res) => {
    const data = req.session.permit;

    if (!data) {
        return res.redirect("/apply");
    }

    return res.render("check-answers.njk", {
        title: "Check your answers",
        data,
    });
});

router.post("/submit", (req, res) => {
    const data = req.session.permit;

    if (!data) {
        return res.redirect("/apply");
    }

    // In a real application, this is where we'd
    // save the application data to a database or API.

    // We can clear the permit from the session
    req.session.permit = undefined;

    // Simulate successful submission.
    req.session.permitSubmitted = true;

    return res.redirect("/confirmation");
});

router.get("/confirmation", (req, res) => {
    if (!req.session.permitSubmitted) {
        return res.redirect("/");
    }

    return res.render("confirmation.njk", {
        title: "Application received",
    });
});

export default router;
