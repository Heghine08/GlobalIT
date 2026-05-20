function Home() {
  return (
    <div
      style={{
        height: "89.7vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          width: "450px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#764ba2",
            marginBottom: "15px",
          }}
        >
          Home Page
        </h1>
        <h2
          style={{
            fontSize: "24px",
            color: "#444",
            marginBottom: "20px",
          }}
        >
          Welcome to my React App 👋
        </h2>
      </div>
    </div>
  );
}
export default Home;