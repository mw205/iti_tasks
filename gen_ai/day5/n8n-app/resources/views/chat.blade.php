<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>n8n AI Chat</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 400px;
        }

        h1 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #333;
        }

        textarea {
            width: 100%;
            height: 100px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            resize: none;
            margin-bottom: 1rem;
        }

        button {
            width: 100%;
            background-color: #4a90e2;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        }

        button:hover {
            background-color: #357abd;
        }

        .response {
            margin-top: 1.5rem;
            padding: 10px;
            background: #eef2f7;
            border-left: 4px solid #4a90e2;
        }

        .error {
            color: red;
            margin-top: 1rem;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Add your feedback</h1>
        <form action="/chat" method="POST">
            @csrf
            <textarea name="message" placeholder="Type your feedback here..." required></textarea>
            <button type="submit">Send to n8n</button>
        </form>

        @if(isset($aiResponse))
            <div class="response">
                <strong>feedback received</strong>
                <strong>You:</strong> {{ $userMessage }}<br><br>
                <strong>AI:</strong> {{ $aiResponse }}
            </div>
        @endif

        @if(isset($error))
            <div class="error">{{ $error }}</div>
        @endif
    </div>
</body>

</html>