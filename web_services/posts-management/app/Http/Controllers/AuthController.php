<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => "required|email|exists:users",
            "password" => "required|string"
        ]);
        if (!Auth::attempt($credentials)) {
            return $this->failure(["email" => "Invalid password or email"], "Invalid credentials", 401);
        }
        $user = User::where("email", $request->email)->firstOrFail();
        $token = $user->createToken("auth_token")->plainTextToken;
        return $this->success([$user, "access_token" => $token], "User logged in successfully", 200);
    }
    public function register(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8|max:255'
            ]
        );
        $user = User::create($validated);
        $token = $user->createToken("auth_token")->plainTextToken;
        return $this->success([$user,  "access_token" => $token], "User created successfully", 201);
    }
    public function me(Request $request)
    {
        if (!$request->user()) {
            return $this->failure(null, "User not found", 404);
        }
        return $this->success($request->user(), "User fetched successfully", 200);
    }
    public function logout(Request $request)
    {

        $request->user()->tokens()->where(
            'id',
            $request->user()->currentAccessToken()->id
        )->delete();

        return $this->success(null, "User logged out successfully", 200);
    }
}
