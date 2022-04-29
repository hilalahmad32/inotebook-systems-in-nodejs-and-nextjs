import nc from 'next-connect'
import Notes from '../../../models/Notes';
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'HILALAHMADKHANISAPROGRAMMERWHOCANDEVELOPEDANYWEBSITEINMERNANDMEVNANDMENN'
const handler = nc()
    .get(async (req, res) => {
        try {
            // get cookie
            const { cookies } = req;
            // get token
            const token = cookies.access_token;
            if (token) {
                // get user_id and verify jwt
                const { user_id } = jwt.verify(token, JWT_SECRET);
                // get all notes
                const notes = await Notes.find({ user_id }).populate();
                if (notes) {
                    res.send({
                        success: true,
                        notes: notes
                    })
                }
            } else {
                res.send({
                    success: false,
                    message: 'Unauthorized'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
export default handler;