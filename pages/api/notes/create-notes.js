import nc from 'next-connect'
import Notes from '../../../models/Notes';

const handler = nc()
    .post(async (req, res) => {
        try {
            // destructure the req body
            const { title, description, bg_color, user_id } = req.body;
            // check all the field is fill or not
            if (!title || !description || !user_id) {
                res.send({
                    success: false,
                    message: 'Please fill the field'
                })
            } else {
                //create object of notes model
                const notes = new Notes({ title, description, user_id, bg_color });
                // to save notes
                const note = await notes.save();
                // check the notes is or not
                if (note) {
                    res.send({
                        success: true,
                        message: 'Notes Create Successfully',
                    })
                } else {
                    res.send({
                        success: false,
                        message: 'Server Problem',
                    })
                }
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
            })
        }
    });

export default handler;