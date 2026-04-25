<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    /**
     * Show the chat form.
     */
    public function index()
    {
        return view('chat');
    }

    /**
     * Send the message to n8n and get the AI response.
     */
    public function send(Request $request)
    {
        // 1. Validate the input
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        // 2. The n8n Webhook URL (from your test.txt)
        $n8nUrl = "https://mohamedwaleed205.app.n8n.cloud/webhook-test/process-query";

        try {
            // 3. Use Laravel's HTTP Client to send a POST request
            $response = Http::post($n8nUrl, [
                'message' => $validated['message'],
                'email' => "mohamedwaleedabdelghany@gmail.com",
                "name" => "Mohamed Waleed"
            ]);

            // 4. Extract the answer from the n8n response
            // Assuming the AI response is in the body or a specific field
            $aiResult = $response->json();

            // If n8n returns a list, we might need the first item
            // Adjust according to your n8n Respond to Webhook node configuration
            $answer = is_array($aiResult) && isset($aiResult[0]['output'])
                ? $aiResult[0]['output']
                : ($aiResult['output'] ?? $response->body());

            return view('chat', [
                'userMessage' => $validated['message'],
                'aiResponse' => $answer
            ]);
        } catch (\Exception $e) {
            return view('chat', [
                'error' => "Error connecting to n8n: " . $e->getMessage()
            ]);
        }
    }
}
