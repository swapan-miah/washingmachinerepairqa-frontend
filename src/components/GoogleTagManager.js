import Script from "next/script";

const GoogleTagManager = ({ sData }) => {
	return (
		<>
			<Script
				id="gtm-script"
				strategy="beforeInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${sData.gtm_id}');
          `,
				}}
			/>

			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${sData.gtm_id}`}
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden" }}
				/>
			</noscript>
		</>
	);
};

export default GoogleTagManager;
