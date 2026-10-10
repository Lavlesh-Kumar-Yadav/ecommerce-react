import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function Home() {
  const [search, setSearch] = useState("");
  const [apiProducts, setApiProducts] = useState([]);
  const categories = [
    ...new Set(apiProducts.map((product) => product.category)),
  ];

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed ");
        }
        return response.json();
      })
      .then((data) => {
        setApiProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Something Went Wrong");
        setLoading(false);
      });
  }, []);
  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("default");

  const apiFilterdProducts = apiProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLocaleLowerCase()) &&
      (category === "All" || product.category === category),
  );
  const sortedProduct = [...apiFilterdProducts];
  if (sort === "low-high") {
    sortedProduct.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    sortedProduct.sort((a, b) => b.price - a.price);
  } else if (sort === "az") {
    sortedProduct.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }
  const productsPerPage = 8;
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProduct.slice(
    startIndex,
    startIndex + productsPerPage,
  );
  const totalPages = Math.ceil(sortedProduct.length / productsPerPage);
  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search Product..."
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className="filter-sort-bar">
        <div className="category-buttons">
          <button
            className={category === "All" ? "active" : ""}
            onClick={() => {
              setCategory("All");
              setCurrentPage(1);
            }}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => {
                setCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="default">Default</option>
          <option value="low-high">price:Low → High</option>
          <option value="high-low">price: High → Low</option>
          <option value="az">A → Z</option>
        </select>
      </div>
      <div>
        <h1>API Products</h1>
        <div className="products-grid">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : sortedProduct.length === 0 ? (
            <p>No Product Found</p>
          ) : (
            currentProducts.map((product) => {
              const formattedProduct = {
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.thumbnail,
                category: product.category,
                description: product.description,
              };
              return (
                <ProductCard
                  key={formattedProduct.id}
                  product={formattedProduct}
                />
              );
            })
          )}
        </div>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;
