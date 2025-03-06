<?php
use App\Models\Conversation;
use Conversation as GlobalConversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'applicant_user_id' => 'required|exists:users,id', // Make sure the applicant exists
            'company_user_id' => 'required|exists:users,id',   // Make sure the company exists
            'message' => 'required|string',
        ]);

        $conversation =Conversat::create([
            'application_id' => $validated['application_id'],
            'applicant_user_id' => $validated['applicant_user_id'],
            'company_user_id' => $validated['company_user_id'],
            'message' => $validated['message'],
        ]);

        return response()->json($conversation, 201); // Return the created conversation
    }
}

