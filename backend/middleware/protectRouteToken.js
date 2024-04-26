export const checkTokenMiddleware = (req, res, next) => {
    // Check if the Authorization header exists
    const authHeader = req.headers.authorization;
   

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[0];
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }
    next(); 
  
  }; 
  
