# LifeTrack

LifeTrack is a Ruby command-line application that allows users to log daily events (work sessions, study blocks, workouts, and meals) and dispatches those events simultaneously to multiple handlers.

The project demonstrates:
- **Observer Pattern**: `EventRouter` acts as the subject, notifying all registered handler observers when a new life event is logged.
- **Strategy Pattern**: Concrete handlers (`ConsoleHandler`, `FileHandler`, `HtmlDashboardHandler`) implement swappable handling strategies through a shared interface.
- **SOLID Principles**: Each class has a single responsibility, the system is open for extension but closed for modification, classes are liskov-substitutable, the handler interface is lean, and high-level router modules depend on abstraction, not concretions.

---

## Project Structure

```text
lifetrack/
├── main.rb                    # Application entry point, CLI loop, and dependency injection
├── life_event.rb              # Pure data class representing a life event
├── event_router.rb            # Event routing & observer dispatcher
├── handlers/
│   ├── handler.rb             # Base Handler interface (raises NotImplementedError)
│   ├── console_handler.rb     # Prints events to the terminal console
│   ├── file_handler.rb        # Appends events to log.txt in JSON Lines format
│   └── html_dashboard_handler.rb # Generates a dynamic HTML dashboard page
└── utils/
    └── event_validator.rb     # Decoupled validation logic for input events
```

---

## SOLID Principles Walkthrough

### 1. Single Responsibility Principle (SRP)
Each class has a single, well-defined reason to change:
- `LifeEvent` only carries data and does not format, store, or route itself.
- `EventValidator` only performs validation checks and has no I/O logic.
- `EventRouter` handles only registering and routing events to handlers.
- `ConsoleHandler` only prints to stdout.
- `FileHandler` only appends to the text file.
- `HtmlDashboardHandler` only reads the log file and generates the `dashboard.html` file.

### 2. Open/Closed Principle (OCP)
The application can be extended with new handlers without modifying any existing classes. For instance, to add a new handler, you create a new handler file and register it in `main.rb`. The `EventRouter` never changes.

### 3. Liskov Substitution Principle (LSP)
All concrete handlers inherit from `Handler` and are completely interchangeable. The router can invoke `handle(event)` on any of them, and replacing one with another will not break the dispatching process.

### 4. Interface Segregation Principle (ISP)
The `Handler` abstraction requires exactly one method: `handle(event)`. Concretions are not forced to implement methods they do not need.

### 5. Dependency Inversion Principle (DIP)
`EventRouter` depends entirely on the `Handler` abstraction. It does not import or know about `ConsoleHandler`, `FileHandler`, or `HtmlDashboardHandler`. This connection is wired externally in `main.rb` (dependency injection).

---

## Bonus: The Architect's Test (Slack Notifications)

If the product manager requests Slack notifications on every logged event:

1. **Class Name & Location**:
   - The class would be named `SlackHandler` and live in `handlers/slack_handler.rb`.
2. **Method to Implement**:
   - It must implement the `#handle(event)` method.
3. **Files to Open & Edit to Plug It In**:
   - Only `main.rb` would be opened to import the class and register it:
     ```ruby
     require_relative 'handlers/slack_handler'
     router.register(SlackHandler.new("webhook_url"))
     ```
4. **SOLID Compliance**:
   - Neither `event_router.rb` nor `handlers/handler.rb` would be modified. If they were, the **Open/Closed Principle** would be violated.
