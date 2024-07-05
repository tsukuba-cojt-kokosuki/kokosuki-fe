import { Helmet } from "react-helmet";

const HelmetPack = (props: {
  title: string
  description: string
  image: string
  link: string

}) => {
return (
    <Helmet>
     <title>{props.title}</title>

    <link rel="icon" href={props.image} />

    <meta name="title" content={props.title} />
    <meta name="description" content={props.description} />
    <meta name="favicon" content={props.image} />

    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={props.link} />
    <meta property="og:image" content="https://www.hitachi-solutions-create.co.jp/column/img/image-generation-ai.jpg" />
    <meta property="og:site_name" content="Kokosuki" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.description} />
    <meta name="twitter:image" content={props.image} />
 
      
      
    </Helmet>
  )
}

export default HelmetPack