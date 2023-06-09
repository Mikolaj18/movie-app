import {BrowserRouter} from "react-router-dom";
import {render, waitFor, screen} from "@testing-library/react";
import {CategoriesContext} from "../../Providers/CategoriesProvider";
import {categoriesData, moviesData} from "../../mocks/handlers";
import Movies from "./Movies";
import userEvent from "@testing-library/user-event";

const MockMovies = () => {
    return (
        <BrowserRouter>
            <Movies/>
        </BrowserRouter>
    );
}

beforeEach(() => {
    render(
        <CategoriesContext.Provider value={{categories: categoriesData}}>
            <MockMovies/>
        </CategoriesContext.Provider>
    );
});

describe('MoviesPage', () => {
    it('should render movies data', async () => {
        const response = await fetch('http://localhost:8800/movies');
        const data = await response.json();
        const movies = data.data;
        expect(movies.length).toEqual(moviesData.length);
    });

    it('Should handle movie delete succesfully', async () => {
        const movieId = 1;
        const response = await fetch(`http://localhost:8800/category/${movieId}`, {
            method: "DELETE",
        });

        const responseData = await response.json();
        expect(parseInt(responseData.id)).toBe(movieId);
        expect(responseData.message).toBe("Category deleted successfully");
    });
});

