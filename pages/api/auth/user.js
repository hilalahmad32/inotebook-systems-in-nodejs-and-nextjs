import nc from 'next-connect';
import jwt from 'jsonwebtoken'
import User from '../../../models/User';
const JWT_SECRET = 'HILALAHMADKHANISAPROGRAMMERWHOCANDEVELOPEDANYWEBSITEINMERNANDMEVNANDMENN'

const handler = nc()
    // get authenticated user
    .get(async (req, res) => {
        try {
            // get token
            const { cookies } = req;
            const token = cookies.access_token;
            if (!token) {
                res.send({
                    success: false,
                    message: 'Unauthorized'
                })
            } else {
                // verify token and get user_id
                const { user_id } = jwt.verify(token, JWT_SECRET);
                // get users by user_id
                const users = await User.findById({ _id: user_id }).select('-password')
                if (users) {
                    res.send({
                        success: true,
                        users: users
                    })
                }
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    });

export default handler;