

















const TeamSquad = ({}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()

    

    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setfixtures(data.data));
        }, []);


    




    return (
        <div className={Style.teamFix}>





                    <div className={Style.squads} >
                    {fixtures.map((project) => (


                    <TeamSquadList
                        name={project.head}
                        img={project.imgUrl.url}
                        link={project.head}
                        />    


                    )   )   }
                    </div>
                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}