import { gql } from '@apollo/client';

const ARTICLES_QUERY = gql`
  query GetArticle {
    articles {
      data {
        id
        attributes {
          title
          description
          content
          IsFeatured
          createdAt
          publishedAt
          slug
          coverImg {
            data {
              id
              attributes {
                url
                alternativeText
                caption
              }
            }
          }
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          total
          pageSize
          pageCount
        }
      }
    }
  }
`;

export default ARTICLES_QUERY;
