import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
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
    high: 69210,
    low: 66240,
    sentiment: "Strong buy",
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3510,
    change: 2.18,
    volume: "$8.6B",
    market: "Crypto",
    high: 3585,
    low: 3340,
    sentiment: "Bullish",
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 152.6,
    change: 4.84,
    volume: "$2.9B",
    market: "Crypto",
    high: 159.8,
    low: 142.2,
    sentiment: "Breaking out",
  },
  {
    symbol: "EUR/USD",
    name: "Euro / Dollar",
    price: 1.09,
    change: 0.64,
    volume: "$4.8B",
    market: "Forex",
    high: 1.11,
    low: 1.07,
    sentiment: "Range bound",
  },
  {
    symbol: "USD/JPY",
    name: "Dollar / Yen",
    price: 147.12,
    change: -0.32,
    volume: "$2.1B",
    market: "Forex",
    high: 148.2,
    low: 146.1,
    sentiment: "Cooling",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 215.4,
    change: 1.26,
    volume: "$1.2B",
    market: "Stocks",
    high: 218.2,
    low: 209.4,
    sentiment: "Positive drift",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 127.8,
    change: 2.94,
    volume: "$2.6B",
    market: "Stocks",
    high: 130.6,
    low: 121.1,
    sentiment: "Momentum",
  },
  {
    symbol: "XAU/USD",
    name: "Gold",
    price: 2334.7,
    change: 0.88,
    volume: "$840M",
    market: "Commodities",
    high: 2360.4,
    low: 2308.1,
    sentiment: "Steady",
  },
];

const marketTabs = ["All", "Crypto", "Forex", "Stocks", "Commodities"];

const chartSeries = {
  "1D": [
    { label: "Mon", value: 62 },
    { label: "Tue", value: 63.5 },
    { label: "Wed", value: 65.2 },
    { label: "Thu", value: 66.8 },
    { label: "Fri", value: 68.1 },
    { label: "Sat", value: 69.2 },
    { label: "Sun", value: 70.6 },
  ],
  "1W": [
    { label: "M", value: 58 },
    { label: "T", value: 61 },
    { label: "W", value: 63 },
    { label: "T", value: 66 },
    { label: "F", value: 67.5 },
    { label: "S", value: 68.7 },
    { label: "S", value: 70.6 },
  ],
  "1M": [
    { label: "W1", value: 50 },
    { label: "W2", value: 54 },
    { label: "W3", value: 58 },
    { label: "W4", value: 62 },
    { label: "W5", value: 67 },
    { label: "W6", value: 70.6 },
  ],
};

const portfolioData = [
  { name: "Crypto", value: 48, color: "#67e8f9" },
  { name: "Stocks", value: 29, color: "#8b5cf6" },
  { name: "Forex", value: 15, color: "#34d399" },
  { name: "Commodities", value: 8, color: "#fbbf24" },
];

const volumeSeries = [
  { day: "BTC", volume: 84 },
  { day: "ETH", volume: 68 },
  { day: "SOL", volume: 59 },
  { day: "EUR", volume: 46 },
  { day: "AAPL", volume: 72 },
  { day: "NVDA", volume: 88 },
];

const featureCards = [
  {
    title: "AI-driven signals",
    text: "Analyze momentum, volatility and macro conditions in real time.",
    icon: "⚡",
  },
  {
    title: "Multi-market access",
    text: "Track crypto, forex, stocks and commodities from one dashboard.",
    icon: "🌍",
  },
  {
    title: "Fast execution",
    text: "React to price changes with smart alerts and low-latency tools.",
    icon: "🚀",
  },
  {
    title: "Risk controls",
    text: "Use leverage limits and position sizing guidance before entry.",
    icon: "🛡️",
  },
];

const steps = [
  {
    title: "1. Create account",
    text: "Set up your profile and verify your account in minutes.",
  },
  {
    title: "2. Fund wallet",
    text: "Deposit funds with cards, bank transfer or stablecoins.",
  },
  {
    title: "3. Trade with insight",
    text: "Use screeners, analytics and automation to act faster.",
  },
];

const testimonials = [
  {
    name: "Mila R.",
    role: "Swing trader",
    quote:
      "This workflow helped me spot breakout setups twice faster than before.",
  },
  {
    name: "Dorian P.",
    role: "Portfolio manager",
    quote:
      "The spread of tools across assets is exactly what I needed in one place.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    features: ["Basic market data", "5 alerts", "Email support"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    features: ["Full analytics suite", "Unlimited alerts", "Priority support"],
    highlight: true,
  },
  {
    name: "Elite",
    price: "$99",
    features: ["AI insights", "VIP desk", "Advanced automation"],
    highlight: false,
  },
];

