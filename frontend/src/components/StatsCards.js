function StatsCards({ apis }) {

  const total = apis.length;
  const success = apis.filter(a => a.statusCode === 200).length;
  const errors = apis.filter(a => a.statusCode >= 400).length;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

      <div className="card">
        <h3>Total APIs</h3>
        <p>{total}</p>
      </div>

      <div className="card">
        <h3>Success APIs</h3>
        <p>{success}</p>
      </div>

      <div className="card">
        <h3>Error APIs</h3>
        <p>{errors}</p>
      </div>

    </div>
  );
}

export default StatsCards;