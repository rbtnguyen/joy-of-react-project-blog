import React, { cache } from "react";

import BlogHero from "@/components/BlogHero";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";
import { notFound } from "next/navigation";
// import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import dynamic from "next/dynamic";
const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo"),
);

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo"),
);

const cacheLoadBlogPost = cache(loadBlogPost);

async function BlogPost({ params }) {
  const paramsResult = await params;
  const postSlug = paramsResult.postSlug;
  let blogPost;
  try {
    blogPost = await cacheLoadBlogPost(postSlug);
  } catch (e) {
    console.log("error", e);
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={blogPost.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const paramsResult = await params;
  const postSlug = paramsResult.postSlug;
  const blogPost = await cacheLoadBlogPost(postSlug);
  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

export default BlogPost;
