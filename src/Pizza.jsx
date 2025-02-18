const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.nama_pizza}</h1>
      <p>{props.deskripsi}</p>
      <img src={props.image} alt={props.nama_pizza} />
    </div>
  );
};

export default Pizza;
