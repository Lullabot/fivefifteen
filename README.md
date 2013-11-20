fivefifteen
===========

AngularJs app to help with my weekly report.


## Build process

1. from the master branch run `cp -R app dist` to copy all files from `app` into `dist`
1. run `git checkout gh-pages` to switch into the github pages branch
1. from the gh-pages branch run `cp -R dist/* .` to copy all the files from `dist` into the root
1. run `git commit -am "update from master" && git push` to update the gh-pages branch
