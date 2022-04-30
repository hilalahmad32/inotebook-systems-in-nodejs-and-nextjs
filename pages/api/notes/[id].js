import Notes from '../../../models/Notes';
import nc from 'next-connect'
import auth from '../middleware/auth';
const handler = nc()
    .use(auth)
    .delete(async (req, res) => {
        try {
            const id = req.query.id;
            const notes = await Notes.findByIdAndDelete({ _id: id });
            if (notes) {
                res.send({
                    success: true,
                    message: 'Notes Delete successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server Problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.messeage
            })
        }

    })
    .put(async (req, res) => {
        try {
            const id = req.query.id;
            const notes = await Notes.findById({ _id: id });
            if (notes) {
                res.send({
                    success: true,
                    notes: notes,
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server Problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.messeage
            })
        }
    })
    .patch(async (req, res) => {
        try {
            const id = req.query.id;
            // destructure the body
            const { title, description, bg_color } = req.body;
            // update the notes
            const notes = await Notes.findByIdAndUpdate({ _id: id }, {
                title, description, bg_color,
            });
            if (notes) {
                res.send({
                    success: true,
                    message: 'Notes Update successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server Problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.messeage
            })
        }
    })
export default handler;