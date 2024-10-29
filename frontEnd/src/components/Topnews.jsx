import {React, useState, useEffect} from "react";
import Style from "../styles/News.module.css"
import News, {Mininews} from "./sub component/list/Newslist"



const TopNews = () => {

    const [banner, setbanner] = useState([])


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/banner")
        .then((res) =>  res.json())
        .then((data) => setbanner(data.data));
    }, []);



    return (

         <div className={Style.top}> 

            <h1> TOP NEWS</h1>  
          {banner.slice(-1).map((project) => (

            <div className='' key={project._id}> 
            
              <News
                  text={project.text}
                  img={project.imgUrl.url}
                />    
                </div>
            
            
            )   )   }




                {banner.slice(-2, -7).map((project) => (

                <div className={Style.perone} key={project._id}> 

                <Mininews
                    text={project.text}
                    img={project.imgUrl.url}
                    />    
                    </div>


                )   )   }
        </div>
    )
}





export default TopNews