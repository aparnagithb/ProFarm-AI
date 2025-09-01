import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";  

// API calls (replace localhost with backend URL)
const api = {
  getFarms: async () => fetch("http://localhost:5000/farms").then((r) => r.json()),
  addFarm: async (data) =>
    fetch("http://localhost:5000/farms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  getEquipment: async () => fetch("http://localhost:5000/equipment").then((r) => r.json()),
  addEquipment: async (data) =>
    fetch("http://localhost:5000/equipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  getCrops: async () => fetch("http://localhost:5000/crops").then((r) => r.json()),
  addCrop: async (data) =>
    fetch("http://localhost:5000/crops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  getLivestock: async () => fetch("http://localhost:5000/livestock").then((r) => r.json()),
  addLivestock: async (data) =>
    fetch("http://localhost:5000/livestock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};

export default function FarmerProfile({ userId }) {
  const [data, setData] = useState({
    farms: [],
    equipment: [],
    crops: [],
    livestock: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // ⬅️ hook for navigation


  const loadData = async () => {
    const farms = await api.getFarms();
    const equipment = await api.getEquipment();
    const crops = await api.getCrops();
    const livestock = await api.getLivestock();
    setData({ farms, equipment, crops, livestock });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading farmer profile...</p>;

  return (
    <div
      style={{
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        backgroundColor:"#343541",
        gap: "24px",
      }}
    >
      {/* Back button */}
      <div style={{ gridColumn: "1 / -1", marginBottom: "16px" }}>
        <Button variant="outlined" onClick={() => navigate("/")}
          style={
          { borderColor: "#40916c",
          color: "#40916c",}
          }>
          ← Back to Home
        </Button>
      </div>

      <ProfileSection
        title="Farms"
        items={data.farms}
        fields={[
          "farm_name",
          "latitude",
          "longitude",
          "street",
          "city",
          "state",
          "zip_code",
          "country",
          "farm_size_acres",
          "notes",
        ]}
        onAdd={api.addFarm}
        reload={loadData}
        userId={userId}
      />

      <ProfileSection
        title="Equipment"
        items={data.equipment}
        fields={["equipment_type", "make", "model", "status"]}
        onAdd={api.addEquipment}
        reload={loadData}
        userId={userId}
      />

      <ProfileSection
        title="Crop Production"
        items={data.crops}
        fields={[
          "crop_name",
          "variety",
          "season",
          "planting_date",
          "harvest_date",
          "field_number",
          "area_acres",
          "yield_per_acre_bushels",
          "soil_type",
          "irrigation_method",
          "fertilizer_applications",
          "pest_disease_status",
          "current_status",
        ]}
        onAdd={api.addCrop}
        reload={loadData}
        userId={userId}
      />

      <ProfileSection
        title="Livestock"
        items={data.livestock}
        fields={["animal_type", "breed", "count", "health_status"]}
        onAdd={api.addLivestock}
        reload={loadData}
        userId={userId}
      />
    </div>
  );
}

// Generic Section Component
function ProfileSection({ title, items, fields, onAdd, reload, userId }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleChange = (field, value) =>
    setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    console.log("Submitting:", { ...form, user_id: userId });
    await onAdd({ ...form, user_id: userId });
    setOpen(false);
    setForm({});
    reload();
  };

  return (
    <Card style={{backgroundColor:"#7d9087ff"}}>
      <CardHeader
        title={title}
        action={
          <Button variant="contained" onClick={() => setOpen(true)}         style={{ backgroundColor: "#40916c", color: "#fff" }}
>
            + Add
          </Button>
        }
      />
      <CardContent>
        {items.length === 0 ? (
          <p style={{ color: "#bdbdbd", fontSize: "14px" }}>
            No {title.toLowerCase()} added yet.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item, i) => (
              <li
                key={i}
                style={{
                  padding: "12px",
                  background: "#343541",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  border: "1px solid #40916c",
                  
                }}
              >
                {fields.map((f) => (
                  <div key={f} style={{ fontSize: "14px", color: "#e0e0e0" }}>
                    <strong style={{ color: "#40916c" }}>{f}:</strong> {item[f]}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      {/* Dialog for adding new entry */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add {title}</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
            {fields.map((field) => (
              <TextField
                key={field}
                label={field.replace(/_/g, " ")}
                value={form[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                fullWidth
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
