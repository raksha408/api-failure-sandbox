import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditAPI() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    endpoint: "",
    statusCode: 200,
    delay: 0,
    isError: false
  });

  useEffect(() => {
    loadApi();
  }, []);

  const loadApi = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get(`/apis/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setForm(res.data);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    await API.put(`/apis/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Updated!");
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Edit API</h2>

      <input value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input value={form.endpoint}
        onChange={e => setForm({ ...form, endpoint: e.target.value })}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditAPI;