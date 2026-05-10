const ProfileCard = ({ name, avatar, bio, followers }) => {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column",  border: "1px solid #ccc", padding: "10px", width: "200px" }}>
      <img
        src={avatar}
        alt={name}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
        }}
      />
      <h3>{name}</h3>
      <p>{bio}</p>
      <p>Հետևորդներ: {followers}</p>
      {followers > 1000 && (
        <span style={{ backgroundColor: "gold", color:"white", padding: "5px", width:"50px"}}>Popular</span>
      )}
    </div>
  );
};
export default ProfileCard;
