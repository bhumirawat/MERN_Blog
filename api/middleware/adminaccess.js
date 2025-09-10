import jwt from 'jsonwebtoken'
export const adminaccess = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if(!token){
            return res.status(403).json({ message: 'Unauthorized' })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if(decodeToken.role === 'admin'){
            req.user = decodeToken
            next()
        }else{
            return res.status(403).json({ message: 'Admin access required' })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}