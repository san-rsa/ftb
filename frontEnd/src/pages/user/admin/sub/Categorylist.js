import React from "react";
import { Link } from "react-router-dom";
import style from "../style/List.module.css"
  import { ToastContainer, toast, Bounce } from 'react-toastify';
          import { getcategory } from "../Admin";

const List = ({name, img, data, id}) => {

    function del(e) {
        e.preventDefault()
    
          console.log(id)
    
          
    
        try {
          const response =  fetch(process.env.REACT_APP_API_LINK + "admin/del/category", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify({
              productId: id,
            }),
    
          })
        
          .then((res) =>  {
                      if (res.status === 200) {
                          toast.success('category deleted successfully ', {
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
          
          
                        getcategory(data)
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
             <Link to={"/desc"}>
                <img src={img} alt="" />
                <h2>{name}</h2>
            </Link>   

                 <button id={style.edit}> <Link to={"/admin/editcategory/" + id }> edit  </Link> </button>
               <button id={style.delete} onClick={del}> delete </button>
        </div>
</div>
    )
}

export default List