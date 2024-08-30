import express from "express";

const router = express.Router();

//post /api/v1/auth/register
router.post("/register", async(req, res) => {
  try {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
  } catch (error) {
    res.json({message: error.message})               
  }
});

//post /api/v1/auth/login
router.post("/login", (req, res) => {
  res.send("Login");
});

//get /api/v1/auth/logout
router.get("/logout", (req, res) => {
  res.send("Logout");
});

//get /api/v1/auth/getUser
router.get("/getuser", (req, res) => {
  res.send("Get Current User");
});
export default router;
