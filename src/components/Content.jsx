import React, { useState, useEffect } from "react";
import axios from "axios";

function Content() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const [allMemes, setAllMemes] = useState([]);

  // using "then" and "fetch" for calling the API
  // useEffect(() => {
  //   fetch("https://api.imgflip.com/get_memes")
  //     .then((res) => res.json())
  //     .then((data) => setAllMemes(data.data.memes));
  // }, []);

  // using "async" and "await" to call the API
  // useEffect(() => {
  //   async function getMemes() {
  //     const res = await fetch("https://api.imgflip.com/get_memes")
  //     const data = await res.json()
  //     setAllMemes(data.data.memes)
  //   }
  //   getMemes()
  // },[])

  // using axios to call the Api
  useEffect(() => {
    async function getMemes() {
      try {
        const res = await axios.get("https://api.imgflip.com/get_memes");
        setAllMemes(res.data.data.memes)
      } catch (err) {
        console.log(err)
      }
    }
    getMemes()
  }, [])

  function getMemeImg() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  return (
    <section>
      <div className="main-flex">
        <input
          type="text"
          name="topText"
          placeholder="Top text"
          className="txt-field"
          onChange={handleChange}
          defaultValue={meme.topText}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom text"
          className="txt-field"
          onChange={handleChange}
          defaultValue={meme.bottomText}
        />
      </div>
      <div>
        <button onClick={getMemeImg} className="btn">
          Get a new meme image
        </button>
      </div>

      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </section>
  );
}
export default Content;
