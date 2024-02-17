<?php

namespace App\Traits;

trait Searchable
{
    public function scopeFilter($query, array $filters)
    {
        if ($filters['search'] ?? false) {
            $query->where('description', 'like', '%' . request('search') . '%')
                  ->orWhere('department', 'like', '%' . request('search') . '%');
        }
        // Add more conditions or customize as needed
    }
}