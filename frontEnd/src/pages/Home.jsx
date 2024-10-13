import Banner from "../components/sub component/Banner";
import Coming from "../components/sub component/Coming";
import Nav from "../components/sub component/Nav";
import Homet from "../components/HomeT";
import Category from "../components/Category"
import Slist from "../components/Slist";
import News, {News2} from "../components/News"
import Carousel from "../components/sub component/Carousel"
import "../styles/style.css"
import TopNews from "../components/Topnews";
import Homehighlight from "../components/Homehighlight";




function App() {
  return (
    <div>
           
        <Nav />
        <Coming/>

        <TopNews />

        <Homehighlight />

        <Homet />

        
           
       
                          <Carousel />

{/* 
            <Banner /> */}

              {/* <Category /> */}

              {/* <Slist /> */}

    </div>
  );
}

export default App;
