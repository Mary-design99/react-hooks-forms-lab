import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App"; 
import "@testing-library/jest-dom";

const testData = [
  { id: "1", name: "Yogurt", category: "Dairy" },
  { id: "2", name: "Pomegranate", category: "Produce" },
  { id: "3", name: "Lettuce", category: "Produce" },
  { id: "4", name: "String Cheese", category: "Dairy" },
  { id: "5", name: "Swiss Cheese", category: "Dairy" },
  { id: "6", name: "Cookies", category: "Dessert" },
];

describe("Filter component functionality", () => {
  test("the shopping filters based on the search term to include full matches", () => {
    render(<App />);

    const searchInput = screen.queryByPlaceholderText(/Search/);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: "Yogurt" },
    });

    expect(screen.getByText("Yogurt")).toBeInTheDocument();
    expect(screen.queryByText("Pomegranate")).not.toBeInTheDocument();
    expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
    expect(screen.queryByText("String Cheese")).not.toBeInTheDocument();
    expect(screen.queryByText("Swiss Cheese")).not.toBeInTheDocument();
    expect(screen.queryByText("Cookies")).not.toBeInTheDocument();
  });
});