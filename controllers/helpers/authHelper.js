//Here for authentication purpose helping function has been defined

import bcrypt from 'bcrypt';


export const hashPassword=async(password)=>{

     try
     {
         const saltRounds=10;
         const hash=await bcrypt.hash(password,saltRounds);
         return hash;
     }
     catch(error)
     {
          console.log(error);
     }
};

export const comparePassword=async (password,hashPassword)=>{

    return bcrypt.compare(password,hashPassword);
}

