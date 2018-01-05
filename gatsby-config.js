var autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: `alex baldwin`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          autoprefixer({
            browsers: ['last 3 versions', 'IE >= 9']
          })
        ],
        precision: 8
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `roboto mono\:400,700,700i,400i`
        ]
      }
    },
  ],
}
