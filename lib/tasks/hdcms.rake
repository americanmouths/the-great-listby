namespace :db do
  desc 'heroku pg:reset, migrate, seed'
  task hdcms: :environment do
    exec('heroku pg:reset --app the-great-listby --confirm the-great-listby
      heroku run rake db:migrate --app the-great-listby
      heroku run rake db:seed --app the-great-listby')
  end
end
