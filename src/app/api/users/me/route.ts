import {connect} from '@/dbConfig/dbConfig'
import { getDatafromToken } from '@/helpers/getdatafromToken'
import User from '@/models/userModels'
import {NextRequest,NextResponse} from 'next/server'
connect()
// token must be removed to logout
export async function POST(request:NextRequest) {
    //extract data from token
    const userId = await getDatafromToken(request)

    const user = await User.findOne({_id:userId}).select("-password")
    //check if there is no user
    return NextResponse.json({
        message: "user found",
        data: user
    })

}