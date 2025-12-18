<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->text('address_shipping');
            $table->string('status')->default('PENDING'); // PENDING, PAID, SHIPPED, FAILED, CANCELLED
            $table->integer('total');
            $table->string('site_transaction_id')->unique(); // ID interno único
            $table->string('payment_id')->nullable(); // ID de la pasarela (Getnet)
            $table->boolean('marketing_opt_in')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
