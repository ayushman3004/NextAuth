import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels'
import {NextRequest,NextResponse} from 'next/server'
connect()
// token must be removed to logout
export async function GET(request:NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true,
        })
        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0)
        });
        return response
    } catch (error: any) {
        return NextResponse.json({error: "Login Credentials Invalid"}, {status:400})
    }   
}