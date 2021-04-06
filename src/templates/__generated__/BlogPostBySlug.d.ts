/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostBySlug
// ====================================================

export interface BlogPostBySlug_site_siteMetadata {
  title: string | null;
  author: string | null;
  siteUrl: string | null;
}

export interface BlogPostBySlug_site {
  siteMetadata: BlogPostBySlug_site_siteMetadata | null;
}

export interface BlogPostBySlug_defaultCover_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface BlogPostBySlug_defaultCover_childImageSharp {
  fluid: BlogPostBySlug_defaultCover_childImageSharp_fluid | null;
}

export interface BlogPostBySlug_defaultCover {
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: BlogPostBySlug_defaultCover_childImageSharp | null;
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
}

export interface BlogPostBySlug_allMarkdownRemark_edges_node_fields {
  slug: string | null;
}

export interface BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp {
  fluid: BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp_fluid | null;
}

export interface BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter_cover {
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter_cover_childImageSharp | null;
}

export interface BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter {
  date: any | null;
  title: string | null;
  description: string | null;
  cover: BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter_cover | null;
}

export interface BlogPostBySlug_allMarkdownRemark_edges_node {
  excerpt: string | null;
  fields: BlogPostBySlug_allMarkdownRemark_edges_node_fields | null;
  frontmatter: BlogPostBySlug_allMarkdownRemark_edges_node_frontmatter | null;
}

export interface BlogPostBySlug_allMarkdownRemark_edges {
  node: BlogPostBySlug_allMarkdownRemark_edges_node;
}

export interface BlogPostBySlug_allMarkdownRemark {
  edges: BlogPostBySlug_allMarkdownRemark_edges[];
}

export interface BlogPostBySlug_markdownRemark_fields {
  slug: string | null;
}

export interface BlogPostBySlug_markdownRemark_frontmatter_cover {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
}

export interface BlogPostBySlug_markdownRemark_frontmatter {
  title: string | null;
  date: any | null;
  description: string | null;
  cover: BlogPostBySlug_markdownRemark_frontmatter_cover | null;
}

export interface BlogPostBySlug_markdownRemark {
  id: string;
  excerpt: string | null;
  fields: BlogPostBySlug_markdownRemark_fields | null;
  html: string | null;
  htmlAst: any | null;
  tableOfContents: string | null;
  frontmatter: BlogPostBySlug_markdownRemark_frontmatter | null;
}

export interface BlogPostBySlug {
  site: BlogPostBySlug_site | null;
  defaultCover: BlogPostBySlug_defaultCover | null;
  allMarkdownRemark: BlogPostBySlug_allMarkdownRemark;
  markdownRemark: BlogPostBySlug_markdownRemark | null;
}

export interface BlogPostBySlugVariables {
  slug: string;
  defaultCover: string;
}
