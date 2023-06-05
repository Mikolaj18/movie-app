import {categoriesData} from "../../mocks/handlers";
import {act, render, screen, waitFor} from '@testing-library/react';
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
        <MockCategory/>
    );
});

describe("Category", () => {
    it("should render input text element", () => {
        const inputTextElement = screen.getByRole("textbox");
        expect(inputTextElement).toBeInTheDocument();
    });

    it("Should input element be initially empty", () => {
        const inputTextElement = screen.getByRole("textbox");
        expect(inputTextElement.value).toBe("");
    });

    it('Should be able to change category text input', async () => {
        const inputTextElement = screen.getByRole("textbox");

        await act(async () => {
            userEvent.type(inputTextElement, "ExampleCategory");
        })
        expect(inputTextElement.value).toBe("ExampleCategory");
    });

    it("Should render category error message", async () => {
        const inputTextElement = screen.getByRole("textbox");
        const submitButtonElement = screen.getByRole("button", {name: "Dodaj kategorię"});
        expect(screen.queryByText(/Nazwa kategorii nie może być pusta!/i)).not.toBeInTheDocument();
        await act(async () => {
            userEvent.type(inputTextElement, "");
            userEvent.click(submitButtonElement);
        });
        expect(screen.queryByText(/Nazwa kategorii nie może być pusta!/i)).toBeInTheDocument();
    });

    describe("HTTP Requests", () => {
        it('Should fetch categories successfully', async () => {
            const response = await fetch('http://localhost:8800/categories');
            const data = await response.json();
            const categories = data.data;
            expect(categories).toEqual(categoriesData);
        });

        it("Should handle successful category creation", async () => {
            const newCategory = {
                name: "NewCategory",
            };
            const response = await fetch("http://localhost:8800/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            });

            expect(response.status).toBe(200);
            const responseData = await response.json();
            expect(responseData.id).toBeDefined();
            expect(responseData.name).toBe(newCategory.name);
        });
    });
});
