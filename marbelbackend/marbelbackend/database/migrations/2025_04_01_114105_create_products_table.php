<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('product_image'); // Primary product image
            $table->string('product_video')->nullable();
            $table->text('product_desc')->nullable();
            $table->string('size')->nullable();
            $table->string('surface')->nullable();
            $table->decimal('FOB_price', 10, 2)->nullable();
            $table->string('material_type')->nullable();
            $table->integer('min_order')->nullable();
            $table->string('port')->nullable();
            $table->string('material_origin')->nullable();
            $table->string('province_city')->nullable(); // Province/City
            $table->string('grade')->nullable();
            $table->timestamps();
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('image_path');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('products');
    }
};
