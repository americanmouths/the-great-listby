namespace :db do
  desc 'heroku pg:reset, migrate, seed'
  task hdcms: :environment do
    exec('heroku pg:reset --app swt-listby --confirm swt-listby
      heroku run rake db:migrate --app swt-listby
      heroku run rake db:seed --app swt-listby')
  end
end
