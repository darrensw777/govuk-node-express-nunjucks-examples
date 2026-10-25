import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import permitRoutes from "./routes/permit.routes.js";
import session from "express-session";

const app = express();
const PORT = 3000;

nunjucks.configure(
    [
        path.join(process.cwd(), "views"),
        path.join(process.cwd(), "node_modules/govuk-frontend/dist"),
    ],
    {
        autoescape: true,
        express: app,
        noCache: true,
    },
);

app.set("view engine", "njk");

const govukPath = path.join(
    process.cwd(),
    "node_modules/govuk-frontend/dist/govuk",
);

app.use(
    session({
        secret:
            process.env.SESSION_SECRET ?? "development-only-secret-change-me",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 1000 * 60 * 30,
        },
    }),
);

app.use(
    "/govuk",
    express.static(govukPath, {
        index: false,
    }),
);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(permitRoutes);

app.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Apply for a parking permit",
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
