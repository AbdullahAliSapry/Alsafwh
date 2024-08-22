import { Helmet, HelmetProvider } from "react-helmet-async";

export default function HomeHelmet() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>الصفوه</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
    </HelmetProvider>
  );
}
