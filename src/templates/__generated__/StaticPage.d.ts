/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StaticPage
// ====================================================

export interface StaticPage_site_siteMetadata {
  title: string | null;
  author: string | null;
  siteUrl: string | null;
}

export interface StaticPage_site {
  siteMetadata: StaticPage_site_siteMetadata | null;
}

export interface StaticPage_markdownRemark_fields {
  slug: string | null;
}

export interface StaticPage_markdownRemark_frontmatter {
  title: string | null;
  date: any | null;
  description: string | null;
}

export interface StaticPage_markdownRemark {
  id: string;
  excerpt: string | null;
  fields: StaticPage_markdownRemark_fields | null;
  html: string | null;
  htmlAst: any | null;
  tableOfContents: string | null;
  frontmatter: StaticPage_markdownRemark_frontmatter | null;
}

export interface StaticPage {
  site: StaticPage_site | null;
  markdownRemark: StaticPage_markdownRemark | null;
}

export interface StaticPageVariables {
  slug: string;
}
