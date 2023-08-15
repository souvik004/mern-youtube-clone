import express from "express";
import passport from "passport";
const googleRouter = express.Router();

googleRouter.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({status: "success", user: req.user})
    }else{
        res.send("oops")
    }
})

googleRouter.get('/logout', (req, res) => {
    req.logout()
})

googleRouter.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

googleRouter.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
        successRedirect: "http://localhost:3000"
    }),
);

googleRouter.get("/github",
    passport.authenticate("github", {
        scope: ["profile"],
    })
);

googleRouter.get("/github/callback",
    passport.authenticate("github", {
        failureRedirect: "http://localhost:3000/login",
        successRedirect: "http://localhost:3000"
    }),
);


export default googleRouter