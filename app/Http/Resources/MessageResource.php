<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'likes_count'=> count($this->likes ?? []),
            'is_liked'   => false,
            'user'       => $this->user,
            'text'       => $this->text,
            'image'      => $this->image,
            'created_at' => $this->created_at
        ];
    }
}
