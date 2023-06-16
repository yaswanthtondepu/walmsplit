import { useState, useEffect, useRef , lazy} from "react";
const cheerio = lazy(() => require("cheerio"));

const textArea = {
  width: "100%",
  resize: "none",
  outline: "none",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "0.5rem",
  height: "10rem",
}

function Input({ itemsHandler }) {
  const [html, sethtml] = useState("");
  const textAreaRef = useRef();

  useEffect(() => {
    // Function to handle input events
    const handleInput = () => {
      const newHtml = textAreaRef.current.value;
      sethtml(newHtml);
    };

    // Attach the event listener
    const el = textAreaRef.current;
    el.addEventListener('input', handleInput);

    // Cleanup function to remove the event listener when the component unmounts
    return () => el.removeEventListener('input', handleInput);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div style={{ width: "90%", marginTop: "2rem" }}>
        <textarea
          id="html-input"
          ref={textAreaRef}
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
          // style={btnStyle}
          className="hoverbutton dark"
          id="submit-html-btn"
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
