<?php

namespace App\Http\Controllers;

use App\Traits\SearchableController;
use Illuminate\Http\Request; // Add this line to import the Request class
use App\Models\Search;

class SearchController extends Controller
{
    use SearchableController;

}