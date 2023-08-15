import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20'
import GithubStrategy from 'passport-github2'
import FacebookStrategy from 'passport-facebook'
import User from '../model/User.js';

GoogleStrategy.Strategy
GithubStrategy.Strategy
FacebookStrategy.Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, cb) => {
    // console.log(profile)
    cb(null, profile)

    // const duplicate = await User.findOne({email: profile._json.email})

    // if(duplicate){
    //     return cb(null, profile)
    // }
    // const newUser = await User.create({
    //     name: profile.displayName,
    //     email: profile.emails[0].value,
    //     img: profile.photos[0].value
    // });
    // return cb(null, newUser)
  }
));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    // User.findById(id, (err, user) => {
    //     done(err, user);
    // })
    done(null, id);
});


