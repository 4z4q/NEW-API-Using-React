import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export default function LoadingArticle() {
  return (
    <StyledCard>
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        {/* <Skeleton variant="circular" width={40} height={40} /> */}
        {/* <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} /> */}
      </CardContent>
      <CardActionArea>
        <Box p={2}>
          <Skeleton variant="text" width={210} sx={{ fontSize: "1.5rem" }} />
          <Skeleton variant="text" width={210} sx={{ fontSize: "1.5rem" }} />
        </Box>
      </CardActionArea>
    </StyledCard>
  );
}
