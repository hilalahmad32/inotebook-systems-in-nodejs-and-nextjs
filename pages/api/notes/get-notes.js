import nc from 'next-connect'
import Notes from '../../../models/Notes';
import auth from '../middleware/auth';
const JWT_SECRET = 'HILALAHMADKHANISAPROGRAMMERWHOCANDEVELOPEDANYWEBSITEINMERNANDMEVNANDMENN'
const handler = nc()
    // use middleware
    .use(auth)
    .get(async (req, res) => {
        try {
            // get all notes
            const notes = await Notes.find({ user_id: req.user }).populate();
            if (notes) {
                res.send({
                    success: true,
                    notes: notes
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