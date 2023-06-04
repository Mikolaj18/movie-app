import { rest } from "msw";

export const categoriesData = [
    {
        id: 1,
        name: "cat1",
    },
    {
        id: 2,
        name: "cat2",
    },
    {
        id: 3,
        name: "cat3",
    },
    {
        id: 4,
        name: "cat4"
    },
    {
        id: 5,
        name: "cat5",
    },
];

export const handlers = [
    rest.get("http://localhost:8800/categories", (req, res, ctx) => {
        return res(
            ctx.json({
                data: categoriesData,
            })
        )
    }),
]