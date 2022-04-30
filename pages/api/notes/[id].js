import Notes from '../../../models/Notes';
import nc from 'next-connect'
import auth from '../middleware/auth';
const handler = nc()
    .use(auth)
    // create a clone of a notes
    .post(async (req, res) => {
        try {
            // get id from the url
            const id = req.query.id;
            // find the notes by id
            const notes = await Notes.findById({ _id: id });
            // convert to object
            const toObject = notes.toObject();
            // delete the id
            delete toObject._id;
            // create the instance of notes models
            const newNotes = new Notes(toObject);
            // save the notes
            const newNote = await newNotes.save();
            if (newNote) {
                res.send({
                    success: true,
                    message: 'Notes clone successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
    // delete notes
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
    // edit notes
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
    // update notes
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