import styled from "styled-components";
import { OpenSidebarButton } from "../components/OpenSidebarButton";

const HomePageArea = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
`;

const HomePage: React.FC = () => {
  return (
    <HomePageArea>
      <OpenSidebarButton />
    </HomePageArea>
  );
};

export default HomePage;
