import nc from 'next-connect';
import User from '../../../models/User';
import bcryptjs from 'bcryptjs'
import connectDb from '../../../connection/config';
// check connection 
connectDb()
const handler = nc()
    // create account 
    .post(async (req, res) => {
        try {
            // destructure body
            const { name, email, password } = req.body;
            // validate the users
            if (!name || !email || !password) {
                res.status(400).send({ succes: false, message: 'Please fill the field' });
            } else {
                // check if email already exist or not
                const is_email = await User.findOne({ email: email });
                // check the condition
                if (is_email) {
                    // send error message
                    res.send({
                        success: false,
                        message: 'Email already exist'
                    })
                } else {
                    // hash Password
                    const hashPassword = await bcryptjs.hash(password, 10);
                    // create object of user model
                    const users = new User({ name, email, password: hashPassword });
                    // save user
                    const user = await users.save();
                    // check the condition if user save successfully
                    if (user) {
                        // show message if success
                        res.send({
                            success: true,
                            message: 'Account create successfully ? Now Login'
                        });
                    } else {
                        // show message if some problem
                        res.send({
                            success: false,
                            message: 'Server Problem'
                        })
                    }
                }
            }
        } catch (error) {
            // show error message
            res.status(500).send(`error ${error.message}`);
        }
    })
export default handler