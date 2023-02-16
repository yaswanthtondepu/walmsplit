import { useState } from "react";
const cheerio = require("cheerio");

const textArea = {
  width: "100%",
  resize: "none",
  outline: "none",
}

const btnStyle = {
  width: "100%",
  height: "2rem",
  marginTop: "1rem",
  outline: "none",
  border: "none",
  borderRadius: "0.5rem",
  backgroundColor: "#2596be",
  color: "white",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
}

function Input({ itemsHandler }) {
  const [html, sethtml] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div style={{ width: "90%", marginTop: "2rem" }}>
        <textarea
          value={html}
          onChange={(e) => sethtml(e.target.value)}
          style={textArea}
          rows="1"
          cols="50"
          placeholder="Paste the HTML here"
        ></textarea>
      </div>
      <div>
        <button
          style={btnStyle}
          onClick={(e) => {
            const ans = parseHtml(html);
            itemsHandler([...ans])
          }}
        >
          Submit
        </button>
      </div>
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
  return items
}
export default Input;
