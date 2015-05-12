fivefifteen
===========

AngularJs app to help with my weekly report.


## Installing

1. Checkout the master branch.
1. Install yeoman and bower with `npm install -g yo bower`.
1. Install any node dependencies with `npm install`.
1. Install any bower components with `bower install`.
1. Install compass for building Sass with `gem install compass`
1. Run the app with `grunt server`.

### Troubleshooting

- If you get an error with `SELF_SIGNED_CERT_IN_CHAIN`, try running the following command before re-trying the install: `npm config set strict-ssl false`
- If you get permission errors, try running the commands as the administrative user with `sudo`.

## Contributing

1. Make sure there is an issue for anything you are working on.
1. Create a new branch for your issue (something like 9-doc-contrib for issue #9)
1. Make sure any commits to this branch reference the ticket number (ex: Ref: #9)
1. Push the branch to the remote
1. Use `hub` to atach your code to the issue (ex: `hub pull-request -i 9`)


## Build process

1. run `grunt build`
1. run `grunt gh-pages`
