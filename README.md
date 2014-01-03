fivefifteen
===========

AngularJs app to help with my weekly report.


## Installing

1. Checkout the master branch.
1. Install yeoman and bower with `npm install -g yo bower`.
1. Install any node dependencies with `npm install`.
1. Install any bower components with `bower install`.
1. Run the app with `grunt server`.

## Contributing

1. Make sure there is an issue for anything you are working on.
1. Create a new branch for your issue (something like 9-doc-contrib for issue #9)
1. Make sure any commits to this branch reference the ticket number (ex: Ref: #9)
1. Push the branch to the remote
1. Use `hub` to atach your code to the issue (ex: `hub pull-request -i 9`)


## Build process

1. from the master branch run `cp -R app dist` to copy all files from `app` into `dist`
1. run `git checkout gh-pages` to switch into the github pages branch
1. from the gh-pages branch run `cp -R dist/* .` to copy all the files from `dist` into the root
1. run `git commit -am "update from master" && git push` to update the gh-pages branch
