function UserCard({ name, age, city, email, isOnline }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '350px' }}>
      <h4>{name}</h4>
      <p>Age: {age}</p>
      <p>City: {city}</p>
      <p>Email: {email}</p>
      <span
        style={{
          padding: "5px 10px",
          borderRadius: "15px",
          fontSize: "12px",
          background: isOnline ? "#e6fffa" : "lightgray",
          color: isOnline ? "#38a169" : "#a0aec0",
        }}
      >
        {isOnline ? "● Online" : "○ Offline"}
      </span>
    </div>
  );
}
export default UserCard;
