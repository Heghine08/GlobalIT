import React from "react";

function Contact() {
  return (
    <div className="login-container">
      <div className="login-form" style={{ maxWidth: "800px" }}>
        <h3>Contact Us</h3>

        <p style={{ color: "#555", marginBottom: "24px" }}>
          Have questions about our plants or your order?
          We'd love to hear from you!
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            margin: "40px 0",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              width: "250px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Address</h3>
            <p>123 Green Street, Plant City</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              width: "250px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Phone</h3>
            <p>+374 99 123456</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              width: "250px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Email</h3>
            <p>plantshop@gmail.com</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          />

          <input
            type="email"
            placeholder="Your Email"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          ></textarea>

          <button type="button" className="btn-buy">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;