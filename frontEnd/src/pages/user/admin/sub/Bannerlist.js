import React from "react";
import { Link } from "react-router-dom";
import style from "../style/List.module.css"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { getbanner } from "../Admin";



const List = ({name, img, id, data}) => {

    function del(e) {
        e.preventDefault()
    
          console.log(id)
    
          
    
        try {
          const response =  fetch(process.env.REACT_APP_API_LINK + "admin/del/banner", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify({
              productId: id,
            }),
    
          }).then((res) =>  {
            if (res.status === 200) {
                toast.success('banner deleted successfully', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });


              getbanner(data)
            } else {
             
                toast.error('please try again later ', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
            }
          }
        )
            
        } catch (err) {
          toast.error('please try again later ' + err, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          console.log(err);
        }

    
        
      }
    


    return (


        <div className={style.card} >
        <div className="tcard" >
             
                <img src={img} alt="" />
                <h2>{name}</h2>

                 <button id={style.edit}> <Link to={"/admin/editbanner/" + id }> edit  </Link> </button>
               <button id={style.delete} onClick={del} >  delete </button>
        </div>
</div>
    )
}

export default List