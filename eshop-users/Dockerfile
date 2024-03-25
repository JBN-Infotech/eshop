FROM ruby:3.0.5

WORKDIR /rails

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 3002

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3002"]
