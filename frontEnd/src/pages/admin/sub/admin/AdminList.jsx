import React from "react";
import { Link } from "react-router-dom";
import Style from "../../style/AdminList.module.css"
  import { ToastContainer, toast, Bounce } from 'react-toastify';
import { getadmin, getuser } from "../../Admin";

const List = ({name, img, email, id, data, data2}) => {
    
    function del(params) {
        try {
            const response =  fetch(process.env.REACT_APP_API_LINK + "admin/del/admin", {
              method: "PATCH",
              credentials: "include",
              headers: { "Content-type": "application/json; charset=UTF-8", },
              body: JSON.stringify({
                productId: id,
        
              }),
      
            })
          
          .then((res) =>  {
                                if (res.status === 200) {
                                    toast.success('admin deleted successfully ', {
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
                    
                    
                                  getadmin(data)
                                  getuser(data2)

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


        <div className={Style.card} >
        <div className="tcard">
                <img id={Style.img} src={img} alt="" />
                <h2>{name}</h2>
                <h4>{email}</h4>

               <button id={Style.delete} onClick={del}> delete  </button>
        </div>
</div>
    )
}

export default List