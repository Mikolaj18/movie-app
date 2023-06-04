import {categoriesData} from "../../mocks/handlers";
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import Category from "./Category";

const MockCategory = () => {
    return (
        <BrowserRouter>
            <Category/>
        </BrowserRouter>
    );
}

beforeEach(() => {
    render(
        <MockCategory />
    );
});

describe("Category", () => {

    it("should render input text element", () => {
       const inputTextElement = screen.getByRole("textbox");
       expect(inputTextElement).toBeInTheDocument();
    });

    it('Should fetch categories successfully', async () => {
        const response = await fetch('http://localhost:8800/categories');
        const data = await response.json();
        const categories = data.data;
        expect(categories).toEqual(categoriesData);
    });
});
