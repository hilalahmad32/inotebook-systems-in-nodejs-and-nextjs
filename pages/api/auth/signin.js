import nc from 'next-connect';
import User from '../../../models/User';
import bcryptjs from 'bcryptjs'
import connectDb from '../../../connection/config';
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
// check connection 
connectDb()
const JWT_SECRET = 'HILALAHMADKHANISAPROGRAMMERWHOCANDEVELOPEDANYWEBSITEINMERNANDMEVNANDMENN'
const handler = nc()
    // login users
    .post(async (req, res) => {
        try {
            // destructure the body
            const { email, password } = req.body;
            // check the user fill the form or not
            if (!email || !password) {
                res.send({
                    success: false,
                    message: 'Please fill the form'
                })
            } else {
                // check the user can enter valid email or not
                const user = await User.findOne({ email: email });
                // check if statement
                if (user) {
                    // check the password is same or not
                    const passwordCompare = await bcryptjs.compare(password, user.password);
                    if (passwordCompare) {
                        // send the token
                        const user_id = { user_id: user._id }
                        const authToken = jwt.sign(user_id, JWT_SECRET);
                        // store in cookie

                        const saveCookie = cookie.serialize('access_token', authToken, {
                            httpOnly: true,
                            secure: 'development',
                            maxAge: 60 * 60 * 24 * 30,// 30 days
                            path: '/'
                        })
                        res.setHeader('Set-Cookie', saveCookie)
                        res.send({
                            success: true,
                            authToken,
                            message: 'Login Successfully'
                        })
                    } else {
                        res.send({
                            success: false,
                            message: 'Invalid Email and Password'
                        })
                    }
                } else {
                    res.send({
                        success: false,
                        message: 'Invalid Email and Password'
                    })
                }
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
export default handler