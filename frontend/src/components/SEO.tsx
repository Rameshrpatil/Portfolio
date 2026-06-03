import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
};

export default function SEO({ 
  title = "Ramesh Patil | Applied AI & Backend Engineer", 
  description = "Portfolio of Ramesh Patil, a Software Engineer specializing in scalable Backend systems, ML Inference, and Applied AI.", 
  keywords = "Software Engineer, Backend Engineer, Applied AI, Machine Learning, Python, FastAPI, RAG, Pune",
  type = "website"
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* OpenGraph tags (for LinkedIn, Facebook, Slack) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:creator" content="@RameshPatil" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
