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

// API calls (replace localhost with your backend URL)
const api = {
  getSellerLinks: async (userId) =>
    fetch(`http://localhost:5000/seller_market_link?user_id=${userId}`).then((r) => r.json()),

  addSellerLink: async (data) =>
    fetch("http://localhost:5000/seller_market_link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  getFarmBudgets: async (userId) =>
    fetch(`http://localhost:5000/farm_budget?user_id=${userId}`).then((r) => r.json()),

  addFarmBudget: async (data) =>
    fetch("http://localhost:5000/farm_budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};

export default function FinancialProfile({ userId }) {
  const [data, setData] = useState({
    sellerLinks: [],
    budgets: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    const [sellerLinks, budgets] = await Promise.all([
      api.getSellerLinks(userId),
      api.getFarmBudgets(userId),
    ]);

    setData({ sellerLinks, budgets });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading market profile...</p>;

  return (
    <div
      style={{
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: "#145a32",
        gap: "24px",
      }}
    >
      {/* Back button */}
      <div style={{ gridColumn: "1 / -1", marginBottom: "16px" }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          style={{ borderColor: "#40916c", color: "#40916c" }}
        >
          ← Back to Home
        </Button>
      </div>

      {/* Seller Market Link Section */}
      <ProfileSection
        title="Seller Market Link"
        items={data.sellerLinks}
        fields={[
          "market_name",
          "seller_type",
          "product_categories",
          "available_equipment",
          "payment_terms",
          "equipment_status",
          "farmer_preference_reason",
          "latitude",
          "longitude",
        ]}
        onAdd={api.addSellerLink}
        reload={loadData}
        userId={userId}
      />

      {/* Farm Budget Section */}
      <ProfileSection
        title="Farm Budget"
        items={data.budgets}
        fields={[
          "available_budget_in_inr",
          "credit_limit_in_inr",
          "current_debt_in_inr",
          "risk_appetite",
          "past_trade_performance",
          "equipment_ownership",
          "logistics_capability",
          "investment_flexibility",
        ]}
        onAdd={api.addFarmBudget}
        reload={loadData}
        userId={userId}
      />
    </div>
  );
}

// Reusable Profile Section component
function ProfileSection({ title, items, fields, onAdd, reload, userId }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    await onAdd({ ...form, user_id: userId });
    setOpen(false);
    setForm({});
    reload();
  };

  return (
    <Card style={{ backgroundColor: "#7d9087ff" }}>
      <CardHeader
        title={title}
        action={
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            style={{ backgroundColor: "#40916c", color: "#fff" }}
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
                    <strong style={{ color: "#40916c" }}>{f}:</strong>{" "}
                    {item[f]}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      {/* Add Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add {title}</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "12px",
            }}
          >
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
