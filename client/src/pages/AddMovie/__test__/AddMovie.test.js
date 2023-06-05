import {render, screen, waitFor, act} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import AddMovie from "../AddMovie";
import {CategoriesContext} from "../../../Providers/CategoriesProvider";
import {BrowserRouter} from "react-router-dom";
import {categoriesData} from "../../../mocks/handlers";

const MockAddMovie = () => {
    return (
        <BrowserRouter>
            <AddMovie/>
        </BrowserRouter>
    );
}

beforeEach(() => {
    render(
        <CategoriesContext.Provider value={{categories: categoriesData}}>
            <MockAddMovie/>
        </CategoriesContext.Provider>
    );
});


const typeIntoForm = ({title, shortDesc, longDesc}) => {
    const titleInputElement = screen.getByLabelText("Tytuł");
    const shortDescInputElement = screen.getByLabelText("Zajawka");
    const longDescInputElement = screen.getByLabelText("Długi tytuł");

    if (titleInputElement) {
        userEvent.type(titleInputElement, title);
    }
    if (shortDescInputElement) {
        userEvent.type(shortDescInputElement, shortDesc);
    }
    if (longDescInputElement) {
        userEvent.type(longDescInputElement, longDesc);
    }

    return {
        titleInputElement,
        shortDescInputElement,
        longDescInputElement,
    }
}

const clickOnSubmitButton = () => {
    const submitBtnElement = screen.getByRole("button");
    userEvent.click(submitBtnElement);
}

describe('AddMovie', () => {
    describe("Text inputs elements", () => {
        it('Should render all text inputs elements', () => {
            const textInputsElements = screen.getAllByRole("textbox");
            expect(textInputsElements).toHaveLength(3);
        });

        it('Should inputs elements be initially empty', () => {
            const textInputsElements = screen.getAllByRole("textbox");
            textInputsElements.forEach(element => {
                expect(element.value).toBe("");
            });
        });

        it('Should be able to change title', async () => {
            await act(async () => {
                const {titleInputElement} = typeIntoForm({title: "Puss in Boots"});
                expect(titleInputElement.value).toBe("Puss in Boots");
            });
        });

        it('Should be able to change short description', async () => {
            await act(async () => {
                const {shortDescInputElement} = typeIntoForm({shortDesc: "lovely kitty!"});
                expect(shortDescInputElement.value).toBe("lovely kitty!");

            });
        });

        it('Should be able to change long description', async () => {
            await act(async () => {
                const {longDescInputElement} = typeIntoForm({longDesc: "Great movie!"});
                expect(longDescInputElement.value).toBe("Great movie!");
            })
        });

    });

    describe("File input element", () => {
        it('Should render file input element', () => {
            const fileInputElement = screen.getByLabelText(/obraz/i);
            expect(fileInputElement).toBeInTheDocument();
        });

        it('Should file input be initially empty', () => {
            const fileInputElement = screen.getByLabelText(/obraz/i);
            expect(fileInputElement.files).toHaveLength(0);
        });
    });

    describe("Select element", () => {
        it('Should render select element', () => {
            const selectElement = screen.getByRole("combobox");
            expect(selectElement).toBeInTheDocument();
        });

        it("Select element should render categories", async () => {
            const response = await fetch('http://localhost:8800/categories');
            const data = await response.json();
            const categories = data.data;

            await waitFor(() => {
                categories.forEach(category => {
                    expect(screen.getByText(category.name)).toBeInTheDocument();
                });
            })
        });

        it("Should be able to change category", async () => {
            const selectInput = screen.getByRole('combobox');
            await act(async () => {
                userEvent.selectOptions(selectInput, "cat2");
            });
            expect(selectInput.value).toBe("cat2");
        });

        it("Should render title error message", async () => {
            expect(screen.queryByText(/Nazwa kategorii nie może być pusta!/i)).not.toBeInTheDocument();

            await act(async () => {
                typeIntoForm({
                    title: "",
                    shortDesc: "test",
                    longDesc: "test",
                })
                clickOnSubmitButton();
            });
            expect(screen.queryByText(/Nazwa kategorii nie może być pusta!/i)).toBeInTheDocument();
        });

        it("Should render short description error message", async () => {
            expect(screen.queryByText(/Zajawka nie może być pusta!/i)).not.toBeInTheDocument();
            await act(async () => {
                typeIntoForm({
                    title: "test",
                    shortDesc: "",
                    longDesc: "test",
                })
                clickOnSubmitButton();
            });
            expect(screen.queryByText(/Zajawka nie może być pusta!/i)).toBeInTheDocument();
        });

        it("Should render long description error message", async () => {
            expect(screen.queryByText(/Opis nie może być pusty!/i)).not.toBeInTheDocument();
            await act(async () => {
                typeIntoForm({
                    title: "test",
                    shortDesc: "test",
                    longDesc: "",
                })
                clickOnSubmitButton();
            });
            expect(screen.queryByText(/Opis nie może być pusty!/i)).toBeInTheDocument();
        });

        describe("HTTP requests", () => {
            it("Should handle successful movie creation", async () => {
                const newMovie = {
                    title: "newMovie",
                    short_desc: "movieShortDesc",
                    long_desc: "movieLongDesc",
                    category: "cat1",
                    img: "img.jpg",
                };
                const response = await fetch("http://localhost:8800/movies", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newMovie),
                });

                expect(response.status).toBe(200);
                const responseData = await response.json();
                expect(responseData.id).toBeDefined();
                expect(responseData.name).toBe(newMovie.name);
            });

            it('Should handle movie update succesfully', async () => {
                const movieId = 1;
                const updatedMovie = {
                    title: "updatedMovie",
                    short_desc: "updatedMovieShortDesc",
                    long_desc: "updatedMovieLongDesc",
                    category: "cat2",
                    img: "img2.jpg",
                };
                const response = await fetch(`http://localhost:8800/movie/${movieId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedMovie),
                });
                expect(response.status).toBe(200);

                const responseData = await response.json();
                expect(parseInt(responseData.id)).toBe(movieId);
                expect(responseData.name).toBe(updatedMovie.name);
            });
        });
    });
});