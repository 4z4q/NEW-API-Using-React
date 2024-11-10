import { useContext } from "react";
import NewsArticle from "./NewsArticle";
import NewsContext from "../context/NewsContext";
import { Typography } from "@mui/material";
import LoadingArticle from "./LoadingArticle";

function NewsFeed({ loading }) {
  const { Articles } = useContext(NewsContext);

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "50vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  if (Articles.length === 0 && !loading) {
    return (
      <Typography
        fontFamily={"Cairo"}
        variant="h6"
        color="textSecondary"
        display="block"
        align="center"
        marginTop={4}
      >
        Not Found ...
      </Typography>
    );
  }

  return (
    <div>
      {loading &&
        [...Array(2)].map((_, index) => <LoadingArticle key={index} />)}
      {!loading &&
        Articles.map((article) => (
          <NewsArticle key={JSON.stringify(article)} article={article} />
        ))}
    </div>
  );
}

export default NewsFeed;
