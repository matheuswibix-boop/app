import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Footer, WhatsFloat } from "@/components/site/Footer";
import Home from "@/pages/Home";
import { BlogList, BlogPost } from "@/pages/Blog";
import Admin from "@/pages/Admin";

const Shell = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return <Admin />;
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <WhatsFloat />
    </>
  );
};

function App() {
  return (
    <div className="App grain">
      <BrowserRouter>
        <SmoothScroll />
        <Shell />
      </BrowserRouter>
      <Toaster theme="dark" position="top-center" richColors />
    </div>
  );
}

export default App;
