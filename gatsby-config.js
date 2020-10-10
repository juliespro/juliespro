const nodejieba = require('nodejieba');
nodejieba.load({dict: './dictTW.txt'});
var FlexSearch = require("flexsearch")
var index = FlexSearch.create({
  encode: false,
  tokenize: function(str){
    console.log(nodejieba.cut(str))
    return nodejieba.cut(str);
  }
});
// Testing Flex search
// index.add(0,"【花蓮｜輕裝登山推薦】羊頭山一日百岳單攻");
// index.add(1,"劍龍陵、鋸齒陵、茶壺山、登山");
// var result = index.search("劍龍");
// console.log(result);

module.exports = {
  siteMetadata: {
    title: `Julie's Pro`,
    description: `Julie's Blog about public health research,  mountain climbing and coding`,
    author: `@juliespro`,
    siteUrl: `https://julies.pro`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || "none",
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    // It needs to be the first one to work with gatsby-remark-images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/img`,
        name: `uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/translations`,
        name: `translations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/menu`,
        name: `menu`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/language-mapping`,
        name: `language-mapping`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: `uploads`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1040,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`, // Important!
            options: {
              background: 'var(--color-background)',
              scrollOffset: 0,
              margin: -25
            }
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-lazy-load`,
          `gatsby-remark-prismjs`, // It needs to be the last one
        ],
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`400`, `600`],
          },
        ],
      },
    },

    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Julie's Pro Blog`,
        short_name: `Julie's Pro Blog`,
        start_url: `/`,
        background_color: `#16202c`,
        theme_color: `#16202c`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `juliespro`
      }
    },
    {
      resolve: 'gatsby-plugin-flexsearch-global',
      options: {
        languages: ['tw'],
        type: 'MarkdownRemark',
        fields: [
          {
            name: 'title',
            indexed: true,
            resolver: 'frontmatter.title',
            attributes: {
              encode: false,
              tokenize: function(str){
                return nodejieba.cut(str);
              }
            },
            store: true,
          },
          // {
          //   name: 'description',
          //   indexed: true,
          //   resolver: 'frontmatter.description',
          //   attributes: {
          //     encode: 'balance',
          //     tokenize: 'strict',
          //     threshold: 6,
          //     depth: 3,
          //   },
          //   store: false,
          // },
          // {
          //   name: 'url',
          //   indexed: false,
          //   resolver: 'fields.slug',
          //   store: true,
          // },
        ]
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
