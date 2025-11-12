

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

export default function MarketProfile({userId}) {
  const [state, setState] = useState("Tamil Nadu");
  const [commodity, setCommodity] = useState("Onion");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [insight, setInsight] = useState("");

  // ✅ Add your API Key here
  const API_KEY ="579b464db66ec23bdd000001096f739ba32e4c136ef9106285726c08" ;
  const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

  async function fetchMarketPrices() {
    setLoading(true);
    setInsight("");

    try {
      const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?format=json&limit=25&api-key=${API_KEY}&filters[state]=${encodeURIComponent(
        state
      )}&filters[commodity]=${encodeURIComponent(commodity)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.records) {
        setResults(data.records);
        generateInsight(data.records);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.log("API ERROR:", err);
    }
    setLoading(false);
  }

  // ✅ Recommendation Engine
  function generateInsight(records) {
    if (!records || records.length === 0) {
      setInsight("No market data found. Try another state/commodity.");
      return;
    }

    let modalPrices = records.map((r) => parseInt(r.modal_price));
    const avg = Math.round(
      modalPrices.reduce((a, b) => a + b, 0) / modalPrices.length
    );
    const maxPrice = Math.max(...modalPrices);
    const minPrice = Math.min(...modalPrices);

    const bestMarket = records.find(
      (r) => parseInt(r.modal_price) === maxPrice
    );

    const worstMarket = records.find(
      (r) => parseInt(r.modal_price) === minPrice
    );

    setInsight(
      `📌 **Market Recommendation for ${commodity} in ${state}**
      
✅ **Best Selling Market:** ${bestMarket.market}, ${bestMarket.district}  
✅ **Modal Price:** ₹${maxPrice}

⚠️ **Lowest Price Market:** ${worstMarket.market}, ${worstMarket.district} (₹${minPrice})

📊 **Average Market Price:** ₹${avg}

💡 **Recommendation:**  
Sell your crop in **${bestMarket.market}** for maximum profit.  
Avoid selling in **${worstMarket.market}** due to low demand or price dip.

🌾 Consider checking weekly trends — high fluctuations indicate good opportunities for short-term selling.`
    );
  }

  return (
    <div style={{ padding: "24px", background: "#343541", minHeight: "100vh" }}>
      <Card style={{ color:"white"  ,background: "#116530", marginBottom: "24px" }}>
        <CardHeader title="Market Price Dashboard" />
        <CardContent>
          <div style={{ color:"white"  ,display: "flex", gap: "16px", marginBottom: "16px" }}>
            <TextField
              label="State"
              value={state}
              style={{ color:"white"}}
              onChange={(e) => setState(e.target.value)}
              fullWidth
            />
            <TextField
              label="Commodity"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              style={{ background: "#116530" }}
              onClick={fetchMarketPrices}
            >
              Search
            </Button>
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {insight && (
                <div
                  style={{
                    background: "#343541",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #40916c",
                    marginBottom: "20px",
                    color: "#fff",
                    whiteSpace: "pre-line",
                  }}
                >
                  {insight}
                </div>
              )}

              {results.length > 0 && (
                <table
                  style={{
                    width: "100%",
                    background: "#343541",
                    borderRadius: "8px",
                    color: "white",
                    borderCollapse: "collapse",
                    border: "1px solid #40916c",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#40916c" }}>
                      <th>Market</th>
                      <th>District</th>
                      <th>Min Price</th>
                      <th>Max Price</th>
                      <th>Modal Price</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td>{r.market}</td>
                        <td>{r.district}</td>
                        <td>₹{r.min_price}</td>
                        <td>₹{r.max_price}</td>
                        <td>₹{r.modal_price}</td>
                        <td>{r.arrival_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}