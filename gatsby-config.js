module.exports = {
  siteMetadata: {
    author: `Dan Stewart`,
    description: `Personal Website for Dan Stewart`,
    email: `danstewart@live.com`,
    github: `https://github.com/StewShack/PersonalWebsiteGatsby`,
    goodreads: `https://goodreads.com/stewshack`,
    linkedin: `https://www.linkedin.com/in/stewshack`,
    mix: `https://mix.com/stewshack`,
    siteUrl: `https://www.www.stewshack.com`,
    themeColor: `#10a51d`,
    title: `StewShack`,
    twitter: `https://twitter.com/stewshack`,
    youtube: `https://www.youtube.com/user/stewshack`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `monthly`,
            }
          }),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
  ],
}
