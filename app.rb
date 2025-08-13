ENV['RAILS_SERVE_STATIC_FILES'] = '1'

# Ensure proper bundle setup for Lambda
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('Gemfile', __dir__)
ENV['BUNDLE_PATH'] ||= File.expand_path('vendor/bundle', __dir__)

require_relative 'config/boot'
# Skip dotenv in production Lambda - env vars are set via CDK
begin
  require 'dotenv'
  Dotenv.load ".env.#{ENV['RAILS_ENV']}"
rescue LoadError
  # dotenv not available in Lambda deployment - this is expected
end
require 'lamby'
require_relative 'config/application'
require_relative 'config/environment'

$app = Rack::Builder.new { run Rails.application }.to_app

def handler(event:, context:)
  Lamby.handler $app, event, context, rack: :http
end
