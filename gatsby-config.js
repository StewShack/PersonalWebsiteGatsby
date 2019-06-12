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
    'gatsby-transformer-remark',
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'src',
            path: `${__dirname}/src/`
        }
    }
  ]
}