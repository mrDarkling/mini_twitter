<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Models\Like;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $data = $request->all();
        $collection = MessageResource::collection(
            Message::skip($data['offset'] ?? 0)->take($data['limit'] ?? 5)->get()
        );

        return response()->json(
            [
                'data'  => $collection,
                'count' => DB::table('messages')->count(),
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $file = $data['image_file'];
        Storage::disk('public')->put('images/', $file);

        $model = new Message();
        $model->text = $data['text'] ?? '';
        $model->image = 'storage/images/' . $file->hashName();
        $model->user_id = auth()->user()->id;
        $model->save();

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     *
     * @param Message $message
     * @return MessageResource
     */
    public function show(Message $message)
    {
        return new MessageResource($message);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Message $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        $message->fill($request->all())->save();

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Message $message
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Message $message)
    {
        $message->delete();

        return response()->noContent();
    }

    public function addLike(Request $request)
    {
        $messageId = $request->input('message_id');
        $message = Message::findOrFail($messageId);

        $userId = auth()->user()->id;
        $like = Like::where('user_id', $userId)->whereHas('messages', function ($q) use ($messageId){
            $q->where('messages.id',$messageId);
        })->first();

        if ($like) {
            $like->messages()->detach();
            $like->delete();
            return response()->json(['likes_count' => $message->likes->count()]);
        }

        $like = new Like();
        $like->user_id = $userId;
        $like->save();
        $like->messages()->sync($messageId);

        return response()->json(['likes_count' => $message->likes->count()]);
    }
}
