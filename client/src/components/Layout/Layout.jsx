import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function Layout({ children }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      {/* flex: 1 ensures the footer stays at the bottom even on short pages */}
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
