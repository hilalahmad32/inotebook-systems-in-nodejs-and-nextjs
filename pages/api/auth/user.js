import nc from 'next-connect';
import User from '../../../models/User';
import auth from '../middleware/auth';
const JWT_SECRET = 'HILALAHMADKHANISAPROGRAMMERWHOCANDEVELOPEDANYWEBSITEINMERNANDMEVNANDMENN'

const handler = nc()
    // use middleware
    .use(auth)
    // get authenticated user
    .get(async (req, res) => {
        try {
            // get users by user_id
            const users = await User.findById({ _id: req.user }).select('-password')
            if (users) {
                res.send({
                    success: true,
                    users: users
                })
            }
        }
        catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    });

export default handler;