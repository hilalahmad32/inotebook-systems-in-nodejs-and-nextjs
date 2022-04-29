import nc from 'next-connect';
import cookie from 'cookie'

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
                const saveCookie = cookie.serialize('access_token', null, {
                    httpOnly: true,
                    secure: 'development',
                    maxAge: -1,// 30 days
                    path: '/'
                })
                res.setHeader('Set-Cookie', saveCookie)
                res.send({ message: 'Logout successfully' })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    });

export default handler;