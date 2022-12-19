import { useState } from "react";
const cheerio = require("cheerio");

function Input({ itemcallback }) {
  const [html, sethtml] = useState("");
  return (
    <div>
      <textarea
        value={html}
        onChange={(e) => sethtml(e.target.value)}
        rows="20"
        cols="50"
      ></textarea>
      <button
        onClick={(e) => {
          const ans = parseHtml(html);
          console.log(ans)
          console.log(itemcallback)
          itemcallback([...ans])
        }}
      >
        Submit
      </button>
    </div>
  );
}
function parseHtml(html) {
  const items = [];
  const $ = cheerio.load(html);
  $(".pa3.pb0.ph4-m").each((_idx, el) => {
    var item = {};
    item["name"] = $(el).find("span").html().replaceAll(/\s\s+/g, " ");
    item["image"] = $(el).find("a").find("img").attr("src");
    item["price"] = $(el).find(".f5.b.tr").find("span").text().slice(1);
    items.push(item);
  });
  console.log(items);
  return items
}
export default Input;
