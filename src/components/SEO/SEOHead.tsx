import { Helmet } from "react-helmet-async";
import { getPageSEO } from "../../lib/seo";

interface SEOHeadProps {
  /** Nazwa podstrony, np. "Galeria" — wstawiana w site.seo.titleTemplate */
  title?: string;
  description?: string;
}

/**
 * Ustawia tytuł zakładki i opis strony. Dane pochodzą z src/data/site.ts.
 * Strona demo — celowo bez og:*, twitter:*, canonical i JSON-LD.
 */
const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  const seo = getPageSEO(title, description);

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
    </Helmet>
  );
};

export default SEOHead;
