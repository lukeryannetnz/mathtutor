# Multi-stage build for AWS Lambda with Ruby 3.4
# Stage 1: Build dependencies
FROM public.ecr.aws/lambda/ruby:3.4 AS builder

# Install build dependencies
RUN dnf install -y \
    sqlite-devel \
    gcc gcc-c++ make \
    libyaml-devel \
    pkgconfig \
    nodejs npm && \
    npm install -g yarn && \
    dnf clean all

# Set workdir
WORKDIR /var/task

# Copy and install gems
COPY Gemfile Gemfile.lock ./
RUN gem update bundler && \
    bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle config set --local path 'vendor/bundle' && \
    bundle install --jobs 4 --retry 3

# Stage 2: Production image  
FROM public.ecr.aws/lambda/ruby:3.4

# Install only runtime dependencies
RUN dnf install -y sqlite && dnf clean all

# Set workdir
WORKDIR /var/task

# Copy gems from builder stage
COPY --from=builder /var/task/vendor /var/task/vendor
COPY --from=builder /var/task/.bundle /var/task/.bundle
COPY Gemfile Gemfile.lock ./

# Copy application code
COPY . .

# Ensure database and directories exist
RUN mkdir -p /var/task/storage && \
    mkdir -p /var/task/tmp && \
    mkdir -p /var/task/log && \
    mkdir -p /var/task/db

# Set up production database and precompile assets
RUN RAILS_ENV=production bundle exec rake db:create db:migrate && \
    RAILS_ENV=production bundle exec rake assets:precompile || true

# Set the Lambda entrypoint for Rails with Lamby
CMD ["app.handler"]
