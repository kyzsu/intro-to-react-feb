const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.nama_pizza}</h1>
      <p>{props.deskripsi}</p>
    </div>
  );
};

export default Pizza;
