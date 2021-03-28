<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikeMessageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('like_message', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('like_id')->nullable(false);
            $table->unsignedBigInteger('message_id')->nullable(false);
            $table->unique(['like_id', 'message_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('like_message');
    }
}
