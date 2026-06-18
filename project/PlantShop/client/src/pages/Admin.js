import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(
      decodeURIComponent(
        decoded
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
  } catch (error) {
    return null;
  }
};

function Admin() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    inStock: true,
  });
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setAuthorized(false);
      return;
    }

    const decoded = decodeToken(storedToken);
    if (decoded && decoded.role === "admin") {
      setToken(storedToken);
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  useEffect(() => {
    if (authorized) {
      fetchProducts();
    }
  }, [authorized]);

  const getAuthHeader = () => {
    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setStatusMessage("Unable to load products.");
    }
  };

  const resetForm = () => {
    setFormMode("create");
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      inStock: true,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      inStock: Boolean(formData.inStock),
    };

    if (!payload.name || !payload.price || !payload.image) {
      setStatusMessage("Name, price and image are required.");
      return;
    }

    try {
      const url =
        formMode === "create"
          ? "http://localhost:5000/api/products"
          : `http://localhost:5000/api/products/${editingId}`;
      const method = formMode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setStatusMessage(data.message || "Action failed.");
        return;
      }

      setStatusMessage(
        formMode === "create"
          ? "Product added successfully."
          : "Product updated successfully."
      );
      resetForm();
      fetchProducts();
    } catch (error) {
      setStatusMessage("Unable to save product.");
    }
  };

  const handleEdit = (product) => {
    setFormMode("edit");
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || "",
      image: product.image || "",
      category: product.category || "",
      inStock: !!product.inStock,
    });
    setStatusMessage("");
  };

  const handleDelete = async (product) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setStatusMessage(data.message || "Could not delete product.");
        return;
      }

      setRecentlyDeleted((prev) => [product, ...prev].slice(0, 5));
      setStatusMessage("Product deleted. You can restore it below.");
      fetchProducts();
    } catch (error) {
      setStatusMessage("Unable to delete product.");
    }
  };

  const handleRestore = async (deletedProduct) => {
    try {
      const payload = {
        name: deletedProduct.name,
        price: deletedProduct.price,
        description: deletedProduct.description,
        image: deletedProduct.image,
        category: deletedProduct.category,
        inStock: deletedProduct.inStock,
      };

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setStatusMessage(data.message || "Could not restore product.");
        return;
      }

      setRecentlyDeleted((prev) => prev.filter((item) => item._id !== deletedProduct._id));
      setStatusMessage(`Restored ${deletedProduct.name}.`);
      fetchProducts();
    } catch (error) {
      setStatusMessage("Unable to restore product.");
    }
  };

  const handleRestoreLastTwo = async () => {
    const itemsToRestore = recentlyDeleted.slice(0, 2);
    if (itemsToRestore.length === 0) {
      setStatusMessage("No deleted products available to restore.");
      return;
    }

    try {
      for (const deletedProduct of itemsToRestore) {
        const payload = {
          name: deletedProduct.name,
          price: deletedProduct.price,
          description: deletedProduct.description,
          image: deletedProduct.image,
          category: deletedProduct.category,
          inStock: deletedProduct.inStock,
        };

        const response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Could not restore product.");
        }
      }

      setRecentlyDeleted((prev) => prev.slice(2));
      setStatusMessage(`Restored ${itemsToRestore.length} deleted products.`);
      fetchProducts();
    } catch (error) {
      setStatusMessage(error.message || "Unable to restore deleted products.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const topSellingProducts = [...products]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 5);

  const maxSales = Math.max(
    ...topSellingProducts.map((item) => item.sales || 0),
    1
  );

  if (!authorized) {
    return (
      <div className="admin-container">
        <h1>Admin Panel</h1>
        <p className="admin-error">
          Access denied. Admin role is required.
        </p>
        <button className="btn-explore" onClick={() => navigate("/shop")}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p className="admin-subtitle">
            Manage products with create, update, and delete actions.
          </p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {statusMessage && (
        <div className="admin-status">{statusMessage}</div>
      )}

      <div className="admin-chart-panel">
        <div className="chart-header">
          <div>
            <h2>Top Selling Products</h2>
            <p>
              A quick sales overview of the most popular plants and
              their performance.
            </p>
          </div>
        </div>

        {topSellingProducts.length === 0 ||
        topSellingProducts.every((product) => !(product.sales > 0)) ? (
          <p className="chart-empty">
            No sales data yet. Purchases will appear here after
            checkout.
          </p>
        ) : (
          <div className="chart-list">
            {topSellingProducts.map((product) => (
              <div key={product._id} className="chart-item">
                <div className="chart-label">
                  <span>{product.name}</span>
                  <span>{product.sales || 0} sold</span>
                </div>
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      width: `${((product.sales || 0) / maxSales) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {recentlyDeleted.length > 0 && (
        <div className="admin-restore-panel">
          <div className="restore-header">
            <h2>Recently Deleted</h2>
            <button
              type="button"
              className="btn-logout"
              onClick={handleRestoreLastTwo}
            >
              Restore Last 2
            </button>
          </div>
          <div className="restore-list">
            {recentlyDeleted.map((product) => (
              <div key={product._id} className="restore-card">
                <span>{product.name}</span>
                <button
                  type="button"
                  className="btn-checkout"
                  onClick={() => handleRestore(product)}
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{formMode === "create" ? "Add Product" : "Edit Product"}</h2>

          <label>
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>

          <label>
            Price
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </label>

          <label>
            Description
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </label>

          <label>
            Image URL
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) =>
                setFormData({ ...formData, inStock: e.target.checked })
              }
            />
            In stock
          </label>

          <div className="admin-form-actions">
            <button className="btn-checkout" type="submit">
              {formMode === "create" ? "Add Product" : "Update Product"}
            </button>
            {formMode === "edit" && (
              <button
                type="button"
                className="btn-remove"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-table">
          <h2>Current Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card admin-card">
                <img src={product.image} alt={product.name} />
                <div className="product-card-body">
                  <h3>{product.name}</h3>
                  <p className="product-category">
                    {product.category || "Uncategorized"}
                  </p>
                  <p className="product-price">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <div className="product-actions">
                    <button
                      type="button"
                      className="btn-buy-product"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
