<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use App\Models\Post;
use
    Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PostController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        return $this->success($posts, "Posts fetched successfully", 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePostRequest $request)
    {
        $post = $request->user()->posts()->create($request->validated());
        return $this->success($post, "Post created successfully", 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::findOrFail($id);
        return $this->success($post, "Post fetched successfully", 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $id)
    {

        $post = Post::findOrFail($id);
        try {
            $this->authorize("delete", $post);
        } catch (\Throwable $th) {
            return $this->failure(null, $th->getMessage(), 403);
        }
        $post->update($request->validated());
        $post->save();
        return $this->success($post, "Post updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $post = Post::findOrFail($id);

        try {
            $this->authorize("delete", $post);
        } catch (\Throwable $th) {
            return $this->failure(null, $th->getMessage(), 403);
        }
        $post->delete();
        return $this->success(null, "Post deleted successfully", 200);
    }
}
