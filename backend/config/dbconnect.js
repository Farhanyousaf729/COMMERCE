import mongoose from "mongoose";

const Dbconnection = async(url)=>{
      

      try{
        await mongoose.connect(url)
        
      }
      catch(e){
           console.error(e);
      }
}
export default Dbconnection