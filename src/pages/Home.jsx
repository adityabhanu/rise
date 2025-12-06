import { useTheme } from "@mui/material/styles";
import SearchSection from "../components/SearchMemorial";

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <SearchSection />
    </>
  );
}
