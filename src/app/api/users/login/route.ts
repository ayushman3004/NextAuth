import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels'
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request:NextRequest) {
    try{
        const reqbody = await request.json()
        const {email,password} = reqbody
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"Please Singup first"},{status:400})
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({message:"Check your credentials"},{status:400})
        }

        // console.log();
        // data is called payload where we need to make a jwt token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '1h'})
        const response = NextResponse.json({
            message: "Loggedin Successfully",
            success : true
        })
        response.cookies.set("token" , token,{
            httpOnly: true
        })
        return response
    }
    catch(error:any){
        return NextResponse.json({error: "Login Credentials Invalid"}, {status:400})
    }
}