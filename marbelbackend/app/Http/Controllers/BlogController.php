<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    //
    public function index()
    {
        $blogs = Blog::all();
        return response()->json(['status' => true, 'data' => $blogs]);
    }

    public function show($id)
    {
        $blog = Blog::find($id);
        if ($blog) {
            return response()->json(['status' => true, 'data' => $blog]);
        }
        return response()->json(['status' => false, 'message' => 'Blog not found'], 404);
    }

    // POST /api/blogs - Create a new blog
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'blog_name' => 'required',
            'blog_slug' => 'required|unique:blogs,blog_slug',
            'blog_image' => 'required|mimes:jpeg,jpg,png,tif,avif,webp',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        $model = new Blog();

        if ($request->hasFile('blog_image')) {
            $image = $request->file('blog_image');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/products'), $image_name);
            $model->blog_image = 'uploads/products/' . $image_name;
        }

        $model->blog_name = $request->blog_name;
        $model->blog_type = $request->blog_type;
        $model->blog_slug = $request->blog_slug;
        $model->blog_shortdesc = $request->blog_shortdesc;
        $model->blog_desc = $request->blog_desc;
        $model->post_by = $request->post_by;
        $model->save();

        return response()->json(['status' => true, 'message' => 'Blog created', 'data' => $model]);
    }

    // PUT /api/blogs/{id} - Update a blog
    public function update(Request $request, $id)
    {
        $model = Blog::find($id);

        if (!$model) {
            return response()->json(['status' => false, 'message' => 'Blog not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'blog_name' => 'required',
            'blog_slug' => 'required|unique:blogs,blog_slug,' . $id,
            'blog_image' => 'nullable|mimes:jpeg,jpg,png,tif,avif,webp',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('blog_image')) {
            $image = $request->file('blog_image');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/products'), $image_name);
            $model->blog_image = 'uploads/products/' . $image_name;
        }

        $model->blog_name = $request->blog_name;
        $model->blog_type = $request->blog_type;
        $model->blog_slug = $request->blog_slug;
        $model->blog_shortdesc = $request->blog_shortdesc;
        $model->blog_desc = $request->blog_desc;
        $model->post_by = $request->post_by;
        $model->save();

        return response()->json(['status' => true, 'message' => 'Blog updated', 'data' => $model]);
    }

    // DELETE /api/blogs/{id} - Delete a blog
    public function destroy($id)
    {
        $model = Blog::find($id);
        if (!$model) {
            return response()->json(['status' => false, 'message' => 'Blog not found'], 404);
        }

        $model->delete();
        return response()->json(['status' => true, 'message' => 'Blog deleted']);
    }
}
