<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_email',
        'customer_phone',
        'address_shipping',
        'status',
        'total',
        'site_transaction_id',
        'payment_id',
        'marketing_opt_in'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
