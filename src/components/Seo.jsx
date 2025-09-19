import { Helmet, HelmetProvider } from 'react-helmet-async';

/**
 * Seo 컴포넌트: 페이지별 메타 태그, OG, JSON-LD 등 SEO 자동화
 * @param {object} props
 * @param {string} props.title - 페이지 타이틀
 * @param {string} props.description - 메타 설명
 * @param {string} [props.url] - 페이지 URL
 * @param {string} [props.image] - OG 이미지 URL
 * @param {string} [props.type] - OG 타입 (기본: website)
 * @param {object} [props.jsonLd] - JSON-LD 구조화 데이터
 */
export default function Seo({
  title,
  description,
  url = window.location.href,
  image = '/vite.svg',
  type = 'website',
  jsonLd
}) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {/* JSON-LD 구조화 데이터 */}
        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Helmet>
    </HelmetProvider>
  );
}
