function BookCard({title, author, year, pages}) {
  return (
    <div style={{border: "1px solid #ddd", padding: "15px", borderRadius: "8px", width: "350px"}}>
      <h4>{title}</h4>
      <p style={{ color: "#666" }}>by {author}</p>
      <p style={{ fontSize: "14px", color: "#999" }}>
        {year} · {pages} pages
      </p>
    </div>
  );
}
export default BookCard;
