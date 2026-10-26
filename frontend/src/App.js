import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Footer, WhatsFloat } from "@/components/site/Footer";
import Home from "@/pages/Home";
import { BlogList, BlogPost } from "@/pages/Blog";
import { ServicesPage, MethodPage, AboutPage, ContactPage } from "@/pages/Pages";
import { scrollTop } from "@/lib/scroll";
import { useEffect } from "react";
import Admin from "@/pages/Admin";
import SeoHead from "@/components/seo/SeoHead";
import { LanguageProvider } from "@/lib/i18n";
import ServiceDetail from "@/pages/ServiceDetail";
import ConsultingPage from "@/pages/ConsultingPage";

const Shell = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) scrollTop(); }, [pathname, hash]);
  if (pathname.startsWith("/admin")) return <><SeoHead /><Admin /></>;
  return (
    <>
      <SeoHead />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/servicos/:slug" element={<ServiceDetail />} />
        <Route path="/metodologia" element={<MethodPage />} />
        <Route path="/consultoria-estrategica" element={<ConsultingPage />} />
        <Route path="/quem-somos" element={<AboutPage />} />
        <Route path="/fale-conosco" element={<ContactPage />} />
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
      <LanguageProvider><BrowserRouter>
        <SmoothScroll />
        <Shell />
      </BrowserRouter></LanguageProvider>
      <Toaster theme="dark" position="top-center" richColors />
    </div>
  );
}

export default App;
