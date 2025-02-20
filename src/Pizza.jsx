const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.nama_pizza}</h1>
      <p>{props.deskripsi}</p>
      <img
        src={props.image ?? "https://picsum.photos/200"}
        alt={props.nama_pizza}
      />
    </div>
  );
};

// props.image ? props.image : "https://picsum.photos/200" || props.image ?? "https://picsum.photos/200"

export default Pizza;
