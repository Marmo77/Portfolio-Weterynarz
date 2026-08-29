import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoadingSkeletons from "./LoadingSkeletons";
import SEOHead from "./components/SEO/SEOHead";
import { site } from "./data/site";

// Lazy load routed pages
const Home = lazy(() => import("./components/Home/Home"));
const Gallery = lazy(() => import("./components/Gallery/Gallery"));
const Prywatnosc = lazy(() => import("./pages/Prywatnosc"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSkeletons page={true} />}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <SEOHead />
                <Home />
              </Layout>
            }
          />
          <Route
            path="/galeria"
            element={
              <Layout>
                <Gallery />
              </Layout>
            }
          />
          <Route
            path="/polityka-prywatnosci"
            element={
              <Layout>
                <Prywatnosc />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <div className="flex items-center justify-center h-[50vh] text-2xl font-display text-muted-foreground">
                  {site.notFound.title}
                </div>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
