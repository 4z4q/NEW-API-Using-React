import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext } from "react";
import { CategoryContext } from "../context/categoryContext";

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.action,
  backgroundColor: theme.palette.common.white,
  "&:before": {
    borderColor: theme.palette.action,
  },
  "&:after": {
    borderColor: theme.palette.action,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.action,
  },
  margin: theme.spacing(2),
  width: 200,
  height: 40,
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
export default function SelectVariants() {
  const { context, value } = useContext(CategoryContext);

  const handleChange = (event) => {
    context(event.target.value);
  };

  return (
    <>
      <StyledSelect value={value} onChange={handleChange}>
        <StyledMenuItem value="general">General</StyledMenuItem>
        <StyledMenuItem value="business">Business</StyledMenuItem>
        <StyledMenuItem value="entertainment">Entertainment</StyledMenuItem>
        <StyledMenuItem value="health">Health</StyledMenuItem>
        <StyledMenuItem value="science">Science</StyledMenuItem>
        <StyledMenuItem value="sports">Sports</StyledMenuItem>
        <StyledMenuItem value="technology">Technology</StyledMenuItem>
      </StyledSelect>
    </>
  );
}
