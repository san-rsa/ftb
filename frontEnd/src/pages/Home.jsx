import Banner from "../components/sub component/Banner";
import Coming from "../components/sub component/Coming";
import Nav from "../components/sub component/Nav";
import Trending from "../components/Trending";
import Category from "../components/Category"
import Slist from "../components/Slist";
import News from "../components/News"
import Carousel from "../components/sub component/Carousel"
import "../styles/style.css"




function App() {
  return (
    <div>
           
        <Nav />
        <Coming/>

        <News />
        {/* <Banner /> */}

        
           
        <Trending />
                          <Carousel />

{/* 
            <Banner /> */}

              <Category />

              <Slist />

    </div>
  );
}

export default App;
