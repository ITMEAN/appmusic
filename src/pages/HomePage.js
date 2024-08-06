import { useEffect, useState } from "react";
import "../styles/homepage.css";
import { useAppContext } from "../context/AppContext";
import SliderNewAllBUm from "../components/SliderNewAlbum";
import { getAllSong, getSongByContry } from "../service/SongService.js";
import { getAllCategory } from "../service/CategoryService.js";
import AddToListDropdown from "../components/AddToListDropdown.jsx";
import CategoryItem from "../components/CateroryItem.jsx";

function Home() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const { state, dispatch } = useAppContext();
  const songCurrent = state.currentSong.id;
  const [listSongALL, setListSongALL] = useState([]);
  const [listSongVN, setListSongVN] = useState([]);
  const [listSongUS, setListSongUS] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (selectedFilter === "ALL") {
      dispatch({ type: "SET_LIST_SONG", payload: listSongALL });
    } else if (selectedFilter === "VN") {
      dispatch({ type: "SET_LIST_SONG", payload: listSongVN });
    } else if (selectedFilter === "US") {
      dispatch({ type: "SET_LIST_SONG", payload: listSongUS });
    }
  }, [selectedFilter, listSongALL, listSongVN, listSongUS, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const [allSongs, vnSongs, usSongs, categories] = await Promise.all([
          getAllSong(),
          getSongByContry("VN"),
          getSongByContry("US"),
          getAllCategory(),
        ]);
        setListSongALL(allSongs);
        setListSongVN(vnSongs);
        setListSongUS(usSongs);
        setCategories(categories.categories);
        setSelectedFilter("ALL");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, []);

  const getArtistsName = (Song) => {
    var listArtistNames = "";
    Array.from(Song.artists).forEach((item) => {
      listArtistNames += item.fullName + ",";
    });
    return listArtistNames.substring(0, listArtistNames.length - 1);
  };

  const handleChangeSong = (index) => {
    dispatch({ type: "SET_CURRENT_SONG", payload: index });
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading indicator
  }

  return (
    <div className="homepage">
      <h4 className="title-category">KHÁM PHÁ ALBUM</h4>
      <SliderNewAllBUm />
      <h4 className="title-category">MỚI PHÁT HÀNH</h4>
      <div className="menu-filter">
        <button
          className="btn-filter"
          style={{
            backgroundColor: selectedFilter === "ALL" ? "#8B45CA" : "#231B2E",
          }}
          onClick={() => {
            setSelectedFilter("ALL");
          }}
        >
          Tất cả
        </button>
        <button
          className="btn-filter"
          style={{
            backgroundColor: selectedFilter === "VN" ? "#8B45CA" : "#231B2E",
          }}
          onClick={() => {
            setSelectedFilter("VN");
          }}
        >
          Việt Nam
        </button>
        <button
          className="btn-filter"
          style={{
            backgroundColor: selectedFilter === "US" ? "#8B45CA" : "#231B2E",
          }}
          onClick={() => {
            setSelectedFilter("US");
          }}
        >
          Âu Mỹ
        </button>
      </div>

      <div className="song-container">
        {state.listSong.map((item, index) => (
          <div
            className="song"
            onClick={() => handleChangeSong(index)}
            style={{
              backgroundColor:
                item.id === songCurrent ? "#2F2739" : "#170F23",
            }}
            key={item.id}
          >
            <img
              className="image"
              src={item.img}
              style={{
                display: "flex",
                width: '30%',
                height: "100%",
                objectFit: "contain",
              }}
              alt={item.name}
            />
            <div className="info">
              <h6 className="name">{item.name}</h6>
              <span className="artist" style={{ color: "#8B8791" }}>
                {getArtistsName(item)}
              </span>
            </div>
            <AddToListDropdown songId={item.id} />
          </div>
        ))}
      </div>

      <h4 className="title-category">THỂ LOẠI</h4>
      <div style={{ width: '100%', display: 'flex', alignItems: 'start', backgroundColor: "#170F23", flexDirection: 'column' }}>
        {Array.isArray(categories) &&
          categories.map((item, index) => (
            <CategoryItem key={item} category={item} />
          ))}
      </div>
    </div>
  );
}

export default Home;
