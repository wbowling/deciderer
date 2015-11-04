# deciderer
We could never agree on where to go for lunch on a Friday, so I created something to help...

deciderer allows you to create a poll for a specified date and time and allows people to vote and add their own options. Letting people vote for multiple options is a quick and easy way to try and keep the most number of people happy (see [Quick and Easy Voting for Normal People](http://www.youtube.com/watch?v=orybDrUj4vA)).

[Here](https://deciderer.firebaseapp.com) is the hosted version.

Create ![Creating a poll](http://i.imgur.com/Fm2wzSN.png)

Vote ![Example poll](http://i.imgur.com/EIzO5ik.png)


## Development
If you want to run your own version you will need to create an app with [Firebase](http://www.firebase.com) (it's free) and fill in the config/config.js and firebase.json with your app name. You will also need to configure Google authentication for your app, see [here](https://www.firebase.com/docs/web/guide/login/google.html)

When that is all configured you can just run:
```
npm install
npm run devel
```

deciderer should now be up and running on port 8080.

## Deploy
Firebase offers free hosting, so if you want to deploy to their CDN you can install the Firebase CLI from [here](https://www.firebase.com/docs/hosting/command-line-tool.html) and run `firebase login` and follow the prompts, then:

```
npm run dist
firebase deploy
```

This will build the app into the dist folder and then push it to Firebase Hosting. The URL for your app will be shown or you can run `firebase open` to launch it.

## Firebase rules
The default Firebase rules allow read/write access to everything. You can upload the current deciderer rules with the Firebase CLI: 
```
firebase deploy:rules
```

## Credits
Lots of great libraries have been used in this project, the main ones are:

* Firebase - https://www.firebase.com
* React - https://facebook.github.io/react/
* React Router - https://github.com/rackt/react-router
* React-Bootstrap - https://react-bootstrap.github.io/
* Bootstrap - http://getbootstrap.com/
* Cyborg Bootstrap Theme - https://bootswatch.com/cyborg/
* react-chartjs - https://github.com/jhudson8/react-chartjs
* react-bootstrap-daterangepicker https://github.com/skratchdot/react-bootstrap-daterangepicker