const quickStats = [
  { label: "BTC / USD", value: "$68,425", delta: "+3.42%", tone: "up" },
  { label: "ETH / USD", value: "$3,510", delta: "+2.18%", tone: "up" },
  { label: "NASDAQ", value: "18,460", delta: "+0.72%", tone: "up" },
  { label: "USD / TRY", value: "32.94", delta: "-0.14%", tone: "down" },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);

const formatAssetPrice = (asset) => {
  if (asset.market === "Forex" || asset.market === "Commodities") {
    return asset.price >= 10
      ? `$${asset.price.toFixed(2)}`
      : `$${asset.price.toFixed(4)}`;
  }

  return `$${asset.price.toLocaleString()}`;
};

function App() {
  const [marketFilter, setMarketFilter] = useState("All");
  const [chartRange, setChartRange] = useState("1W");
  const [searchTerm, setSearchTerm] = useState("");
  const [tradeAmount, setTradeAmount] = useState(2500);
  const [leverage, setLeverage] = useState(10);
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD");

  const filteredAssets = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return marketRows.filter((asset) => {
      const matchesFilter =
        marketFilter === "All" || asset.market === marketFilter;
      const matchesQuery =
        !query ||
        asset.name.toLowerCase().includes(query) ||
        asset.symbol.toLowerCase().includes(query) ||
        asset.market.toLowerCase().includes(query);

      return matchesFilter && matchesQuery;
    });
  }, [marketFilter, searchTerm]);

  const activeAsset =
    marketRows.find((item) => item.symbol === selectedAsset) ||
    filteredAssets[0] ||
    marketRows[0];

  const chartData = chartSeries[chartRange] ?? chartSeries["1W"];

  const projectedPnl =
    tradeAmount * (activeAsset.change / 100) * (leverage / 2);
  const positionValue = tradeAmount * leverage;
  const riskScore = Math.min(
    100,
    Math.round(Math.abs(activeAsset.change) * leverage * 6 + 28),
  );

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
          <a href="#overview">Overview</a>
          <a href="#markets">Markets</a>
          <a href="#calculator">Calculator</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="topbar-actions">
          <button className="ghost-btn" type="button">
            Alerts
          </button>
          <button className="primary-btn" type="button">
            Trade now
          </button>
        </div>
      </header>

      <main className="dashboard">
        <section className="hero-panel" id="overview">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="eyebrow">LIVE MARKET TRACKER</span>
              <span className="live-dot">● Live</span>
            </div>
            <h1>Crypto, forex & stock exchange data in one smart terminal.</h1>
            <p className="hero-text">
              Get instant prices, deep market context and risk-aware execution
              tools built for confident trading decisions around the clock.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" type="button">
                Open account
              </button>
              <button className="ghost-btn" type="button">
                View markets
              </button>
            </div>

            <div className="trust-row">
              <div>
                <strong>2.4M+</strong>
                <span>active traders</span>
              </div>
              <div>
                <strong>99.98%</strong>
                <span>uptime</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>coverage</span>
              </div>
            </div>
          </div>

          <div className="search-panel">
            <div className="panel-head compact-head">
              <div>
                <p className="panel-label">Asset finder</p>
                <h2>Search market</h2>
              </div>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search BTC, EUR, AAPL..."
              aria-label="Search market"
            />

            <div className="market-tabs" aria-label="Market filter tabs">
              {marketTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={
                    marketFilter === tab ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => setMarketFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="search-results">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <button
                    key={asset.symbol}
                    type="button"
                    className={
                      selectedAsset === asset.symbol
                        ? "result-item active"
                        : "result-item"
                    }
                    onClick={() => setSelectedAsset(asset.symbol)}
                  >
                    <div>
                      <strong>{asset.symbol}</strong>
                      <span>{asset.name}</span>
                    </div>
                    <span className={asset.change >= 0 ? "up" : "down"}>
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change}%
                    </span>
                  </button>
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

        <section className="overview-grid" id="markets">
          <div className="chart-panel large-panel">
            <div className="panel-head">
              <div>
                <p className="panel-label">Price performance</p>
                <h2>Market pulse</h2>
              </div>

              <div className="chip-row">
                {Object.keys(chartSeries).map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={chartRange === range ? "chip active" : "chip"}
                    onClick={() => setChartRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="market-summary">
              <div className="price-stack">
                <span className="market-label">{selectedAsset}</span>
                <strong>{formatAssetPrice(activeAsset)}</strong>
                <small className={activeAsset.change >= 0 ? "up" : "down"}>
                  {activeAsset.change >= 0 ? "+" : ""}
                  {activeAsset.change}% today
                </small>
              </div>

              <div className="mini-metrics">
                <div>
                  <span>24H high</span>
                  <strong>
                    {formatAssetPrice({
                      ...activeAsset,
                      price: activeAsset.high,
                    })}
                  </strong>
                </div>
                <div>
                  <span>24H low</span>
                  <strong>
                    {formatAssetPrice({
                      ...activeAsset,
                      price: activeAsset.low,
                    })}
                  </strong>
                </div>
                <div>
                  <span>Signal</span>
                  <strong>{activeAsset.sentiment}</strong>
                </div>
              </div>
            </div>

            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.7} />
                      <stop
                        offset="95%"
                        stopColor="#67e8f9"
                        stopOpacity={0.08}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.15)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
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
                    dataKey="value"
                    stroke="#67e8f9"
                    strokeWidth={3}
                    fill="url(#areaFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <aside className="trade-panel" id="calculator">
            <div className="panel-head">
              <div>
                <p className="panel-label">Trade planner</p>
                <h2>Position setup</h2>
              </div>
            </div>

            <div className="calculator-block">
              <label htmlFor="trade-amount">
                Trade amount
                <span>{formatCurrency(tradeAmount)}</span>
              </label>
              <input
                id="trade-amount"
                type="range"
                min="500"
                max="50000"
                step="500"
                value={tradeAmount}
                onChange={(event) => setTradeAmount(Number(event.target.value))}
              />

              <label htmlFor="leverage-control">
                Leverage
                <span>x{leverage}</span>
              </label>
              <input
                id="leverage-control"
                type="range"
                min="1"
                max="20"
                step="1"
                value={leverage}
                onChange={(event) => setLeverage(Number(event.target.value))}
              />

              <div className="calc-summary">
                <div>
                  <span>Entry value</span>
                  <strong>{formatCurrency(positionValue)}</strong>
                </div>
                <div>
                  <span>Risk score</span>
                  <strong>{riskScore}/100</strong>
                </div>
              </div>

              <div className="projection-box">
                <span>Projected P&amp;L</span>
                <strong className={projectedPnl >= 0 ? "up" : "down"}>
                  {projectedPnl >= 0 ? "+" : ""}
                  {formatCurrency(projectedPnl)}
                </strong>
              </div>
            </div>
          </aside>
        </section>

        <section className="watchlist-grid">
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
                    <tr
                      key={row.symbol}
                      className={
                        selectedAsset === row.symbol ? "selected-row" : ""
                      }
                    >
                      <td>
                        <button
                          type="button"
                          className="asset-picker"
                          onClick={() => setSelectedAsset(row.symbol)}
                        >
                          <div className="asset-badge">
                            {row.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <strong>{row.symbol}</strong>
                            <span>{row.name}</span>
                          </div>
                        </button>
                      </td>
                      <td>{formatAssetPrice(row)}</td>
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

          <div className="portfolio-panel">
            <div className="panel-head">
              <div>
                <p className="panel-label">Allocation</p>
                <h2>Portfolio mix</h2>
              </div>
            </div>

            <div className="portfolio-visual">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={portfolioData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={76}
                    paddingAngle={3}
                  >
                    {portfolioData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Allocation"]}
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "12px",
                      color: "#e2e8f0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="legend-list">
              {portfolioData.map((item) => (
                <div key={item.name} className="legend-item">
                  <span
                    className="legend-swatch"
                    style={{ background: item.color }}
                  />
                  <span>{item.name}</span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <p className="panel-label">Why NovaTrade</p>
            <h2>Built for fast and confident decisions.</h2>
          </div>

          <div className="feature-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="feature-card">
                <div className="feature-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="insights-section">
          <div className="step-panel">
            <div className="section-heading left-align">
              <p className="panel-label">How it works</p>
              <h2>Start in three steps.</h2>
            </div>

            <div className="step-list">
              {steps.map((step) => (
                <div key={step.title} className="step-item">
                  <span className="step-index">{step.title.split(".")[0]}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonials-panel">
            <div className="section-heading left-align">
              <p className="panel-label">Trader notes</p>
              <h2>What users say.</h2>
            </div>

            <div className="testimonial-list">
              {testimonials.map((person) => (
                <div key={person.name} className="testimonial-item">
                  <div className="person-head">
                    <div className="avatar">{person.name.charAt(0)}</div>
                    <div>
                      <strong>{person.name}</strong>
                      <span>{person.role}</span>
                    </div>
                  </div>
                  <p>“{person.quote}”</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="section-heading">
            <p className="panel-label">Plans</p>
            <h2>Choose the right market edge.</h2>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.highlight ? "pricing-card highlight" : "pricing-card"
                }
              >
                <span className="plan-tag">{plan.name}</span>
                <h3>
                  {plan.price}
                  <small>/mo</small>
                </h3>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={plan.highlight ? "primary-btn" : "ghost-btn"}
                >
                  {plan.highlight ? "Get Pro" : "Try free"}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="panel-label">Ready to trade</p>
            <h2>Turn market data into your next edge.</h2>
          </div>
          <button type="button" className="primary-btn">
            Start now
          </button>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 NovaTrade</span>
        <span>Privacy • Terms • Support</span>
      </footer>
    </div>
  );
}

export default App;
