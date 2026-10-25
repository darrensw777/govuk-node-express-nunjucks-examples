import type { PermitApplication } from "./permit.js";

declare module "express-session" {
    interface SessionData {
        permit?: PermitApplication;
        permitSubmitted?: boolean;
    }
}
