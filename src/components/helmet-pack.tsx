import favicon from "@/favicon.ico"
import { Helmet } from "react-helmet"

type HelmetPackProps = {
  title: string
  description: string
}

const HelmetPack = (props: HelmetPackProps) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <link
        rel="icon"
        href={favicon}
      />
      <meta
        name="title"
        content={props.title}
      />
      <meta
        name="description"
        content={props.description}
      />
      <meta
        name="favicon"
        content={favicon}
      />

      <meta
        property="og:title"
        content={props.title}
      />
      <meta
        property="og:description"
        content={props.description}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content={location.href}
      />
      <meta
        property="og:image"
        content={favicon}
      />
      <meta
        property="og:site_name"
        content="Kokosuki"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={props.title}
      />
      <meta
        name="twitter:description"
        content={props.description}
      />
      <meta
        name="twitter:image"
        content={favicon}
      />
    </Helmet>
  )
}

export default HelmetPack
