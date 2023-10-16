import bcrypt from "bcryptjs"
const Users = [


    {
        name: 'farhanyousaf',
        email: 'fboby23@gmail.com',
        password: bcrypt.hashSync( '123456',10),
        roles: {
            Editor: 5150,
            Admin: 1984
        },
    },
    {
        name: 'farhanyousaf1',
        email: 'example123@gmail.com',
        password:bcrypt.hashSync('123456',10),
        roles: {
            Editor: 5150,
            
        },

    },
    {
        name: 'farhanyousaf2',
        email: 'example456@gmail.com',
        password: bcrypt.hashSync('123456' , 10) ,
       
    },
    {
        name: 'farhanyousaf3',
        email: 'example789@gmail.com',
        password: bcrypt.hashSync('123456' , 10) ,
       
    },

]
export default Users