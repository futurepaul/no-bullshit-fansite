import * as Parser from "rss-parser";
import marked from "marked";
import { JSDOM } from "jsdom";
import { format } from "date-fns";

export default async (req, res) => {
  let parser = new Parser();
  const feed = await parser.parseURL("https://rss.app/feeds/a7pA7KDznTPqIyqR.xml");

  const posts = feed.items.map((post) => {
    let lines = post.contentSnippet.split('\n');
    let title = lines[0]

    // Style the last line
    let lastLine = lines[lines.length - 1];
    if (lastLine.includes("archive")) {
      let split = lastLine.split(": ");
      lastLine = `**archive**: ${split[1]}`
    }

    lines[lines.length - 1] = lastLine;

    // Join the lines and parse as markdown
    let content = lines.slice(1).join('\n\n');
    let parsed = marked(content);

    // Find the image if one exists
    const dom = new JSDOM(post.content);
    let img = dom.window.document.querySelector("img");

    // Make the date look nice 
    let trimmedDate = post.pubDate.slice(0, -4);
    let date = format(new Date(trimmedDate), "MM/dd/yyyy, h:mmaaa 'GMT'");

    return {
      guid: post.guid,
      title,
      link: post.link,
      content: parsed,
      imgUrl: img?.getAttribute("src"),
      date
    }
  });

  res.status(200).json(posts)
}
