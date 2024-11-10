import {
  Button,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import "./App.css";
import NewsContext from "./context/NewsContext";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { CategoryContext } from "./context/categoryContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

  const pageNumber = useRef(1);
  const queryValue = useRef("");
  const PAGE_SIZE = 3;

  async function loadDate(curruntCategory) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources&category=${curruntCategory}&q=${
        queryValue.current
      }&page=${pageNumber.current}&pageSize=${PAGE_SIZE}&country=us&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );

    const data = await response.json();

    if (data.status === "error") {
      throw Error("Error fetching data:", JSON.stringify(data.message));
    }

    return data.articles.map((article) => {
      const { title, description, urlToImage, author, publishedAt, url } =
        article;
      return {
        url,
        title,
        description,
        image: urlToImage,
        author,
        publishedAt,
      };
    });
  }

  const fetchAndUpdateArticles = (curruntCategory) => {
    setLoading(true);
    loadDate(curruntCategory ?? category) // if curruntCategory is undefined, use the value of category
      .then((newData) => {
        setArticles(newData);
        setLoading(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error.message));
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedLoadDate = debounce(fetchAndUpdateArticles, 500); // This is the debounce delay in request time in milliseconds

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handelSearchChange = (newQuery) => {
    queryValue.current = newQuery;
    pageNumber.current = 1; // reset the page number to 1
    debouncedLoadDate(newQuery); // set the query value from the search bar (event.target.value)
  };

  const handleNextPage = () => {
    pageNumber.current += 1;
    debouncedLoadDate();
  };
  const handlePrevtPage = () => {
    pageNumber.current -= 1;
    debouncedLoadDate();
  };

  const handelChangeCategory = (newCategory) => {
    setCategory(newCategory);
    pageNumber.current = 1; // reset the page number to 1
    debouncedLoadDate(newCategory); // set the query value from the search bar (event.target.value)
  };

  // const { mode, setMode } = useColorScheme();

  // const handleChangeMode = () => {
  //   setMode(mode === "dark" ? "light" : "dark");
  // };

  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const handleChangeMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CssBaseline />

        <NewsContext.Provider value={{ Articles: articles }}>
          <CategoryContext.Provider
            value={{ context: handelChangeCategory, value: category }}
          >
            <NewsHeader
              onSearchInput={handelSearchChange}
              handleChangeMode={handleChangeMode}
              mode={mode}
            />
          </CategoryContext.Provider>

          {error.length === 0 ? (
            <NewsFeed loading={loading} />
          ) : (
            <Typography
              fontFamily={"Cairo"}
              variant="h6"
              color="textSecondary"
              align="center"
              marginTop={4}
            >
              {error}
            </Typography>
          )}
          <Stack
            direction="row"
            display={"flex"}
            justifyContent="space-between"
            spacing={2}
          >
            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={handlePrevtPage}
              disabled={pageNumber.current === 1}
            >
              Prev
            </Button>
            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={handleNextPage}
              disabled={articles.length < PAGE_SIZE || articles.length === 0}
            >
              Next
            </Button>
          </Stack>
        </NewsContext.Provider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
