# Math Tutor - Interactive Math Practice for Young Learners

A fun and engaging web application designed specifically for 5-6 year olds to practice basic addition equations. Built with Ruby on Rails and modern web technologies, this application provides an interactive learning experience that helps young children develop their mathematical skills.

## 🎯 Purpose

Math Tutor is designed to make learning math fun and accessible for young children. The application:
- Generates random addition equations with numbers 1-10
- Provides an interactive "Show Answer" feature
- Allows students to practice at their own pace
- Uses a clean, child-friendly interface
- Supports Progressive Web App (PWA) features for mobile learning

## 🛠 Technology Stack

- **Ruby**: 3.4.5
- **Rails**: 8.0.2
- **Database**: SQLite3
- **Frontend**: Hotwire (Turbo + Stimulus)
- **Styling**: CSS with modern design principles
- **Testing**: Rails built-in testing framework with Capybara
- **Code Quality**: RuboCop with Rails Omakase styling
- **Security**: Brakeman for vulnerability scanning

## 🚀 Getting Started

### Prerequisites

- Ruby 3.4.5 or higher
- Rails 8.0.2
- SQLite3
- Node.js (for asset compilation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mathtutor
   ```

2. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

3. **Set up the database**
   ```bash
   rails db:create
   rails db:migrate
   ```

4. **Start the development server**
   ```bash
   rails server
   ```

5. **Visit the application**
   Open your browser and navigate to `http://localhost:3000`

## 🧪 Running Tests

The application includes comprehensive tests for all components:

```bash
# Run all tests
rails test

# Run specific test files
rails test test/models/addition_equation_test.rb
rails test test/controllers/addition_equations_controller_test.rb
rails test test/system/addition_equations_test.rb

# Run tests with coverage (if SimpleCov is added)
COVERAGE=true rails test
```

## 🔍 Code Quality Checks

```bash
# Run RuboCop for code style checking
bundle exec rubocop

# Run Brakeman for security vulnerabilities
bundle exec brakeman

# Run all checks
bundle exec rubocop && bundle exec brakeman
```

## 📱 Features

### Core Functionality
- **Random Equation Generation**: Creates addition problems with numbers 1-10
- **Interactive Answer Reveal**: Students can show/hide answers at their own pace
- **New Equation Button**: Generate fresh problems instantly
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Technical Features
- **Turbo Streams**: Real-time equation updates without page refreshes
- **Progressive Web App**: Installable on mobile devices
- **Modern UI**: Clean, child-friendly interface with smooth animations
- **Accessibility**: Designed with accessibility principles in mind

## 🏗 Application Structure

```
app/
├── controllers/
│   └── addition_equations_controller.rb  # Handles equation generation and display
├── models/
│   └── addition_equation.rb              # Core math equation logic
├── views/
│   └── addition_equations/
│       ├── index.html.erb               # Main game interface
│       └── _equation.html.erb           # Individual equation component
└── javascript/
    └── controllers/                     # Stimulus controllers for interactivity
```

## 🎨 Customization

### Adding New Equation Types
The application is designed to be easily extensible. To add new equation types:

1. Create new models (e.g., `SubtractionEquation`, `MultiplicationEquation`)
2. Add corresponding controllers and views
3. Update routes as needed
4. Add tests for new functionality

### Styling
The application uses custom CSS for styling. Main styles are located in the view files and can be customized to match your preferred design.

## 🚀 Deployment

The application includes Docker support and Kamal deployment configuration:

```bash
# Build Docker image
docker build -t mathtutor .

# Deploy with Kamal (if configured)
kamal deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ for young learners everywhere**
