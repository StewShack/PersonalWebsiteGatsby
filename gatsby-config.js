module.exports = {
  siteMetadata: {
    title: 'StewShack',
    siteUrl: 'https://www.www.stewshack.com',
    description: 'Personal Website for Dan Stewart',
    author: 'Dan Stewart',
    email: 'danstewart@live.com',
    linkedin: 'https://www.linkedin.com/in/stewshack',
    twitter: 'https://twitter.com/stewshack',
    github: 'https://github.com/StewShack/PersonalWebsiteGatsby'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
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
                    resolve: `gatsby-remark-prismjs`,
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