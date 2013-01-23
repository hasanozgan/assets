#!/bin/bash

command -v npm >/dev/null 2>&1 || { echo >&2 "I require nodejs but it's not installed. Aborting."; exit 1; }
command -v bower >/dev/null 2>&1 || { echo >&2 "I require bower but it's not installed. 'npm install bower -g' Aborting."; exit 1; }
command -v grunt >/dev/null 2>&1 || { echo >&2 "I require grunt but it's not installed. 'npm install grunt -g' Aborting."; exit 1; }
command -v recess >/dev/null 2>&1 || { echo >&2 "I require recess but it's not installed. 'npm install recess -g' Aborting."; exit 1; }
command -v jshint >/dev/null 2>&1 || { echo >&2 "I require jshint but it's not installed. 'npm install jshint -g' Aborting."; exit 1; }
command -v jslint >/dev/null 2>&1 || { echo >&2 "I require jslint but it's not installed. 'npm install jslint -g' Aborting."; exit 1; }
command -v uglifyjs >/dev/null 2>&1 || { echo >&2 "I require uglifyjs but it's not installed. 'npm install uglify-js -g' Aborting."; exit 1; }

bower update

cd components/bootstrap; make

grunt
