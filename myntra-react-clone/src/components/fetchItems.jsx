import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { itemActions } from "../store/itemSlice";
import  { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
    const fetchStatus=useSelector((store) => store.fetchStatus);
    const dispatch=useDispatch();
    console.log(fetchStatus);
   

    useEffect(()=> {
        if(fetchStatus.fetchDone) return;
        const controller=new AbortController();
        const signal= controller.signal;
    
        // dispatch(fetchStatusActions.markFetchStarted());
        fetch('http://localhost:8080/items',{signal})
        .then(res => res.json())
        .then(({items})=>  { 
            console.log(items)
            dispatch(itemActions.addInitialItems(items));
        dispatch(fetchStatusActions.markFetchDone());
       return null;
        
         });
        
         return () => {
         
          controller.abort();  
           };
      }, [fetchStatus]);

      return (
        <></>
    );
}
export default FetchItems;