import Script from "next/script";

const GoogleAnalyticsAndAds = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JNW90MXCX5"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-JNW90MXCX5');
        `}
      </Script>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-11517533870"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'AW-11517533870');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalyticsAndAds;
