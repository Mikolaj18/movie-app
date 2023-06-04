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

export const moviesData = [
    {
        "id": 1,
        "title": "title1",
        "short_desc": "short1",
        "long_desc": "long1",
        "category": "cat1",
        "img": "img.jpg"
    },
    {
        "id": 2,
        "title": "title2",
        "short_desc": "short2",
        "long_desc": "long2",
        "category": "cat2",
        "img": "img2.jpg"
    },
    {
        "id": 3,
        "title": "title3",
        "short_desc": "short3",
        "long_desc": "long3",
        "category": "cat3",
        "img": "img3.jpg"
    }
];

export const handlers = [
    rest.get("http://localhost:8800/categories", (req, res, ctx) => {
        return res(
            ctx.json({
                data: categoriesData,
            })
        )
    }),
    rest.post("http://localhost:8800/categories", (req, res, ctx) => {
        const newCategory = req.body;
        const responseData = {
            id: 1,
            name: newCategory.name,
        };
        return res(ctx.status(200), ctx.json(responseData));
    }),
    rest.get("http://localhost:8800/movies", (req, res, ctx) => {
        return res(
            ctx.json({
                data: moviesData,
            })
        )
    }),
    rest.post("http://localhost:8800/movies", (req, res, ctx) => {
        const newMovie = req.body;
        const responseData = {
            id: 1,
            title: newMovie.title,
            short_desc: newMovie.short_desc,
            long_desc: newMovie.long_desc,
            category: newMovie.category,
            img: newMovie.img,
        };
        return res(ctx.status(200), ctx.json(responseData));
    }),
]