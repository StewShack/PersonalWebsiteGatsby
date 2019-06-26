module.exports = {
  siteMetadata: {
    author: 'Dan Stewart',
    description: 'Personal Website for Dan Stewart',
    email: 'danstewart@live.com',
    github: 'https://github.com/StewShack/PersonalWebsiteGatsby',
    linkedin: 'https://www.linkedin.com/in/stewshack',
    youtube: 'https://www.youtube.com/user/stewshack',
    goodreads: 'https://goodreads.com/stewshack',
    siteUrl: 'https://www.www.stewshack.com',
    themeColor: '#10a51d',
    title: 'StewShack',
    twitter: 'https://twitter.com/stewshack'
  },
  plugins: [
    {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
            trackingId: "UA-22932513-1",
            head: false,
        }
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'src',
            path: `${__dirname}/src/`
        }
    },
    {
        resolve: 'gatsby-transformer-remark',
        options: {
            plugins: [
                {
                    resolve: 'gatsby-remark-prismjs',
                    options: {
                        classPrefix: "language-",
                        inlineCodeMarker: null,
                        aliases: {},
                        showLineNumbers: false,
                        noInlineHighlight: true,
                        
                    }
                }
            ]
        }
    }
  ]
}