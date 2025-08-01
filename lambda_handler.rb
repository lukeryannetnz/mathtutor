require_relative 'config/environment'

def lambda_handler(event:, context:)
  {
    statusCode: 200,
    body: "Hello from MathTutor Rails App!",
    headers: {
      'Content-Type' => 'application/json'
    }
  }
end
