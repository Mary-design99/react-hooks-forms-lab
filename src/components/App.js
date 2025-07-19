import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";
import Filter from "./Filter";
import ItemForm from "./ItemForm";
import itemData from "../data/items";

function App() {
  const [items, setItems] = useState(itemData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const filteredItems = items.filter((item) => {
    const itemNameLower = item.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    const matchesSearchTerm =
      searchTermLower === "" || itemNameLower === searchTermLower;

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      <Filter
        search={searchTerm}
        onSearchChange={handleSearchChange}
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ItemForm onItemFormSubmit={handleAddItem} />
      <ShoppingList items={filteredItems} />
    </div>
  );
}

export default App;