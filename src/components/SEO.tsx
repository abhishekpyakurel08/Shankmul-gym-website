import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title = "Shankhamul Health Club & Fitness Centre | Kathmandu's Premier Gym",
    description = "The premier fitness destination in Kathmandu. World-class equipment, expert trainers, and a supportive community to help you reach your ultimate body goals.",
    keywords = "gym in Kathmandu, health club Kathmandu, fitness centre Shankhamul, personal training Nepal, group classes Kathmandu",
    image = "/shankhamul-logo.jpg",
    url = "https://shankhamulgym.com",
    type = "website"
}: SEOProps) => {
    const siteTitle = "Shankhamul Health Club & Fitness Centre";
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
