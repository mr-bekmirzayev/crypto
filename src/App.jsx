import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

const marketRows = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 68425,
    change: 3.42,
    volume: "$18.2B",
    market: "Crypto",
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3510,
    change: 2.18,
    volume: "$8.6B",
    market: "Crypto",
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 152.6,
    change: 4.84,
    volume: "$2.9B",
    market: "Crypto",
  },
  {
    symbol: "EUR/USD",
    name: "Euro / Dollar",
    price: 1.09,
    change: 0.64,
    volume: "$4.8B",
    market: "Forex",
  },
  {
    symbol: "USD/JPY",
    name: "Dollar / Yen",
    price: 147.12,
    change: -0.32,
    volume: "$2.1B",
    market: "Forex",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 215.4,
    change: 1.26,
    volume: "$1.2B",
    market: "Stocks",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 127.8,
    change: 2.94,
    volume: "$2.6B",
    market: "Stocks",
  },
  {
    symbol: "XAU/USD",
    name: "Gold",
    price: 2334.7,
    change: 0.88,
    volume: "$840M",
    market: "Commodities",
  },
];

const marketPulse = [
  { name: "Mon", btc: 61200, eth: 3320, eur: 1.08 },
  { name: "Tue", btc: 62940, eth: 3410, eur: 1.09 },
  { name: "Wed", btc: 63880, eth: 3465, eur: 1.1 },
  { name: "Thu", btc: 65120, eth: 3490, eur: 1.09 },
  { name: "Fri", btc: 66980, eth: 3540, eur: 1.09 },
  { name: "Sat", btc: 67740, eth: 3505, eur: 1.1 },
  { name: "Sun", btc: 68425, eth: 3510, eur: 1.09 },
];

const volumeSeries = [
  { day: "BTC", volume: 84 },
  { day: "ETH", volume: 68 },
  { day: "SOL", volume: 59 },
  { day: "EUR", volume: 46 },
  { day: "AAPL", volume: 72 },
  { day: "NVDA", volume: 88 },
];

const sentimentCards = [
  { title: "Risk appetite", value: "Bullish", tag: "+12.4%" },
  { title: "Volatility", value: "Moderate", tag: "1.8%" },
  { title: "Market cap", value: "$2.8T", tag: "+4.2%" },
];

const quickStats = [
  { label: "BTC / USD", value: "$68,425", delta: "+3.42%", tone: "up" },
  { label: "ETH / USD", value: "$3,510", delta: "+2.18%", tone: "up" },
  { label: "NASDAQ", value: "18,460", delta: "+0.72%", tone: "up" },
  { label: "USD / TRY", value: "32.94", delta: "-0.14%", tone: "down" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return marketRows.slice(0, 5);
    }

    return marketRows.filter(
      (asset) =>
        asset.name.toLowerCase().includes(query) ||
        asset.symbol.toLowerCase().includes(query) ||
        asset.market.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">N</div>
          <div>
            <p className="brand-name">NovaTrade</p>
            <span className="brand-sub">Fintech analytics</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#">Overview</a>
          <a href="#">Markets</a>
          <a href="#">Portfolio</a>
          <a href="#">News</a>
        </nav>

        <div className="topbar-actions">
          <button className="ghost-btn">Alerts</button>
          <button className="primary-btn">Trade now</button>
        </div>
      </header>

      <main className="dashboard">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">LIVE MARKET TRACKER</p>
            <h1>Crypto, forex & stock exchange data in one smart terminal.</h1>
            <p className="hero-text">
              Real-time quotes, trend indicators, and fast decision tools for
              traders who need clarity before every move.
            </p>
          </div>

          <div className="search-panel">
            <label htmlFor="market-search">Search asset</label>
            <input
              id="market-search"
              type="text"
              placeholder="Search BTC, EUR, AAPL..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="search-results">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <div key={asset.symbol} className="result-item">
                    <div>
                      <strong>{asset.symbol}</strong>
                      <span>{asset.name}</span>
                    </div>
                    <span className={asset.change >= 0 ? "up" : "down"}>
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change}%
                    </span>
                  </div>
                ))
              ) : (
                <div className="result-item empty">No assets found</div>
              )}
            </div>
          </div>
        </section>

        <section className="stats-grid">
          {quickStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small className={stat.tone}>{stat.delta}</small>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div className="chart-panel large-panel">
            <div className="panel-head">
              <div>
                <p className="panel-label">Price performance</p>
                <h2>Market pulse</h2>
              </div>
              <div className="chip-row">
                <span className="chip active">1D</span>
                <span className="chip">1W</span>
                <span className="chip">1M</span>
              </div>
            </div>

            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketPulse}>
                  <defs>
                    <linearGradient id="btcFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#6ee7ff" stopOpacity={0.7} />
                      <stop
                        offset="95%"
                        stopColor="#6ee7ff"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    <linearGradient id="ethFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.6} />
                      <stop
                        offset="95%"
                        stopColor="#7c3aed"
                        stopOpacity={0.03}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.15)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "12px",
                      color: "#e2e8f0",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="btc"
                    stroke="#67e8f9"
                    fill="url(#btcFill)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="eth"
                    stroke="#8b5cf6"
                    fill="url(#ethFill)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <aside className="side-panel">
            <div className="panel-head">
              <div>
                <p className="panel-label">Sentiment</p>
                <h2>Signals</h2>
              </div>
            </div>

            <div className="signal-list">
              {sentimentCards.map((item) => (
                <div key={item.title} className="signal-item">
                  <div>
                    <span>{item.title}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <em>{item.tag}</em>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="lower-grid">
          <div className="market-panel">
            <div className="panel-head">
              <div>
                <p className="panel-label">Watchlist</p>
                <h2>Assets</h2>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>Vol</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {marketRows.map((row) => (
                    <tr key={row.symbol}>
                      <td>
                        <div className="asset-cell">
                          <div className="asset-badge">
                            {row.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <strong>{row.symbol}</strong>
                            <span>{row.name}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        {row.market === "Forex" || row.market === "Commodities"
                          ? row.price.toFixed(row.price >= 10 ? 2 : 4)
                          : `$${row.price.toLocaleString()}`}
                      </td>
                      <td className={row.change >= 0 ? "up" : "down"}>
                        {row.change >= 0 ? "+" : ""}
                        {row.change}%
                      </td>
                      <td>{row.volume}</td>
                      <td>{row.market}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mini-panel">
            <div className="panel-head">
              <div>
                <p className="panel-label">Volume</p>
                <h2>Heat map</h2>
              </div>
            </div>

            <div className="bar-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeSeries}>
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.15)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "12px",
                      color: "#e2e8f0",
                    }}
                  />
                  <Bar dataKey="volume" radius={[8, 8, 0, 0]} fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
