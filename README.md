#PILI API docs

##Getting Set Up
Install all dependencies: bundle install

Start the test server: bundle exec middleman server

##Publishing Your Docs to Your Own Server
Instead of using `rake publish`, use `rake build`. Middleman will build your website to the build directory of your project, and you can copy those static HTML files to the server of your choice.
