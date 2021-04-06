/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Indexes
// ====================================================

export interface Indexes_site_siteMetadata {
  title: string | null;
}

export interface Indexes_site {
  siteMetadata: Indexes_site_siteMetadata | null;
}

export interface Indexes_file_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface Indexes_file_childImageSharp {
  fluid: Indexes_file_childImageSharp_fluid | null;
}

export interface Indexes_file {
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: Indexes_file_childImageSharp | null;
}

export interface Indexes_allMarkdownRemark_edges_node_fields {
  slug: string | null;
}

export interface Indexes_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface Indexes_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp {
  fluid: Indexes_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp_fluid | null;
}

export interface Indexes_allMarkdownRemark_edges_node_frontmatter_cover {
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: Indexes_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp | null;
}

export interface Indexes_allMarkdownRemark_edges_node_frontmatter {
  date: any | null;
  title: string | null;
  description: string | null;
  cover: Indexes_allMarkdownRemark_edges_node_frontmatter_cover | null;
}

export interface Indexes_allMarkdownRemark_edges_node {
  excerpt: string | null;
  fields: Indexes_allMarkdownRemark_edges_node_fields | null;
  frontmatter: Indexes_allMarkdownRemark_edges_node_frontmatter | null;
}

export interface Indexes_allMarkdownRemark_edges {
  node: Indexes_allMarkdownRemark_edges_node;
}

export interface Indexes_allMarkdownRemark {
  edges: Indexes_allMarkdownRemark_edges[];
}

export interface Indexes {
  site: Indexes_site | null;
  file: Indexes_file | null;
  allMarkdownRemark: Indexes_allMarkdownRemark;
}

export interface IndexesVariables {
  index: number;
  defaultCover: string;
}
