<?php

namespace App\Traits;

use Illuminate\Http\Request; // Add this line to import the Request class

trait SearchableController
{
    public function Search(Request $request, $modelClass)
    {
        $Search = $request->input('search');

        // Dynamically create an instance of the model
        $model = new $modelClass;

        // Use the scopeFilter method from the model
        $results = $model->filter (['search' => $Search])->get();

        return view ('search.index', compact('results'));
    }
}