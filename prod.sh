#!/bin/sh

gulp prod
git ci -m 'Configure for production'
git push heroku master
gulp dev
grep envService.set app/topLevel/index.js
