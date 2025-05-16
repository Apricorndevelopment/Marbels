<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    public function index()
    {
        $quotation = Quotation::all();
        return response()->json($quotation);
    }

    public function store(Request $request)
    {
        $request->validate([
            'requirement' => 'required|string|max:255',
            'qnt' => 'required|integer',
            'unit' => 'required|string',
        ]);

        Quotation::create([
            'requirement' => $request->requirement,
            'qnt' => $request->qnt,
            'unit' => $request->unit,
        ]);

        return response()->json(['message' => 'Quotation submitted successfully!']);
    }
}
