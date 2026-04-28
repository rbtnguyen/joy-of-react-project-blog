import { cookies } from "next/headers";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";
import { BLOG_TITLE } from "@/constants";

export async function GET() {
  //   const cookieStore = await cookies();
  //   const token = cookieStore.get("token");
  const feed = new RSS({
    title: BLOG_TITLE,
    description: "A wonderful blog about JavaScript",
    feed_url: "http://localhost:3001/rss.xml",
    site_url: "http://localhost:3001/rss.xml",
  });
  const blogPostList = await getBlogPostList();

  blogPostList.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: "http://localhost:3001/" + post.slug,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
