import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Layout({ children, cart, setCart }) {
  const [showCart, setShowCart] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateQty = (index, amount) => {
    const updated = [...cart];
    updated[index].qty += amount;

    if (updated[index].qty <= 0) {
      updated.splice(index, 1);
    }

    setCart(updated);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f2f2f2", minHeight: "100vh" }}>
      <header style={headerStyle}>
        <div style={container}>
          <h2>audiophile</h2>

          <nav style={navStyle}>
            <Link to="/" style={linkStyle}>HOME</Link>
            <Link to="/headphones" style={linkStyle}>HEADPHONES</Link>
            <Link to="/speakers" style={linkStyle}>SPEAKERS</Link>
            <Link to="/earphones" style={linkStyle}>EARPHONES</Link>
          </nav>

          <div style={{ position: "relative" }}>
            <button onClick={() => setShowCart(!showCart)} style={cartBtn}>
              🛒 ({cart.length})
            </button>

            {showCart && (
              <div style={cartDropdown}>
                <h4>Cart ({cart.length})</h4>

                {cart.map((item, i) => (
                  <div key={i} style={cartItem}>
                    <div>
                      <p>{item.title}</p>
                      <p>${item.price}</p>
                    </div>

                    <div>
                      <button onClick={() => updateQty(i, -1)}>-</button>
                      <span style={{ margin: "0 10px" }}>{item.qty}</span>
                      <button onClick={() => updateQty(i, 1)}>+</button>
                    </div>
                  </div>
                ))}

                <h3>Total: ${total}</h3>
                <button style={buttonStyle}>CHECKOUT</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{ width: "100%" }}>{children}</div>

      <Footer />
    </div>
  );
}

function Home() {
  return (
    <div>
      <section style={hero}>
        <div style={container}>
          <h1>XX99 MARK II HEADPHONES</h1>
          <p style={{ maxWidth: "400px", margin: "20px 0" }}>
            Experience natural, lifelike audio and exceptional build quality.
          </p>
          <Link to="/headphones">
            <button style={buttonStyle}>SHOP NOW</button>
          </Link>
        </div>
      </section>

      <section style={zx9Section}>
        <div style={container}>
          <h2>ZX9 SPEAKER</h2>
          <p style={{ maxWidth: "400px", margin: "20px 0" }}>
            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
          </p>

          <Link to="/speakers">
            <button style={{ ...buttonStyle, background: "#000" }}>
              SEE PRODUCT
            </button>
          </Link>
        </div>
      </section>

      <section style={categoryWrapper}>
        <Category title="HEADPHONES" link="/headphones" />
        <Category title="SPEAKERS" link="/speakers" />
        <Category title="EARPHONES" link="/earphones" />
      </section>
    </div>
  );
}

function Category({ title, link }) {
  return (
    <div style={categoryBox}>
      <h3>{title}</h3>
      <Link to={link}>SHOP →</Link>
    </div>
  );
}

function Product({ title, price, image, addToCart }) {
  return (
    <div style={{ ...container, marginTop: "60px" }}>
      <img src={image} style={{ width: "300px" }} alt="" />
      <h2>{title}</h2>
      <h3>${price}</h3>

      <button onClick={() => addToCart({ title, price })} style={buttonStyle}>
        ADD TO CART
      </button>
    </div>
  );
}

function Headphones({ addToCart }) {
  return (
    <Product
      title="XX99"
      price={2999}
      addToCart={addToCart}
      image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    />
  );
}

function Speakers({ addToCart }) {
  return (
    <Product
      title="ZX9"
      price={4500}
      addToCart={addToCart}
      image="https://images.unsplash.com/photo-1589003077984-894e133dabab"
    />
  );
}

function Earphones({ addToCart }) {
  return (
    <Product
      title="YX1"
      price={599}
      addToCart={addToCart}
      image="https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"
    />
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.title === item.title);

    if (existing) {
      setCart(
        cart.map((i) =>
          i.title === item.title ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  return (
    <Router>
      <Layout cart={cart} setCart={setCart}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/headphones" element={<Headphones addToCart={addToCart} />} />
          <Route path="/speakers" element={<Speakers addToCart={addToCart} />} />
          <Route path="/earphones" element={<Earphones addToCart={addToCart} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function Footer() {
  return (
    <>
      <section style={footerTop}>
        <div style={footerTopInner}>
          <div style={{ maxWidth: "500px" }}>
            <h2>
              BRINGING YOU THE <span style={{ color: "#d87d4a" }}>BEST</span> AUDIO GEAR
            </h2>
            <p style={{ color: "#555", marginTop: "20px" }}>
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio accessories.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
            alt=""
            style={footerImg}
          />
        </div>
      </section>

      <footer style={footerBottom}>
        <div style={container}>
          <h3>audiophile</h3>

          <p style={{ maxWidth: "500px", color: "#aaa" }}>
            Audiophile is an all in one stop to fulfill your audio needs.
          </p>

          <nav style={{ ...navStyle, marginTop: "20px" }}>
            <Link to="/" style={linkStyle}>HOME</Link>
            <Link to="/headphones" style={linkStyle}>HEADPHONES</Link>
            <Link to="/speakers" style={linkStyle}>SPEAKERS</Link>
            <Link to="/earphones" style={linkStyle}>EARPHONES</Link>
          </nav>

          <p style={{ color: "#777", marginTop: "20px" }}>
            Copyright 2026. All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px"
};

const headerStyle = {
  background: "#000",
  color: "#fff",
  padding: "20px 0"
};

const navStyle = {
  display: "flex",
  gap: "25px"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

const buttonStyle = {
  background: "#d87d4a",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  cursor: "pointer"
};

const hero = {
  background: "#111",
  color: "#fff",
  padding: "120px 0"
};

const zx9Section = {
  background: "#d87d4a",
  color: "#fff",
  padding: "80px 0",
  marginTop: "40px",
  borderRadius: "10px"
};

const categoryWrapper = {
  ...container,
  marginTop: "60px",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const categoryBox = {
  flex: 1,
  minWidth: "200px",
  background: "#fff",
  padding: "40px",
  textAlign: "center"
};

const cartBtn = {
  background: "transparent",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

const cartDropdown = {
  position: "absolute",
  right: 0,
  top: "40px",
  background: "#fff",
  padding: "20px",
  width: "260px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};

const cartItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px"
};

const footerTop = {
  background: "#fff",
  padding: "80px 0",
  marginTop: "60px"
};

const footerTopInner = {
  ...container,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  flexWrap: "wrap"
};

const footerImg = {
  width: "300px",
  borderRadius: "10px"
};

const footerBottom = {
  background: "#000",
  color: "#fff",
  padding: "60px 0",
  marginTop: "40px"
};